const apiRows = [
  ['GET', '/health', 'Service health and chain context'],
  ['GET', '/config', 'Runtime config and signer info'],
  ['GET', '/policies/:policyId', 'Read policy limits and status'],
  ['GET', '/jobs/:jobId', 'Read onchain job state'],
  ['POST', '/jobs/open', 'Open escrowed job'],
  ['POST', '/jobs/:jobId/accept', 'Accept open job'],
  ['POST', '/jobs/:jobId/submit', 'Submit result hash'],
  ['POST', '/receipts/anchor', 'Anchor receipt hash'],
  ['POST', '/jobs/:jobId/release', 'Release escrow to worker'],
  ['POST', '/jobs/:jobId/refund', 'Refund escrow to payer'],
];

const contractRows = [
  ['upsertPolicy(bytes32,uint256,uint256,bool)', 'Create/update policy constraints'],
  ['openJob(bytes32,bytes32,bytes32)', 'Create escrow-backed job'],
  ['acceptJob(bytes32)', 'Assign worker and lock execution path'],
  ['submitResult(bytes32,bytes32)', 'Attach result hash to job'],
  ['anchorReceipt(bytes32,bytes32)', 'Record immutable execution receipt'],
  ['release(bytes32)', 'Release escrow to worker after submission'],
  ['refund(bytes32)', 'Return escrow to payer before completion'],
  ['slashToTreasury(bytes32,address)', 'Owner slashing path for failed jobs'],
  ['policies(bytes32)', 'Read policy state'],
  ['jobs(bytes32)', 'Read job state machine record'],
];

export default function DocsPage() {
  return (
    <main className="container">
      <section className="hero fade-up">
        <span className="badge">Protocol Docs</span>
        <h1 className="title">Developer Reference</h1>
        <p className="subtitle">
          API and contract interfaces used by PolicyPay services. Keep this page open during integration and demo prep.
        </p>
      </section>

      <section className="section fade-up delay-1">
        <h2 className="section-title">HTTP API</h2>
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Method</th>
                  <th style={th}>Endpoint</th>
                  <th style={th}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {apiRows.map((row) => (
                  <tr key={row[1]}>
                    <td style={td}><code>{row[0]}</code></td>
                    <td style={td}><code>{row[1]}</code></td>
                    <td style={td}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section fade-up delay-2">
        <h2 className="section-title">Contract Methods (PolicyPayCore)</h2>
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Method</th>
                  <th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                {contractRows.map((row) => (
                  <tr key={row[0]}>
                    <td style={td}><code>{row[0]}</code></td>
                    <td style={td}>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section fade-up delay-3">
        <h2 className="section-title">Important Constants</h2>
        <div className="card">
          <ul className="list">
            <li>Chain: Base Sepolia</li>
            <li>Contract: <code>0x051cAD2fcf7D1ff415c35a8090f0507D454bd608</code></li>
            <li>Default policy ID: <code>policy/base-sepolia/default</code></li>
          </ul>
        </div>
      </section>

      <footer className="footer">PolicyPay docs — concise interfaces for integration and review.</footer>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: 'left',
  borderBottom: '1px solid #243055',
  padding: '10px 8px',
  color: '#99a6cc',
  fontWeight: 700,
  fontSize: '0.85rem',
};

const td: React.CSSProperties = {
  borderBottom: '1px solid #1b2548',
  padding: '10px 8px',
  verticalAlign: 'top',
  fontSize: '0.92rem',
};
