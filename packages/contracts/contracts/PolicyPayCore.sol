// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PolicyPayCore
/// @notice Escrow + policy checks + receipt anchoring for agent jobs.
contract PolicyPayCore is Ownable {
    enum JobStatus {
        None,
        Open,
        Accepted,
        Submitted,
        Released,
        Refunded,
        Slashed
    }

    struct Policy {
        uint256 dailyLimitWei;
        uint256 maxPerJobWei;
        bool active;
    }

    struct Job {
        address payer;
        address worker;
        uint256 amount;
        bytes32 policyId;
        bytes32 requestHash;
        bytes32 resultHash;
        uint256 createdAt;
        JobStatus status;
    }

    mapping(bytes32 => Policy) public policies;
    mapping(bytes32 => Job) public jobs;
    mapping(bytes32 => bool) public receiptUsed;

    event PolicyUpserted(bytes32 indexed policyId, uint256 dailyLimitWei, uint256 maxPerJobWei, bool active);
    event JobOpened(bytes32 indexed jobId, address indexed payer, uint256 amount, bytes32 indexed policyId, bytes32 requestHash);
    event JobAccepted(bytes32 indexed jobId, address indexed worker);
    event ResultSubmitted(bytes32 indexed jobId, bytes32 resultHash);
    event ReceiptAnchored(bytes32 indexed receiptHash, bytes32 indexed jobId, address indexed actor);
    event Released(bytes32 indexed jobId, address indexed worker, uint256 amount);
    event Refunded(bytes32 indexed jobId, address indexed payer, uint256 amount);
    event Slashed(bytes32 indexed jobId, address indexed treasury, uint256 amount);

    error InvalidPolicy();
    error InvalidAmount();
    error InvalidStatus();
    error Unauthorized();
    error AlreadyUsed();

    constructor(address initialOwner) Ownable(initialOwner) {}

    function upsertPolicy(bytes32 policyId, uint256 dailyLimitWei, uint256 maxPerJobWei, bool active) external onlyOwner {
        if (policyId == bytes32(0) || maxPerJobWei == 0 || maxPerJobWei > dailyLimitWei) revert InvalidPolicy();
        policies[policyId] = Policy({dailyLimitWei: dailyLimitWei, maxPerJobWei: maxPerJobWei, active: active});
        emit PolicyUpserted(policyId, dailyLimitWei, maxPerJobWei, active);
    }

    function openJob(bytes32 jobId, bytes32 policyId, bytes32 requestHash) external payable {
        Policy memory p = policies[policyId];
        if (!p.active) revert InvalidPolicy();
        if (msg.value == 0 || msg.value > p.maxPerJobWei) revert InvalidAmount();
        if (jobs[jobId].status != JobStatus.None) revert InvalidStatus();

        jobs[jobId] = Job({
            payer: msg.sender,
            worker: address(0),
            amount: msg.value,
            policyId: policyId,
            requestHash: requestHash,
            resultHash: bytes32(0),
            createdAt: block.timestamp,
            status: JobStatus.Open
        });

        emit JobOpened(jobId, msg.sender, msg.value, policyId, requestHash);
    }

    function acceptJob(bytes32 jobId) external {
        Job storage j = jobs[jobId];
        if (j.status != JobStatus.Open) revert InvalidStatus();
        j.worker = msg.sender;
        j.status = JobStatus.Accepted;
        emit JobAccepted(jobId, msg.sender);
    }

    function submitResult(bytes32 jobId, bytes32 resultHash) external {
        Job storage j = jobs[jobId];
        if (j.status != JobStatus.Accepted) revert InvalidStatus();
        if (msg.sender != j.worker) revert Unauthorized();
        j.resultHash = resultHash;
        j.status = JobStatus.Submitted;
        emit ResultSubmitted(jobId, resultHash);
    }

    function anchorReceipt(bytes32 receiptHash, bytes32 jobId) external {
        if (receiptHash == bytes32(0)) revert InvalidPolicy();
        if (receiptUsed[receiptHash]) revert AlreadyUsed();
        Job storage j = jobs[jobId];
        if (j.status == JobStatus.None) revert InvalidStatus();
        if (msg.sender != j.payer && msg.sender != j.worker && msg.sender != owner()) revert Unauthorized();

        receiptUsed[receiptHash] = true;
        emit ReceiptAnchored(receiptHash, jobId, msg.sender);
    }

    function release(bytes32 jobId) external {
        Job storage j = jobs[jobId];
        if (j.status != JobStatus.Submitted) revert InvalidStatus();
        if (msg.sender != j.payer && msg.sender != owner()) revert Unauthorized();

        j.status = JobStatus.Released;
        (bool ok,) = payable(j.worker).call{value: j.amount}("");
        require(ok, "TRANSFER_FAILED");
        emit Released(jobId, j.worker, j.amount);
    }

    function refund(bytes32 jobId) external {
        Job storage j = jobs[jobId];
        if (j.status != JobStatus.Open && j.status != JobStatus.Accepted) revert InvalidStatus();
        if (msg.sender != j.payer && msg.sender != owner()) revert Unauthorized();

        j.status = JobStatus.Refunded;
        (bool ok,) = payable(j.payer).call{value: j.amount}("");
        require(ok, "TRANSFER_FAILED");
        emit Refunded(jobId, j.payer, j.amount);
    }

    function slashToTreasury(bytes32 jobId, address treasury) external onlyOwner {
        Job storage j = jobs[jobId];
        if (j.status != JobStatus.Accepted && j.status != JobStatus.Submitted) revert InvalidStatus();
        if (treasury == address(0)) revert InvalidPolicy();

        j.status = JobStatus.Slashed;
        (bool ok,) = payable(treasury).call{value: j.amount}("");
        require(ok, "TRANSFER_FAILED");
        emit Slashed(jobId, treasury, j.amount);
    }
}
