'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { authClient } from '@/lib/auth-client';
import UserAvatar from '@/components/UserAvatar';

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
      : 'text-secondary hover:text-on-surface transition-colors';
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className='fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5 transition-all duration-300'>
      <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
        <Link
          href='/'
          className='text-2xl font-bold tracking-tighter text-on-surface font-headline'
        >
          DentaWave
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium'>
          <Link className={getLinkClass('/')} href='/'>
            Home
          </Link>
          <Link className={getLinkClass('/clinics')} href='/clinics'>
            Clinics
          </Link>
          <Link className={getLinkClass('/doctors')} href='/doctors'>
            Doctors
          </Link>
          <Link className={getLinkClass('/dashboard')} href='/dashboard'>
            Dashboard
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          {isAuthenticated && user ? <UserAvatar /> : null}
          {isAuthenticated && user ? (
            user.role === 'ADMIN' ? (
              <Button
                size='sm'
                variant='primary'
                onClick={() => router.push('/dashboard/admin')}
              >
                Admin Dashboard
              </Button>
            ) : user.role === 'DOCTOR' ? (
              <Button
                size='sm'
                variant='primary'
                onClick={() => router.push('/dashboard/doctor')}
              >
                Doctor Dashboard
              </Button>
            ) : (
              <Button
                size='sm'
                variant='primary'
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </Button>
            )
          ) : (
            <Button
              size='sm'
              variant='primary'
              onClick={() => router.push('/clinics')}
            >
              Book Appointment
            </Button>
          )}

          {/* Mobile menu button */}
          <button
            className='md:hidden text-on-surface'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            <span className='material-symbols-outlined'>menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-surface border-t border-outline-variant/20 px-8 py-4'>
          <div className='flex flex-col gap-4 font-headline tracking-tight text-sm font-medium'>
            <Link
              className={
                pathname === '/'
                  ? 'text-primary font-semibold'
                  : 'text-secondary'
              }
              href='/'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={
                pathname === '/clinics' || pathname?.startsWith('/clinics/')
                  ? 'text-primary font-semibold'
                  : 'text-secondary'
              }
              href='/clinics'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clinics
            </Link>
            <Link
              className={
                pathname === '/doctors'
                  ? 'text-primary font-semibold'
                  : 'text-secondary'
              }
              href='/doctors'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Doctors
            </Link>
            <Link
              className={
                pathname === '/dashboard'
                  ? 'text-primary font-semibold'
                  : 'text-secondary'
              }
              href='/dashboard'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
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
                    <p className='text-xs text-on-surface/70'>{user.email}</p>
                  </div>
                </div>
                <Button size='sm' variant='outline' onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            )}
            {isAuthenticated && user ? (
              user.role === 'ADMIN' ? (
                <Button
                  size='sm'
                  variant='primary'
                  fullWidth
                  onClick={() => {
                    router.push('/dashboard/admin');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Admin Dashboard
                </Button>
              ) : user.role === 'DOCTOR' ? (
                <Button
                  size='sm'
                  variant='primary'
                  fullWidth
                  onClick={() => {
                    router.push('/dashboard/doctor');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Doctor Dashboard
                </Button>
              ) : (
                <Button
                  size='sm'
                  variant='primary'
                  fullWidth
                  onClick={() => {
                    router.push('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              )
            ) : (
              <Button
                size='sm'
                variant='primary'
                fullWidth
                onClick={() => {
                  router.push('/clinics');
                  setIsMobileMenuOpen(false);
                }}
              >
                Book Appointment
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
