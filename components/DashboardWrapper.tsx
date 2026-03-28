'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';

type UserRole = 'DOCTOR' | 'ADMIN' | 'USER';

interface DashboardWrapperProps {
  children: React.ReactNode;
  role?: UserRole;
  mobileTitle?: string;
}

export default function DashboardWrapper({
  children,
  role = 'DOCTOR',
  mobileTitle = 'Dashboard',
}: DashboardWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <MobileHeader
        title={mobileTitle}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      {children}
    </>
  );
}
