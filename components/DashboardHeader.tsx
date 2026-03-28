'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/ui/Button';

interface DashboardHeaderProps {
  title?: string;
}

export default function DashboardHeader({ title = 'Dashboard' }: DashboardHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        role="DOCTOR"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant/20 z-30 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          className="h-10 w-10 p-0"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </Button>
        <span className="text-lg font-headline font-bold text-on-surface">
          {title}
        </span>
        <div className="w-10" /> {/* Spacer for balance */}
      </header>

      {/* Spacer for mobile header */}
      <div className="md:hidden h-16" />
    </>
  );
}
