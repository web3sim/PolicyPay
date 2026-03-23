import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { runMoonPayTool } from "./moonpay.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = Number(process.env.SERVER_MECH_PORT || 4100);
const API_BASE = process.env.POLICYPAY_API_BASE || "http://localhost:4000";
const DEFAULT_POLICY = process.env.POLICYPAY_POLICY_ID || "policy/base-sepolia/default";

const reqSchema = z.object({
  requester: z.string().min(3),
  task: z.string().min(3),
  amountEth: z.string().default("0.0001"),
  policyId: z.string().default(DEFAULT_POLICY),
  moonpay: z.object({
    enabled: z.boolean().default(true),
    simulation: z.boolean().default(true),
    tool: z.string().default("token balance list"),
    options: z.record(z.any()).default({})
  }).optional()
});

const served = {
  total: 0,
  jobs: []
};

const hashish = async (input) => {
  const enc = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return "0x" + [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

app.get("/health", (_req, res) => {
  res.json({ ok: true, mech: "policypay-server", totalServed: served.total, apiBase: API_BASE });
});

app.get("/stats", (_req, res) => {
  res.json(served);
});

app.post("/moonpay/run", async (req, res) => {
  try {
    const body = req.body || {};
    const out = await runMoonPayTool({
      tool: body.tool || "token balance list",
      options: body.options || {},
      simulation: body.simulation !== false,
    });
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message || "moonpay run failed" });
  }
});

app.post("/mech/serve", async (req, res) => {
  try {
    const parsed = reqSchema.parse(req.body || {});

    const jobKey = `job/${Date.now()}/${served.total + 1}`;
    const requestHash = await hashish(`${parsed.requester}:${parsed.task}`);

    const openResp = await fetch(`${API_BASE}/jobs/open`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jobId: jobKey,
        policyId: parsed.policyId,
        requestHash,
        amountEth: parsed.amountEth,
      }),
    });

    if (!openResp.ok) {
      const msg = await openResp.text();
      return res.status(502).json({ error: "open job failed", detail: msg });
    }

    await fetch(`${API_BASE}/jobs/${encodeURIComponent(jobKey)}/accept`, { method: "POST" });

    const resultText = `served:${parsed.task}:by:policypay-mech`;
    const resultHash = await hashish(resultText);
    await fetch(`${API_BASE}/jobs/${encodeURIComponent(jobKey)}/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resultHash }),
    });

    const receiptHash = await hashish(`receipt:${jobKey}:${resultHash}`);
    await fetch(`${API_BASE}/receipts/anchor`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jobId: jobKey, receiptHash }),
    });

    await fetch(`${API_BASE}/jobs/${encodeURIComponent(jobKey)}/release`, { method: "POST" });

    const moonpayReq = parsed.moonpay || { enabled: true, simulation: true, tool: "token balance list", options: {} };
    const moonpay = moonpayReq.enabled
      ? await runMoonPayTool({
          tool: moonpayReq.tool,
          options: moonpayReq.options,
          simulation: moonpayReq.simulation,
        })
      : { ok: true, mode: "disabled" };

    const item = {
      jobId: jobKey,
      requester: parsed.requester,
      task: parsed.task,
      requestHash,
      resultHash,
      receiptHash,
      moonpay,
      createdAt: new Date().toISOString(),
    };

    served.total += 1;
    served.jobs.push(item);
    res.json({ ok: true, ...item });
  } catch (err) {
    res.status(400).json({ error: err.message || "invalid request" });
  }
});

app.listen(PORT, () => {
  console.log(`PolicyPay server-mech listening on :${PORT}`);
});
