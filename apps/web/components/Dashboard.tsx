'use client';

import { useEffect, useState } from 'react';

type Health = { ok: boolean; service: string; chain: string; contract: string };
type Stats = { total: number; jobs: Array<{ jobId: string; task: string; createdAt: string; moonpay?: { mode?: string; command?: string; plannedCommand?: string } }> };

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
const MECH = process.env.NEXT_PUBLIC_SERVER_MECH_BASE || 'http://localhost:4100';

export default function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [h, s] = await Promise.all([
          fetch(`${API}/health`).then((r) => r.json()),
          fetch(`${MECH}/stats`).then((r) => r.json()),
        ]);
        setHealth(h);
        setStats(s);
      } catch (e: any) {
        setErr(e?.message || 'Failed to fetch telemetry');
      }
    };
    load();
    const i = setInterval(load, 8000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h3>API Health</h3>
        <div className="kpi">{health?.ok ? 'LIVE' : '—'}</div>
        <div className="small">{health?.service} • {health?.chain}</div>
        <div className="small">Contract: {health?.contract || 'n/a'}</div>
      </div>
      <div className="card">
        <h3>Olas Served Requests</h3>
        <div className="kpi">{stats?.total ?? 0}</div>
        <div className="small">Target: 50+ for Monetize track</div>
      </div>
      <div className="card">
        <h3>MoonPay Execution</h3>
        <div className="kpi">{stats?.jobs?.[0]?.moonpay?.mode?.toUpperCase() || '—'}</div>
        <div className="small">Latest command:</div>
        <div className="small">{stats?.jobs?.[0]?.moonpay?.command || stats?.jobs?.[0]?.moonpay?.plannedCommand || 'n/a'}</div>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>Recent Jobs</h3>
        {err ? <p className="small">{err}</p> : null}
        <pre>{JSON.stringify(stats?.jobs?.slice(-5) || [], null, 2)}</pre>
      </div>
    </div>
  );
}
