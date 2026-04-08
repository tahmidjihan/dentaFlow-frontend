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
import { useSignOut } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';

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
  // Admin Navigation (7 items)
  {
    title: 'Overview',
    href: '/dashboard/admin',
    icon: 'dashboard',
    roles: ['ADMIN'],
  },
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
    title: 'Clinics',
    href: '/dashboard/admin/clinics',
    icon: 'business',
    roles: ['ADMIN'],
  },
  {
    title: 'Appointments',
    href: '/dashboard/admin/appointments',
    icon: 'calendar_today',
    roles: ['ADMIN'],
  },
  {
    title: 'Reports',
    href: '/dashboard/admin',
    icon: 'bar_chart',
    roles: ['ADMIN'],
  },
  {
    title: 'Settings',
    href: '/dashboard/admin',
    icon: 'settings',
    roles: ['ADMIN'],
  },
  // Doctor Navigation (5 items)
  {
    title: 'Overview',
    href: '/dashboard/doctor',
    icon: 'dashboard',
    roles: ['DOCTOR'],
  },
  {
    title: 'Appointments',
    href: '/dashboard/doctor/appointments',
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
    title: 'Patients',
    href: '/dashboard/doctor',
    icon: 'people',
    roles: ['DOCTOR'],
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'person',
    roles: ['DOCTOR'],
  },
  // Patient Navigation (5 items)
  {
    title: 'Overview',
    href: '/dashboard/patient',
    icon: 'dashboard',
    roles: ['USER'],
  },
  {
    title: 'My Appointments',
    href: '/dashboard/appointments',
    icon: 'calendar_today',
    roles: ['USER'],
  },
  {
    title: 'Book Appointment',
    href: '/book',
    icon: 'calendar_add_on',
    roles: ['USER'],
  },
  {
    title: 'My Profile',
    href: '/dashboard/profile',
    icon: 'person',
    roles: ['USER'],
  },
  {
    title: 'Settings',
    href: '/dashboard/patient',
    icon: 'settings',
    roles: ['USER'],
  },
];

export function Sidebar({
  role = 'ADMIN',
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useSignOut();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  const checkIsActive = (href: string) => {
    if (pathname === href) return true;
    return false;
  };

  const handleLogout = async () => {
    signOut();
    router.push('/');
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'ADMIN':
        return 'Administrator';
      case 'DOCTOR':
        return 'Doctor';
      default:
        return 'Patient';
    }
  };

  const getRoleName = () => {
    switch (role) {
      case 'ADMIN':
        return 'Admin User';
      case 'DOCTOR':
        return 'Doctor';
      default:
        return 'Patient';
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
              dentaWave
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
                      {getRoleName()}
                    </p>
                    <p className='text-xs text-on-surface-variant'>
                      {getRoleLabel()}
                    </p>
                  </div>
                  <span className='material-symbols-outlined text-sm text-outline'>
                    expand_more
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>person</span>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/')}>
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>home</span>
                  Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='text-destructive focus:text-destructive focus:bg-error/10'
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
