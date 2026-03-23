const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Contract = await ethers.getContractFactory("PolicyPayCore");
  const core = await Contract.deploy(deployer.address);
  await core.deployed();

  console.log("PolicyPayCore deployed:", core.address);

  const policyId = ethers.utils.id("policy/base-sepolia/default");
  const daily = ethers.utils.parseEther("5");
  const perJob = ethers.utils.parseEther("1");
  const tx = await core.upsertPolicy(policyId, daily, perJob, true);
  await tx.wait();

  console.log("Default policy configured:", {
    policyId,
    daily: daily.toString(),
    perJob: perJob.toString(),
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
