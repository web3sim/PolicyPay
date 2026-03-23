export const POLICY_PAY_CORE_ABI = [
  "function policies(bytes32) view returns (uint256 dailyLimitWei,uint256 maxPerJobWei,bool active)",
  "function jobs(bytes32) view returns (address payer,address worker,uint256 amount,bytes32 policyId,bytes32 requestHash,bytes32 resultHash,uint256 createdAt,uint8 status)",
  "function openJob(bytes32 jobId, bytes32 policyId, bytes32 requestHash) payable",
  "function acceptJob(bytes32 jobId)",
  "function submitResult(bytes32 jobId, bytes32 resultHash)",
  "function anchorReceipt(bytes32 receiptHash, bytes32 jobId)",
  "function release(bytes32 jobId)",
  "function refund(bytes32 jobId)"
];
