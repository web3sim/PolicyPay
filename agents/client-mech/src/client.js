import "dotenv/config";
import { z } from "zod";

const SERVER_MECH_BASE = process.env.SERVER_MECH_BASE || "http://localhost:4100";

const hireSchema = z.object({
  task: z.string().min(3),
  amountEth: z.string().default("0.0001"),
  requester: z.string().default("olas-client-agent")
});

export async function hireAgent(input) {
  const req = hireSchema.parse(input);
  const resp = await fetch(`${SERVER_MECH_BASE}/mech/serve`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req)
  });

  if (!resp.ok) {
    throw new Error(`Hire failed: ${await resp.text()}`);
  }

  return resp.json();
}

export async function getServerStats() {
  const resp = await fetch(`${SERVER_MECH_BASE}/stats`);
  if (!resp.ok) throw new Error(`Stats failed: ${await resp.text()}`);
  return resp.json();
}

if (process.argv[1] && process.argv[1].endsWith("client.js")) {
  const task = process.env.CLIENT_TASK || "default-hire-task";
  const amountEth = process.env.CLIENT_AMOUNT_ETH || "0.0001";

  hireAgent({ task, amountEth })
    .then((r) => {
      console.log(JSON.stringify({ ok: true, hire: r }, null, 2));
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
