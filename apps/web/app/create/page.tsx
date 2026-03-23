const envBlock = `# apps/web/.env.local
NEXT_PUBLIC_API_BASE_URL=https://policypayapi-production.up.railway.app
NEXT_PUBLIC_SERVER_MECH_BASE=https://policypayserver-mech-production.up.railway.app

# backend env (.env)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
DEPLOYER_PRIVATE_KEY=0x...
POLICY_PAY_CORE_ADDRESS=0x051cAD2fcf7D1ff415c35a8090f0507D454bd608
POLICYPAY_API_BASE=http://localhost:4000
POLICYPAY_POLICY_ID=policy/base-sepolia/default
MOONPAY_ENABLE_EXECUTION=true
MOONPAY_BIN=/app/node_modules/.bin/mp
MOONPAY_TIMEOUT_MS=120000
MOONPAY_WALLET_NAME=main`;

const runBlock = `npm install

# terminal 1: backend api
npm run -w @policypay/api dev

# terminal 2: server mech
npm run -w @policypay/server-mech dev

# terminal 3: web ui
npm run -w @policypay/web dev`;

const verifyBlock = `# trigger one backend serve
curl -X POST http://localhost:4100/mech/serve \
  -H "content-type: application/json" \
  -d '{
    "requester":"olas-client-agent",
    "task":"policy-pay-demo",
    "amountEth":"0.0001",
    "moonpay": {
      "enabled": true,
      "simulation": false,
      "tool": "token balance list",
      "options": {"wallet":"main","chain":"base"}
    }
  }'

# check runtime stats
curl http://localhost:4100/stats`;

export default function CreatePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-34 text-slate-100 sm:px-6 lg:pt-38">
      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Backend Guide</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Deploy and operate PolicyPay backend services
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Complete setup for API, server-mech, and production telemetry. This guide is backend-first and aligned with live execution paths.
        </p>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="glass-panel rounded-2xl p-5 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white">1. Prerequisites</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Node.js 22+</li>
            <li>npm 10+</li>
            <li>Base Sepolia RPC endpoint</li>
            <li>Funded deployer wallet private key</li>
            <li>MoonPay CLI configured for execution mode</li>
          </ul>
        </article>

        <article className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">2. Environment Configuration</h2>
          <p className="mt-2 text-sm text-slate-300">Use these values exactly. Keep endpoint URLs without trailing slash.</p>
          <pre className="font-mono mt-4 overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 text-xs text-sky-100">{envBlock}</pre>
        </article>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-white">3. Run Services</h2>
          <pre className="font-mono mt-4 overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 text-xs text-sky-100">{runBlock}</pre>
        </article>

        <article className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-white">4. Trigger and Verify</h2>
          <pre className="font-mono mt-4 overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 text-xs text-sky-100">{verifyBlock}</pre>
        </article>
      </section>

      <footer className="mt-8 border-t border-slate-800/80 pt-6 text-sm text-slate-400">
        For deeper internals, reference README and ARCHITECTURE in this repository.
      </footer>
    </main>
  );
}
