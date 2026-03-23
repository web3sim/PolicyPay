'use client';

import { useEffect, useMemo, useState } from 'react';

type Health = { ok?: boolean; service?: string; chain?: string; contract?: string };
type Config = { contractAddress?: string };
type Stats = {
  total: number;
  jobs: Array<{
    jobId: string;
    task: string;
    createdAt: string;
    moonpay?: { mode?: string; command?: string; plannedCommand?: string };
  }>;
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://policypayapi-production.up.railway.app';
const MECH = process.env.NEXT_PUBLIC_SERVER_MECH_BASE || 'https://policypayserver-mech-production.up.railway.app';
const FALLBACK_CONTRACT = '0x051cAD2fcf7D1ff415c35a8090f0507D454bd608';

export default function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [apiOk, setApiOk] = useState(false);
  const [mechOk, setMechOk] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    const load = async () => {
      setErr('');
      const [h, c, s] = await Promise.allSettled([
        fetch(`${API}/health`).then((r) => r.json()),
        fetch(`${API}/config`).then((r) => r.json()),
        fetch(`${MECH}/stats`).then((r) => r.json()),
      ]);

      if (h.status === 'fulfilled') {
        setHealth(h.value);
        setApiOk(true);
      } else {
        setApiOk(false);
      }

      if (c.status === 'fulfilled') {
        setConfig(c.value);
      }

      if (s.status === 'fulfilled') {
        setStats(s.value);
        setMechOk(true);
      } else {
        setMechOk(false);
      }

      if (h.status !== 'fulfilled' || s.status !== 'fulfilled') {
        setErr('Unable to fetch one or more telemetry sources. Verify NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_SERVER_MECH_BASE.');
      }
    };

    load();
    const i = setInterval(load, 8000);
    return () => clearInterval(i);
  }, []);

  const contract = useMemo(() => health?.contract || config?.contractAddress || FALLBACK_CONTRACT, [health, config]);
  const latestJob = useMemo(() => {
    if (!stats?.jobs?.length) return null;
    return stats.jobs[stats.jobs.length - 1];
  }, [stats]);
  const latestMoonpay = latestJob?.moonpay;
  const moonpayMode = useMemo(() => {
    if (!mechOk) return 'OFFLINE';
    if (!stats?.jobs?.length) return 'NO DATA';
    return (latestMoonpay?.mode || 'UNKNOWN').toUpperCase();
  }, [latestMoonpay, mechOk, stats]);

  return (
    <div className="grid">
      <div className="card">
        <h3>API Health</h3>
        <div className="kpi">{apiOk ? 'LIVE' : 'OFFLINE'}</div>
        <div className="small">{health?.service || 'policypay-api'} • {health?.chain || 'base-sepolia'}</div>
        <div className="small">Contract: {contract}</div>
      </div>

      <div className="card">
        <h3>Olas Served Requests</h3>
        <div className="kpi">{stats?.total ?? 0}</div>
        <div className="small">Network source: {mechOk ? 'connected' : 'offline'}</div>
        <div className="small">Submission checkpoint: 10 confirmed</div>
      </div>

      <div className="card">
        <h3>MoonPay Execution</h3>
        <div className="kpi">{moonpayMode}</div>
        <div className="small">Latest command:</div>
        <div className="small">{latestMoonpay?.command || latestMoonpay?.plannedCommand || 'No command captured yet'}</div>
        <div className="small">Latest job: {latestJob?.jobId || 'none'}</div>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>Recent Jobs</h3>
        {err ? <p className="small">{err}</p> : null}
        <p className="small">API: <code>{API}</code> | MECH: <code>{MECH}</code></p>
        <pre>{JSON.stringify(stats?.jobs?.slice(-5) || [], null, 2)}</pre>
      </div>
    </div>
  );
}
