import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PolicyPay',
  description: 'Programmable Payments with Policy Enforcement',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="nav">
            <div className="nav-inner">
              <Link href="/" className="brand">PolicyPay</Link>
              <nav className="nav-links">
                <Link className="nav-link" href="/">Overview</Link>
                <Link className="nav-link" href="/#features">Features</Link>
                <Link className="nav-link" href="/#protocol">Protocol</Link>
                <Link className="nav-link" href="/create">Create / Run</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
