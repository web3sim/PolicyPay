import Dashboard from '../components/Dashboard';

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">POLICYPAY MESH • Olas x MoonPay</span>
        <h1 className="title">Policy-constrained agent payments with real on-chain receipts.</h1>
        <p className="subtitle">
          A production-ready agent economy rail: Olas client/server mechs for hire+monetize flows, MoonPay for real execution,
          and Base Sepolia contracts enforcing payment lifecycle and receipt anchoring.
        </p>
        <div className="cta">
          <a className="btn primary" href="https://github.com/web3sim/PolicyPay" target="_blank">View GitHub</a>
          <a className="btn" href="http://localhost:4100/health" target="_blank">Server Mech Health</a>
          <a className="btn" href="http://localhost:4000/health" target="_blank">API Health</a>
        </div>
      </section>

      <section className="section">
        <Dashboard />
      </section>
    </main>
  );
}
