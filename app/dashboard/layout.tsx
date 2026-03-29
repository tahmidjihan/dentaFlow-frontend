import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
import { useSession, useSignOut } from '@/lib/hooks/use-auth';
import Link from 'next/link';

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

function AuthButton() {
  const { isAuthenticated } = useSession();
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.href = '/';
      },
    });
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleSignOut}
        disabled={signOutMutation.isPending}
        className='rounded-md bg-error px-4 py-2 text-sm font-medium text-on-error hover:bg-error/90 disabled:opacity-50'
      >
        {signOutMutation.isPending ? 'Signing out...' : 'Logout'}
      </button>
    );
  }

  return (
    <Link
      href='/auth/login'
      className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary/90'
    >
      Sign In
    </Link>
  );
}

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
      <Providers>
        <header className='border-b border-outline-variant bg-surface px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold text-on-surface'>Dashboard</h1>
            <AuthButton />
          </div>
        </header>
        <main className='flex-1'>{children}</main>
      </Providers>
      <Toaster />
    </div>
  );
}
