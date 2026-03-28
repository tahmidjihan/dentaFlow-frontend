'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isActive =
      pathname === href ||
      (href === '/clinics' && pathname?.startsWith('/clinics/'));
    return isActive
      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
      : 'text-secondary hover:text-on-surface transition-colors';
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
          <Link
            href={'/auth/login'}
            className='hidden md:block text-secondary font-headline text-sm font-medium hover:opacity-80 transition-opacity'
          >
            Login
          </Link>
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
            <Link
              className={
                pathname === '/admin'
                  ? 'text-primary font-semibold'
                  : 'text-secondary'
              }
              href='/admin'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <button className='text-secondary text-left'>Login</button>
            <Button size='sm' variant='primary'>
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
