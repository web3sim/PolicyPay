import "dotenv/config";
import { hireAgent, getServerStats } from "../src/client.js";

const REQUESTS = Number(process.env.HIRE_COUNT || 10);

async function main() {
  let ok = 0;
  const hires = [];

  for (let i = 1; i <= REQUESTS; i++) {
    try {
      const out = await hireAgent({
        requester: "olas-client-agent",
        task: `hire-request-${i}`,
        amountEth: "0.0001"
      });
      ok += 1;
      hires.push({ i, jobId: out.jobId, receiptHash: out.receiptHash });
    } catch (e) {
      hires.push({ i, error: e.message });
    }
  }

  const stats = await getServerStats();
  console.log(JSON.stringify({
    requested: REQUESTS,
    completed: ok,
    hires,
    serverTotalServed: stats.total
  }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
