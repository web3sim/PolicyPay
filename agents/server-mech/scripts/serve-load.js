import "dotenv/config";

const target = process.env.SERVER_MECH_BASE || "http://localhost:4100";
const count = Number(process.env.SERVE_COUNT || 50);

async function run() {
  let ok = 0;
  for (let i = 1; i <= count; i++) {
    const resp = await fetch(`${target}/mech/serve`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        requester: "olas-client-agent",
        task: `policy-pay-task-${i}`,
        amountEth: "0.0001"
      })
    });
    if (resp.ok) ok++;
    else console.log("failed", i, await resp.text());
  }
  console.log(JSON.stringify({ target, requested: count, served: ok }, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
