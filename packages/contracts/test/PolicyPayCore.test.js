const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PolicyPayCore", function () {
  async function deployFixture() {
    const [owner, payer, worker, treasury] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("PolicyPayCore");
    const core = await Contract.deploy(owner.address);
    await core.deployed();

    const policyId = ethers.utils.id("policy/base-sepolia/default");
    await core.upsertPolicy(policyId, ethers.utils.parseEther("5"), ethers.utils.parseEther("1"), true);

    return { core, owner, payer, worker, treasury, policyId };
  }

  it("opens, accepts, submits and releases a job", async function () {
    const { core, payer, worker, policyId } = await deployFixture();

    const jobId = ethers.utils.id("job/1");
    const requestHash = ethers.utils.id("request/1");
    const resultHash = ethers.utils.id("result/1");
    const receiptHash = ethers.utils.id("receipt/1");
    const amount = ethers.utils.parseEther("0.5");

    await core.connect(payer).openJob(jobId, policyId, requestHash, { value: amount });
    await core.connect(worker).acceptJob(jobId);
    await core.connect(worker).submitResult(jobId, resultHash);
    await core.connect(worker).anchorReceipt(receiptHash, jobId);

    const workerBefore = await ethers.provider.getBalance(worker.address);
    await core.connect(payer).release(jobId);
    const workerAfter = await ethers.provider.getBalance(worker.address);

    expect(workerAfter.sub(workerBefore).toString()).to.equal(amount.toString());
    expect((await ethers.provider.getBalance(core.address)).toString()).to.equal("0");
    const job = await core.jobs(jobId);
    expect(job.status).to.equal(4);
  });

  it("refunds open jobs to payer", async function () {
    const { core, payer, policyId } = await deployFixture();
    const jobId = ethers.utils.id("job/2");

    await core.connect(payer).openJob(jobId, policyId, ethers.utils.id("request/2"), { value: ethers.utils.parseEther("0.2") });
    await core.connect(payer).refund(jobId);

    expect((await ethers.provider.getBalance(core.address)).toString()).to.equal("0");
    const job = await core.jobs(jobId);
    expect(job.status).to.equal(5);
  });

  it("prevents over-limit amounts", async function () {
    const { core, payer, policyId } = await deployFixture();
    const jobId = ethers.utils.id("job/3");

    let failed = false;
    try {
      await core.connect(payer).openJob(jobId, policyId, ethers.utils.id("request/3"), { value: ethers.utils.parseEther("2") });
    } catch {
      failed = true;
    }

    expect(failed).to.equal(true);
  });
});
