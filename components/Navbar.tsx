'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { authClient } from '@/lib/auth-client';
import UserAvatar from '@/components/UserAvatar';
import DarkModeToggle from '@/components/DarkModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending: isLoading } = authClient.useSession();
  const signOut = authClient.signOut;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = session?.user as {
    id: string;
    name: string;
    email: string;
    role?: 'USER' | 'ADMIN' | 'DOCTOR';
  } | null;
  const isAuthenticated = !!user;

  const getLinkClass = (href: string) => {
    const isActive =
      pathname === href ||
      (href === '/clinics' && pathname?.startsWith('/clinics/'));
    return isActive
      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
      : 'text-on-surface-variant hover:text-on-surface transition-colors';
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'DOCTOR':
        return '/dashboard/doctor';
      default:
        return '/dashboard/patient';
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/clinics', label: 'Clinics' },
    { href: '/doctors', label: 'Doctors' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const authNavLinks = [
    ...navLinks,
    { href: '/book', label: 'Book' },
  ];

  const links = isAuthenticated ? authNavLinks : navLinks;

  return (
    <nav className='fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5 transition-all duration-300'>
      <div className='flex justify-between items-center v-full px-4 md:px-8 py-4 max-w-screen-2xl mx-auto'>
        <Link
          href='/'
          className='text-2xl font-bold tracking-tighter text-on-surface font-headline'
        >
          DentaWave
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-6 font-headline tracking-tight text-sm font-medium'>
          {links.map((link) => (
            <Link key={link.href} className={getLinkClass(link.href)} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-2 rounded-full hover:bg-surface-container-high transition-colors p-1'>
                  <UserAvatar />
                  <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                    expand_more
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>
                  <p className='text-sm font-semibold text-on-surface'>{user.name}</p>
                  <p className='text-xs text-on-surface-variant'>{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(getDashboardLink())}>
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>dashboard</span>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>person</span>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className='text-destructive focus:text-destructive'>
                  <span className='material-symbols-outlined mr-2 h-4 w-4'>logout</span>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size='sm'
              variant='primary'
              onClick={() => router.push('/auth/login?callbackUrl=/dashboard')}
            >
              Log In
            </Button>
          )}

          {isAuthenticated && (
            <Button
              size='sm'
              variant='primary'
              onClick={() => router.push('/book')}
              className='hidden md:flex'
            >
              Book Now
            </Button>
          )}

          {/* Mobile menu button */}
          <button
            className='lg:hidden text-on-surface'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            <span className='material-symbols-outlined'>menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-surface border-t border-outline-variant/20 px-4 md:px-8 py-4'>
          <div className='flex flex-col gap-4 font-headline tracking-tight text-sm font-medium'>
            {links.map((link) => (
              <Link
                key={link.href}
                className={
                  pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant'
                }
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className='flex items-center justify-between py-2 border-t border-outline-variant/20 mt-2'>
              <span className='text-xs text-on-surface-variant'>Dark Mode</span>
              <DarkModeToggle />
            </div>

            {isAuthenticated && user && (
              <div className='flex items-center justify-between py-2 border-t border-outline-variant/20 mt-2'>
                <div className='flex items-center gap-2'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-on-primary'>
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-on-surface'>
                      {user.name}
                    </p>
                    <p className='text-xs text-on-surface-variant'>{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && user ? (
              <>
                <Button
                  size='sm'
                  variant='primary'
                  fullWidth
                  onClick={() => {
                    router.push(getDashboardLink());
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  size='sm'
                  variant='primary'
                  fullWidth
                  onClick={() => {
                    router.push('/book');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Book Now
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  fullWidth
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                size='sm'
                variant='primary'
                fullWidth
                onClick={() => {
                  router.push('/auth/login?callbackUrl=/dashboard');
                  setIsMobileMenuOpen(false);
                }}
              >
                Log In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
