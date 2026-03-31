'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/use-auth';
import type { Role } from '@/types/database';

/**
 * Main dashboard route - redirects users to their role-based dashboard
 */
export default function DashboardRedirectPage() {
  const { user, isLoading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth state to load
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login?callbackUrl=/dashboard');
      return;
    }

    // Redirect to role-based dashboard
    const roleDashboards: Record<Role, string> = {
      USER: '/dashboard/patient',
      DOCTOR: '/dashboard/doctor',
      ADMIN: '/dashboard/admin',
    };

    const targetDashboard = user?.role
      ? roleDashboards[user.role]
      : '/dashboard/patient';
    router.push(targetDashboard);
  }, [user, isLoading, isAuthenticated, router]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-surface'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
    </div>
  );
}
