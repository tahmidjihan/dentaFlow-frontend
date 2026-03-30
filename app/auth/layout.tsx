import { authClient } from '@/lib/auth-client';
import React from 'react';
import Guard from './guard';

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Guard />
    </>
  );
}

export default Layout;
