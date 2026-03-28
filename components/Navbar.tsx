'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useSession, useSignOut } from '@/lib/hooks/use-auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useSession();
  const signOutMutation = useSignOut();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isActive =
      pathname === href ||
      (href === '/clinics' && pathname?.startsWith('/clinics/'));
    return isActive
      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
      : 'text-secondary hover:text-on-surface transition-colors';
  };

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <nav className='fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5 transition-all duration-300'>
      <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
        <Link href="/" className='text-2xl font-bold tracking-tighter text-on-surface font-headline'>
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
          {isAuthenticated && user ? (
            <>
              <div className='hidden md:flex items-center gap-3'>
                <span className='text-sm font-medium text-on-surface'>
                  {user.name}
                </span>
                {user.role === 'ADMIN' && (
                  <span className='text-xs px-2 py-1 bg-primary-container text-on-primary rounded'>
                    Admin
                  </span>
                )}
                {user.role === 'DOCTOR' && (
                  <span className='text-xs px-2 py-1 bg-secondary-container text-on-secondary rounded'>
                    Doctor
                  </span>
                )}
              </div>
              <Button
                size='sm'
                variant='outline'
                onClick={handleSignOut}
                disabled={signOutMutation.isPending}
              >
                {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
              </Button>
            </>
          ) : (
            <Link
              href={'/auth/login'}
              className='hidden md:block text-secondary font-headline text-sm font-medium hover:opacity-80 transition-opacity'
            >
              Login
            </Link>
          )}
          <Button size='sm' variant='primary'>
            Book Appointment
          </Button>

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
            {isAuthenticated && user ? (
              <>
                <div className='flex items-center gap-2 py-2'>
                  <span className='text-on-surface'>
                    {user.name}
                  </span>
                  {user.role === 'ADMIN' && (
                    <span className='text-xs px-2 py-1 bg-primary-container text-on-primary rounded'>
                      Admin
                    </span>
                  )}
                  {user.role === 'DOCTOR' && (
                    <span className='text-xs px-2 py-1 bg-secondary-container text-on-secondary rounded'>
                      Doctor
                    </span>
                  )}
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={handleSignOut}
                  disabled={signOutMutation.isPending}
                  fullWidth
                >
                  {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                </Button>
              </>
            ) : (
              <Link
                className='text-secondary'
                href='/auth/login'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Button size='sm' variant='primary' fullWidth>
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
