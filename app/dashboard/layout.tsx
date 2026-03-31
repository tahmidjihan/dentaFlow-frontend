import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/components/providers';
import UserAvatar from '@/components/UserAvatar';
import { DashboardGuard } from '../../components/DashboardGuard';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dashboard | DentaFlow',
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
      <DashboardGuard>
        <Providers>
          <header className='border-b border-outline-variant bg-surface px-6 py-4'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-semibold text-on-surface'>
                Dashboard
              </h1>
              <UserAvatar />
            </div>
          </header>
          <main className='flex-1'>{children}</main>
        </Providers>
      </DashboardGuard>
    </div>
  );
}
