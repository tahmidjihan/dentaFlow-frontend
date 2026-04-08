import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dashboard | dentaWave',
  description: 'Dashboard for managing appointments, clinics, and users',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang='en'
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      {children}
    </div>
  );
}
