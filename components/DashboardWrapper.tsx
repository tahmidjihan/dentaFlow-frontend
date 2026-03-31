'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import { DashboardGuard } from './DashboardGuard';

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
      <DashboardGuard>
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
      </DashboardGuard>
    </>
  );
}
