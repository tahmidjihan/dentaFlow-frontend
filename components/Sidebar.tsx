'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';

type UserRole = 'DOCTOR' | 'ADMIN' | 'USER';

interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles?: UserRole[];
}

interface SidebarProps {
  role?: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  // Admin Navigation
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    roles: ['ADMIN'],
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: 'group',
    roles: ['ADMIN'],
  },
  {
    title: 'Doctors',
    href: '/dashboard/doctors',
    icon: 'medical_services',
    roles: ['ADMIN'],
  },
  {
    title: 'Clinics',
    href: '/dashboard/clinics',
    icon: 'business',
    roles: ['ADMIN'],
  },
  {
    title: 'Appointments',
    href: '/dashboard/appointments',
    icon: 'calendar_today',
    roles: ['ADMIN'],
  },
  // Doctor Navigation
  {
    title: 'Appointments',
    href: '/dashboard/doctor',
    icon: 'calendar_today',
    roles: ['DOCTOR'],
  },
  {
    title: 'Clinics',
    href: '/dashboard/doctor/clinics',
    icon: 'business',
    roles: ['DOCTOR'],
  },
  {
    title: 'My Patients',
    href: '/dashboard/doctor/patients',
    icon: 'group',
    roles: ['DOCTOR'],
  },
  // Common Navigation
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    roles: ['ADMIN', 'DOCTOR', 'USER'],
  },
];

export function Sidebar({
  role = 'DOCTOR',
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  const profileOptions = [
    { value: 'profile', label: 'Profile Settings', icon: 'person' },
    { value: 'settings', label: 'Account Settings', icon: 'settings' },
    { value: 'logout', label: 'Log out', icon: 'logout' },
  ];

  const handleProfileSelect = (option: {
    value: string;
    label: string;
    icon?: string;
  }) => {
    if (option.value === 'logout') {
      console.log('Logging out...');
    } else {
      console.log(`Navigating to ${option.value}...`);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-outline-variant/20 transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-between h-16 px-6 border-b border-outline-variant/10'>
            <Link
              href='/'
              className='text-xl font-headline font-extrabold tracking-tighter text-on-surface'
            >
              DentaFlow
            </Link>
            {onClose && (
              <Button
                variant='ghost'
                className='md:hidden h-8 w-8 p-0'
                onClick={onClose}
              >
                <span className='material-symbols-outlined text-sm'>close</span>
              </Button>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className='flex-1 px-3 py-4'>
            <nav className='space-y-1'>
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary/10 text-primary border-l-2 border-primary'
                        : 'text-on-surface-variant hover:bg-surface-container-high',
                    )}
                  >
                    <span
                      className={cn(
                        'material-symbols-outlined text-base',
                        isActive ? 'text-primary' : 'text-outline',
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          <Separator className='bg-outline-variant/20' />

          {/* User Profile */}
          <div className='p-4'>
            <Dropdown
              trigger={
                <Button
                  variant='ghost'
                  className='w-full justify-start gap-3 h-auto py-3 px-3'
                >
                  <span className='material-symbols-outlined text-2xl text-outline'>
                    account_circle
                  </span>
                  <div className='flex-1 text-left'>
                    <p className='text-sm font-semibold text-on-surface'>
                      Dr. John Doe
                    </p>
                    <p className='text-xs text-on-surface-variant'>
                      {role === 'ADMIN' ? 'Administrator' : 'Doctor'}
                    </p>
                  </div>
                  <span className='material-symbols-outlined text-sm text-outline'>
                    expand_more
                  </span>
                </Button>
              }
              options={profileOptions}
              onSelect={handleProfileSelect}
              align='right'
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
