import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'PolicyPay',
  description: 'Programmable Payments with Policy Enforcement',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
