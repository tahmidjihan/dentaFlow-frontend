'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/use-auth';
import type { Role } from '@/types/database';

export default function RoleGuard({
  children,
  allowedRoles,
  redirectPath,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
  redirectPath?: string;
}) {
  const { user, isLoading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user?.role && !allowedRoles.includes(user.role)) {
      const roleDashboards: Record<Role, string> = {
        USER: '/dashboard/patient',
        DOCTOR: '/dashboard/doctor',
        ADMIN: '/dashboard/admin',
      };

      const defaultDashboard =
        roleDashboards[user.role] || '/dashboard/patient';
      router.push(redirectPath || defaultDashboard);
      return;
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, redirectPath, router]);
  if (isLoading || !isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-surface'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  // Check role access
  if (user?.role && !allowedRoles.includes(user.role)) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-surface'>
        <div className='text-center'>
          <p className='text-on-surface mb-4'>
            Redirecting to your dashboard...
          </p>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
