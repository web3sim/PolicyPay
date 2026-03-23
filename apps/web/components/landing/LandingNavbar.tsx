'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '#overview', label: 'Overview' },
  { href: '#features', label: 'Features' },
  { href: '#protocol', label: 'Protocol' },
  { href: '#telemetry', label: 'Live Telemetry' },
  { href: '/docs', label: 'Docs' },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(8, 13, 25, 0.86)' : 'rgba(8, 13, 25, 0.46)',
          borderColor: scrolled ? 'rgba(132, 168, 244, 0.32)' : 'rgba(132, 168, 244, 0.16)',
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl sm:px-5"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-300 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20">
            <ShieldCheck size={18} />
          </span>
          <span className="text-lg font-semibold tracking-wide text-slate-100">PolicyPay</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-cyan-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/create"
            className="rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            Backend Guide
          </Link>
          <Link
            href="/docs"
            className="rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
          >
            API Docs
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/70 text-slate-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-700/60 bg-slate-950/92 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-slate-200 transition hover:bg-slate-800/70"
                >
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/create"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-700/70 px-3 py-2 text-center text-sm text-slate-200"
                >
                  Backend Guide
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 px-3 py-2 text-center text-sm font-semibold text-slate-950"
                >
                  API Docs
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
