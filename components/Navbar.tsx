'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5 transition-all duration-300'>
      <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
        <div className='text-2xl font-bold tracking-tighter text-on-surface font-headline'>
          DentaWave
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium'>
          <Link
            className='text-primary font-semibold border-b-2 border-primary pb-1'
            href='/'
          >
            Home
          </Link>
          <Link
            className='text-secondary hover:text-on-surface transition-colors'
            href='/clinics'
          >
            Clinics
          </Link>
          <Link
            className='text-secondary hover:text-on-surface transition-colors'
            href='/dashboard'
          >
            Dashboard
          </Link>
          <Link
            className='text-secondary hover:text-on-surface transition-colors'
            href='/admin'
          >
            Admin
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <button className='hidden md:block text-secondary font-headline text-sm font-medium hover:opacity-80 transition-opacity'>
            Login
          </button>
          <button className='bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline text-sm font-semibold scale-95 active:opacity-80 transition-transform hover:bg-primary transition-all duration-300'>
            Book Appointment
          </button>

          {/* Mobile menu button */}
          <button
            className='md:hidden text-on-surface'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              className='text-primary font-semibold'
              href='/'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className='text-secondary'
              href='/clinics'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clinics
            </Link>
            <Link
              className='text-secondary'
              href='/dashboard'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              className='text-secondary'
              href='/admin'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <button className='text-secondary text-left'>Login</button>
            <button className='bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline text-sm font-semibold w-fit'>
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
