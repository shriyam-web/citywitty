import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { SupportWidget } from '@/components/support-widget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CityWitty - Premium Discount Card Platform',
  description: 'Get exclusive offers from partnered merchants across various categories and cities with CityWitty discount card.',
  keywords: 'discount card, offers, merchants, city deals, exclusive discounts',
  icons: {
    icon: '/favicon.ico',   // public folder se serve hoga
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <SupportWidget />
        </AuthProvider>
      </body>
    </html>
  );
}