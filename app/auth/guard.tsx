'use client';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {}

function Guard(props: Props) {
  const {} = props;
  const { data: session, isPending: isLoading } = authClient.useSession();
  useEffect(() => {
    if (!isLoading && session) {
      redirect('/');
    }
  }, [session]);
  return <></>;
}

export default Guard;
