'use client';

import { useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardGuardProps {
  children: React.ReactNode;
}

export function DashboardGuard({ children }: DashboardGuardProps) {
  const session: any = useSession();
  useEffect(() => {
    // console.log(session);
    if (session.isPending) return; // Wait until the session is loaded
    if (!session.isAuthenticated) {
      redirect('/auth/login'); // Redirect to login if not authenticated
    }
  }, [session]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
