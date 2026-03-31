'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import Button from '@/components/ui/Button';

interface MobileHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function MobileHeader({
  title,
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <>
      {/* Mobile Header */}
      <header className='md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant/20 z-30 flex items-center justify-between px-4'>
        <Button
          variant='ghost'
          className='h-10 w-10 p-0 text-black'
          onClick={onMenuClick}
        >
          <Menu className='h-5 w-5' />
        </Button>
        <span className='text-lg font-headline font-bold text-on-surface'>
          {title}
        </span>
        <div className='w-10' /> {/* Spacer for balance */}
      </header>

      {/* Spacer for mobile header */}
      <div className='md:hidden h-16' />
    </>
  );
}
