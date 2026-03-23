export default function CreatePage() {
  return (
    <main className="container">
      <section className="hero fade-up">
        <span className="badge">Create / Run</span>
        <h1 className="title">Build and run PolicyPay locally</h1>
        <p className="subtitle">
          This page documents environment setup, runtime commands, and end-to-end flow execution.
        </p>
      </section>

      <section className="section fade-up delay-1">
        <h2 className="section-title">1) Prerequisites</h2>
        <div className="card">
          <ul className="list">
            <li>Node.js 22+</li>
            <li>npm 10+</li>
            <li>Base Sepolia RPC access</li>
            <li>Funded test wallet private key</li>
            <li>MoonPay CLI authenticated wallet (for real execution mode)</li>
          </ul>
        </div>
      </section>

      <section className="section fade-up delay-2">
        <h2 className="section-title">2) Environment</h2>
        <div className="card">
          <pre>{`# apps/web/.env.local\nNEXT_PUBLIC_API_BASE_URL=https://policypayapi-production.up.railway.app\nNEXT_PUBLIC_SERVER_MECH_BASE=https://policypayserver-mech-production.up.railway.app\n\n# backend env\nBASE_SEPOLIA_RPC_URL=https://sepolia.base.org\nDEPLOYER_PRIVATE_KEY=0x...\nPOLICY_PAY_CORE_ADDRESS=0x051cAD2fcf7D1ff415c35a8090f0507D454bd608\nMOONPAY_ENABLE_EXECUTION=true\nMOONPAY_BIN=./node_modules/.bin/mp\nMOONPAY_WALLET_NAME=main`}</pre>
        </div>
      </section>

      <section className="section fade-up delay-3">
        <h2 className="section-title">3) Run the system</h2>
        <div className="card">
          <pre>{`npm install\n\n# terminal 1\nnpm run -w @policypay/api dev\n\n# terminal 2\nnpm run -w @policypay/server-mech dev\n\n# terminal 3\nnpm run -w @policypay/web dev`}</pre>
        </div>
      </section>

      <section className="section fade-up">
        <h2 className="section-title">4) Trigger and verify flow</h2>
        <div className="card">
          <pre>{`# run 10 hires\nHIRE_COUNT=10 npm run -w @policypay/client-mech hire:10\n\n# serve additional requests\nSERVE_COUNT=10 npm run -w @policypay/server-mech serve:50\n\n# verify stats\ncurl https://policypayserver-mech-production.up.railway.app/stats`}</pre>
        </div>
      </section>

      <footer className="footer">Need full internals? See README.md and ARCHITECTURE.md in the repository.</footer>
    </main>
  );
}
