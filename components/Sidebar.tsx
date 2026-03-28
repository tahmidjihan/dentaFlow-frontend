'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    title: 'Users',
    href: '/dashboard/admin/users',
    icon: 'group',
    roles: ['ADMIN'],
  },
  {
    title: 'Doctors',
    href: '/dashboard/admin/doctors',
    icon: 'medical_services',
    roles: ['ADMIN'],
  },
  {
    title: 'Appointments',
    href: '/dashboard/admin/appointments',
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
];

export function Sidebar({
  role = 'ADMIN',
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  // Improved isActive check that handles exact matches and nested routes properly
  const checkIsActive = (href: string) => {
    // Exact match
    if (pathname === href) return true;

    // For nested routes, check if pathname starts with href + '/'
    // but make sure it's not just a prefix match (e.g., /dashboard/admin should not match /dashboard/administrator)
    if (pathname.startsWith(href + '/')) {
      // Get the remaining path after the href
      const remainingPath = pathname.slice(href.length + 1);
      // Only consider it active if the remaining path doesn't contain another '/'
      // This ensures /dashboard/admin matches /dashboard/admin/users but not /dashboard/admin/users/something
      return !remainingPath.includes('/');
    }

    return false;
  };

  const handleProfileSelect = (option: {
    value: string;
    label: string;
    icon?: string;
  }) => {
    if (option.value === 'logout') {
      alert(
        'Demo: Logout clicked! This would log you out in a real application.',
      );
    } else {
      alert(`Demo: Navigating to ${option.label}...`);
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
                const isActive = checkIsActive(item.href);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='w-full justify-start gap-3 h-auto py-3 px-3'
                >
                  <span className='material-symbols-outlined text-2xl text-outline'>
                    account_circle
                  </span>
                  <div className='flex-1 text-left'>
                    <p className='text-sm font-semibold text-on-surface'>
                      {role === 'ADMIN' ? 'Admin User' : 'Doctor User'}
                    </p>
                    <p className='text-xs text-on-surface-variant'>
                      {role === 'ADMIN' ? 'Administrator' : 'Doctor'}
                    </p>
                  </div>
                  <span className='material-symbols-outlined text-sm text-outline'>
                    expand_more
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem
                  onClick={() =>
                    handleProfileSelect({ value: 'logout', label: 'Log out' })
                  }
                  className='text-error focus:text-error focus:bg-error/10'
                >
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>
                    logout
                  </span>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
