import Dashboard from '../components/Dashboard';

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero fade-up">
        <span className="badge">PolicyPay • Olas x MoonPay • Base Sepolia</span>
        <h1 className="title">Programmable Payments with Policy Enforcement</h1>
        <p className="subtitle">
          PolicyPay is a Web3-native payment protocol for automated, condition-driven settlement.
          Funds are escrowed, execution follows deterministic policy checks, and all payout transitions
          are auditable onchain.
        </p>
        <div className="cta">
          <a className="btn primary" href="https://github.com/web3sim/PolicyPay" target="_blank">GitHub</a>
          <a className="btn" href="/create">Create / Run Guide</a>
        </div>
      </section>

      <section id="features" className="section fade-up delay-1">
        <h2 className="section-title">What this protocol provides</h2>
        <div className="grid">
          <article className="card"><h3>Policy-gated execution</h3><p className="small">Payouts execute only when policy constraints and lifecycle state are valid.</p></article>
          <article className="card"><h3>Escrow-controlled settlement</h3><p className="small">Funds are held in contract escrow and released through explicit release/refund/slash paths.</p></article>
          <article className="card"><h3>Automation-ready operations</h3><p className="small">Client and server mech flows support repeated, traceable execution for autonomous systems.</p></article>
        </div>
      </section>

      <section id="protocol" className="section fade-up delay-2">
        <h2 className="section-title">Protocol stack</h2>
        <div className="grid-2">
          <article className="card">
            <h3>Core components</h3>
            <ul className="list">
              <li>Smart contracts: PolicyPayCore (Base Sepolia)</li>
              <li>Backend API: job lifecycle + nonce-managed transaction relay</li>
              <li>Server mech: request serving + receipt anchoring + MoonPay adapter</li>
              <li>Client mech: hire flow and batch request execution</li>
              <li>Frontend: live telemetry and operator dashboard</li>
            </ul>
          </article>
          <article className="card">
            <h3>Lifecycle</h3>
            <ul className="list">
              <li>Define policy</li>
              <li>Open job and lock funds</li>
              <li>Accept + submit result hash</li>
              <li>Anchor receipt hash</li>
              <li>Release/refund/slash deterministically</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section fade-up delay-3">
        <h2 className="section-title">Live network telemetry</h2>
        <p className="section-note">This panel reads from deployed API/mech endpoints configured through NEXT_PUBLIC envs.</p>
        <Dashboard />
      </section>

      <footer className="footer">PolicyPay — deterministic, policy-enforced autonomous payments.</footer>
    </main>
  );
}
