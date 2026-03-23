import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PolicyPay Mesh',
  description: 'Olas x MoonPay policy-constrained agent payments',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
