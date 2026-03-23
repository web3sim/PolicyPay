'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Blocks,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  Database,
  FileDigit,
  GanttChartSquare,
  Landmark,
  Radar,
  Shield,
  TimerReset,
  WalletCards,
} from 'lucide-react';
import LandingNavbar from './LandingNavbar';

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const flow = ['Define Policy', 'Lock Funds', 'Submit Result Hash', 'Anchor Receipt', 'Release / Refund / Slash'];

const featureCards = [
  {
    icon: Shield,
    title: 'Policy-gated execution',
    text: 'Payout transitions execute only when explicit policy constraints and lifecycle states are valid.',
  },
  {
    icon: WalletCards,
    title: 'Escrow-controlled settlement',
    text: 'Funds are escrowed in-contract and released via deterministic, auditable protocol paths.',
  },
  {
    icon: Bot,
    title: 'Automation-ready operations',
    text: 'Server mech and client mech orchestration supports high-frequency autonomous request servicing.',
  },
  {
    icon: GanttChartSquare,
    title: 'Deterministic payout logic',
    text: 'Defined transitions remove payout ambiguity across release, refund, and slash outcomes.',
  },
  {
    icon: FileDigit,
    title: 'Auditable onchain lifecycle',
    text: 'Request, result, and receipt hashes produce a verifiable settlement narrative for every job.',
  },
  {
    icon: Radar,
    title: 'Protocol-native orchestration',
    text: 'Built to serve infrastructure teams shipping autonomous payment rails across Web3 systems.',
  },
];

const stack = [
  {
    icon: Landmark,
    title: 'Smart Contracts',
    text: 'PolicyPayCore on Base Sepolia enforces escrow custody, policy constraints, and settlement state.',
  },
  {
    icon: Database,
    title: 'Backend API',
    text: 'Lifecycle endpoints and nonce-managed relay queue transactions through deterministic write paths.',
  },
  {
    icon: Cpu,
    title: 'Server Mech',
    text: 'Serves requests, anchors receipts, and integrates MoonPay CLI adapter execution modes.',
  },
  {
    icon: Blocks,
    title: 'Client Mech',
    text: 'Drives hire flow and batch execution across protocol services for monetized automation.',
  },
  {
    icon: Activity,
    title: 'Frontend Ops Dashboard',
    text: 'Exposes live telemetry for protocol health, serving throughput, and payout execution insight.',
  },
];

const jobs = [
  {
    jobId: 'job/1774245699381/1',
    requester: 'debug-user',
    task: 'status-check',
    createdAt: '2026-03-23T06:01:41.980Z',
    status: 'simulation',
  },
  {
    jobId: 'job/1774248066544/2',
    requester: 'debug-user',
    task: 'railway-job-retry',
    createdAt: '2026-03-23T06:44:55.698Z',
    status: 'simulation',
  },
  {
    jobId: 'job/1774248405658/3',
    requester: 'debug-user',
    task: 'railway-real-exec',
    createdAt: '2026-03-23T06:46:49.819Z',
    status: 'executed',
  },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-x-clip bg-transparent text-slate-100">
      <LandingNavbar />

      <div className="hero-grid pointer-events-none absolute inset-0 -z-20" />
      <motion.div
        className="pointer-events-none absolute -left-32 top-28 -z-10 h-80 w-80 rounded-full bg-blue-500/30 blur-[110px]"
        animate={{ y: [0, 26, 0], opacity: [0.48, 0.24, 0.48] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-7rem] top-[28rem] -z-10 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ y: [0, -18, 0], opacity: [0.32, 0.54, 0.32] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section id="overview" className="relative mx-auto max-w-7xl px-4 pb-28 pt-34 sm:px-6 lg:pt-38">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/8 px-4 py-2 text-xs tracking-[0.16em] text-cyan-100 uppercase">
              PolicyPay • Olas x MoonPay • Base Sepolia
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Programmable payments for
              <span className="block bg-linear-to-r from-cyan-200 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                autonomous settlement systems.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              PolicyPay is a Web3-native protocol where policy enforcement, escrow custody, and deterministic execution
              combine into a secure payment primitive for autonomous operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:opacity-90"
              >
                Backend Integration Guide
              </Link>
              <Link
                href="/docs"
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:text-cyan-100"
              >
                API & Contract Docs
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['Deterministic', 'Escrow-secured', 'Onchain auditable', 'Automation-ready'].map((item) => (
                <div key={item} className="glass-panel rounded-xl px-3 py-2 text-center text-xs tracking-wide text-cyan-100/95">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-panel rounded-3xl p-4 sm:p-5">
              <div className="rounded-2xl border border-slate-700/60 bg-slate-950/75 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Protocol Runtime Preview</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-1 text-emerald-300">
                    <span className="soft-live-pulse inline-block h-2 w-2 rounded-full bg-emerald-300" />LIVE
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[['API', 'Healthy'], ['Jobs Served', '3'], ['MoonPay', 'Executed'], ['Checkpoint', '10 Confirmed']].map((row) => (
                    <div key={row[0]} className="glass-panel flex items-center justify-between rounded-xl px-3 py-2.5">
                      <span className="text-sm text-slate-300">{row[0]}</span>
                      <span className="text-sm font-medium text-cyan-200">{row[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-700/60 bg-slate-950/70 p-3">
                  <div className="text-xs text-slate-500">Contract</div>
                  <div className="font-mono mt-2 text-xs text-sky-200">0x051cAD...4bd608</div>
                </div>
                <div className="rounded-xl border border-slate-700/60 bg-slate-950/70 p-3">
                  <div className="text-xs text-slate-500">Network</div>
                  <div className="mt-2 text-sm text-slate-200">Base Sepolia</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-26 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="glass-panel rounded-3xl p-6 sm:p-8"
        >
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Protocol flow</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Visual settlement lifecycle</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Every transfer path follows an explicit, verifiable sequence from policy definition to final escrow resolution.
          </p>

          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            {flow.map((item, idx) => (
              <div key={item} className="relative">
                <div className="glass-panel h-full rounded-2xl p-4">
                  <p className="text-xs text-cyan-200">Step {idx + 1}</p>
                  <p className="mt-2 text-sm text-slate-100">{item}</p>
                </div>
                {idx < flow.length - 1 ? (
                  <div className="flow-connector absolute -right-2 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-26 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Features</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Policy-grade payment capabilities</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((card) => (
              <motion.article
                key={card.title}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass-panel rounded-2xl p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                  <card.icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-100">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="protocol" className="mx-auto max-w-7xl px-4 pb-26 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="glass-panel rounded-3xl p-6 sm:p-8"
        >
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Protocol stack</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Layered system architecture</h2>

          <div className="mt-8 space-y-3">
            {stack.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-panel flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-start"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/14 text-cyan-200">
                  <layer.icon size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{layer.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{layer.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="telemetry" className="mx-auto max-w-7xl px-4 pb-26 sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Live telemetry</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Operational network dashboard</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Runtime telemetry from deployed backend services (API + server-mech), showing settlement health and execution state.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            <KpiCard title="API Health" value="LIVE" detail="policypay-api • base-sepolia" pulse />
            <KpiCard title="Contract" value="0x051cAD...4bd608" detail="Base Sepolia" mono />
            <KpiCard title="Olas Served Requests" value="3" detail="Network source: connected" />
            <KpiCard title="MoonPay Execution" value="EXECUTED" detail="Backend adapter attempted live command" />
            <KpiCard title="Submission Checkpoint" value="10 confirmed" detail="Bounty proof milestone" />
          </div>

          <div className="glass-panel mt-5 rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">Recent jobs</h3>
              <div className="rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                MoonPay CLI command: token balance list
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700/70 text-slate-400">
                    <th className="px-2 py-2 font-medium">Job ID</th>
                    <th className="px-2 py-2 font-medium">Requester</th>
                    <th className="px-2 py-2 font-medium">Task</th>
                    <th className="px-2 py-2 font-medium">Created</th>
                    <th className="px-2 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.jobId} className="border-b border-slate-800/80 text-slate-200">
                      <td className="font-mono px-2 py-3 text-xs text-cyan-200">{job.jobId}</td>
                      <td className="px-2 py-3">{job.requester}</td>
                      <td className="px-2 py-3">{job.task}</td>
                      <td className="px-2 py-3 text-xs text-slate-400">{formatTimestamp(job.createdAt)}</td>
                      <td className="px-2 py-3">
                        <StatusPill status={job.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-26 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="grid gap-4 lg:grid-cols-3"
        >
          <ValueCard
            title="Remove manual payout coordination"
            text="Automate repetitive operational payout flows and eliminate fragmented human approval chains."
            icon={TimerReset}
          />
          <ValueCard
            title="Enforce policy before settlement"
            text="Make policy checks and status gates a protocol-level requirement for every settlement transition."
            icon={CheckCircle2}
          />
          <ValueCard
            title="Secure payment primitive for autonomy"
            text="Give autonomous agents and systems a deterministic escrow-backed way to move value safely."
            icon={CircleDollarSign}
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-linear-to-r from-blue-600/26 via-cyan-500/14 to-indigo-600/24 p-8 shadow-2xl shadow-blue-950/35 sm:p-12"
        >
          <div className="absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-cyan-400/25 blur-[100px]" />
          <p className="text-xs tracking-[0.2em] text-cyan-100 uppercase">Build with PolicyPay</p>
          <h2 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Programmable payments for autonomous systems.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-200/90">
            Design policy-driven settlement rails with production-grade telemetry, deterministic execution, and auditable payout transitions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-92"
            >
              Create / Run Guide
            </Link>
            <Link
              href="https://github.com/web3sim/PolicyPay"
              target="_blank"
              className="rounded-xl border border-white/25 bg-slate-950/35 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-200/45"
            >
              View GitHub
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-800/80 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <BadgeCheck size={18} className="text-cyan-300" />
              PolicyPay
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Web3-native payment protocol for policy-enforced, escrow-secured, and deterministic autonomous settlement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm text-slate-300 sm:grid-cols-3">
            <FooterLink href="#overview" label="Overview" />
            <FooterLink href="#features" label="Features" />
            <FooterLink href="#protocol" label="Protocol" />
            <FooterLink href="#telemetry" label="Live Telemetry" />
            <FooterLink href="/docs" label="Docs" />
            <FooterLink href="https://github.com/web3sim/PolicyPay" label="GitHub" external />
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-slate-500 sm:px-6">
          PolicyPay © 2026. Built for secure protocol-native payment automation.
        </div>
      </footer>
    </main>
  );
}

function KpiCard({
  title,
  value,
  detail,
  pulse,
  mono,
}: {
  title: string;
  value: string;
  detail: string;
  pulse?: boolean;
  mono?: boolean;
}) {
  return (
    <article className="glass-panel rounded-2xl p-4 lg:col-span-1">
      <p className="text-xs text-slate-400 uppercase tracking-wide">{title}</p>
      <div className="mt-3 flex items-center gap-2">
        {pulse ? <span className="soft-live-pulse inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" /> : null}
        <p className={`${mono ? 'font-mono text-sm sm:text-base' : 'text-xl'} font-semibold text-cyan-100`}>{value}</p>
      </div>
      <p className="mt-2 text-xs text-slate-400">{detail}</p>
    </article>
  );
}

function StatusPill({ status }: { status: string }) {
  const label = status.replace(/-/g, ' ').toUpperCase();
  const classes = 'border-cyan-300/35 bg-cyan-400/10 text-cyan-100';

  return <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${classes}`}>{label}</span>;
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  return `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
}

function ValueCard({ title, text, icon: Icon }: { title: string; text: string; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <article className="glass-panel rounded-2xl p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
        <Icon size={18} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
    </article>
  );
}

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="text-slate-300 transition hover:text-cyan-200"
    >
      {label}
    </Link>
  );
}
