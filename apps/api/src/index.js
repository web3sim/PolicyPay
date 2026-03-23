import "dotenv/config";
import express from "express";
import { ethers } from "ethers";
import { POLICY_PAY_CORE_ABI } from "./abi.js";

const app = express();
app.use(express.json());

const API_PORT = Number(process.env.API_PORT || 4000);
const RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || process.env.OLAS_RPC_URL || "https://sepolia.base.org";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || process.env.OLAS_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.POLICY_PAY_CORE_ADDRESS || "0x051cAD2fcf7D1ff415c35a8090f0507D454bd608";

if (!PRIVATE_KEY) {
  console.warn("[policypay-api] Missing DEPLOYER_PRIVATE_KEY/OLAS_PRIVATE_KEY. Write endpoints will fail.");
}

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;
const readContract = new ethers.Contract(CONTRACT_ADDRESS, POLICY_PAY_CORE_ABI, provider);
const writeContract = signer ? new ethers.Contract(CONTRACT_ADDRESS, POLICY_PAY_CORE_ABI, signer) : null;

const asHex32 = (value) => {
  if (!value) throw new Error("Missing bytes32 value");
  if (value.startsWith("0x") && value.length === 66) return value;
  return ethers.utils.id(value);
};

const requireWriter = () => {
  if (!writeContract) {
    const err = new Error("Missing signer; set DEPLOYER_PRIVATE_KEY or OLAS_PRIVATE_KEY");
    err.status = 500;
    throw err;
  }
};

const safe = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal error" });
  }
};

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "policypay-api", chain: "base-sepolia", contract: CONTRACT_ADDRESS });
});

app.get("/config", (_req, res) => {
  res.json({
    rpcUrl: RPC_URL,
    contractAddress: CONTRACT_ADDRESS,
    signer: signer ? signer.address : null
  });
});

app.get("/policies/:policyId", safe(async (req, res) => {
  const policyId = asHex32(req.params.policyId);
  const p = await readContract.policies(policyId);
  res.json({
    policyId,
    dailyLimitWei: p.dailyLimitWei.toString(),
    maxPerJobWei: p.maxPerJobWei.toString(),
    active: p.active
  });
}));

app.get("/jobs/:jobId", safe(async (req, res) => {
  const jobId = asHex32(req.params.jobId);
  const j = await readContract.jobs(jobId);
  res.json({
    jobId,
    payer: j.payer,
    worker: j.worker,
    amountWei: j.amount.toString(),
    policyId: j.policyId,
    requestHash: j.requestHash,
    resultHash: j.resultHash,
    createdAt: j.createdAt.toString(),
    status: Number(j.status)
  });
}));

app.post("/jobs/open", safe(async (req, res) => {
  requireWriter();
  const { jobId, policyId, requestHash, amountEth } = req.body || {};
  if (!jobId || !policyId || !requestHash || !amountEth) {
    throw new Error("jobId, policyId, requestHash, amountEth are required");
  }

  const tx = await writeContract.openJob(
    asHex32(jobId),
    asHex32(policyId),
    asHex32(requestHash),
    { value: ethers.utils.parseEther(String(amountEth)) }
  );
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.post("/jobs/:jobId/accept", safe(async (req, res) => {
  requireWriter();
  const tx = await writeContract.acceptJob(asHex32(req.params.jobId));
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.post("/jobs/:jobId/submit", safe(async (req, res) => {
  requireWriter();
  const { resultHash } = req.body || {};
  if (!resultHash) throw new Error("resultHash is required");
  const tx = await writeContract.submitResult(asHex32(req.params.jobId), asHex32(resultHash));
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.post("/receipts/anchor", safe(async (req, res) => {
  requireWriter();
  const { jobId, receiptHash } = req.body || {};
  if (!jobId || !receiptHash) throw new Error("jobId and receiptHash are required");
  const tx = await writeContract.anchorReceipt(asHex32(receiptHash), asHex32(jobId));
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.post("/jobs/:jobId/release", safe(async (req, res) => {
  requireWriter();
  const tx = await writeContract.release(asHex32(req.params.jobId));
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.post("/jobs/:jobId/refund", safe(async (req, res) => {
  requireWriter();
  const tx = await writeContract.refund(asHex32(req.params.jobId));
  const receipt = await tx.wait();
  res.json({ ok: true, txHash: receipt.transactionHash });
}));

app.listen(API_PORT, () => {
  console.log(`PolicyPay API listening on :${API_PORT}`);
});
