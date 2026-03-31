'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/use-auth';

export default function DoctorGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (user?.role !== 'DOCTOR') {
      router.push('/dashboard');
      return;
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-surface'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (user?.role !== 'DOCTOR') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-surface'>
        <div className='text-center'>
          <p className='text-on-surface mb-4'>
            You do not have permission to access this page.
          </p>
          <p className='text-secondary text-sm'>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
