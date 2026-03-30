'use client';

import { authClient, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardGuardProps {
  children: React.ReactNode;
}

export function DashboardGuard({ children }: DashboardGuardProps) {
  const { data: session, isPending: isLoading } = authClient.useSession();

  useEffect(() => {
    // console.log(session);
    if (!isLoading && !session) {
      redirect('/auth/login?callbackUrl=/dashboard');
    }
  }, [session]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
