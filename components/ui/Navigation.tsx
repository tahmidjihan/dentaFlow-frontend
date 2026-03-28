'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from './Button';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items?: NavItem[];
  brandName?: string;
  showLogin?: boolean;
  showBookButton?: boolean;
}

export default function Navigation({
  items = [
    { label: 'Home', href: '/' },
    { label: 'Clinics', href: '/clinics' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Admin', href: '/admin' },
  ],
  brandName = 'DentaWave',
  showLogin = true,
  showBookButton = true,
}: NavigationProps) {
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
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-on-surface font-headline">
          {brandName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium">
          {items.map((item) => (
            <Link
              key={item.href}
              className={getLinkClass(item.href)}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {showLogin && (
            <Link
              href="/auth/login"
              className="hidden md:block text-secondary font-headline text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}
          {showBookButton && (
            <Button size="sm" variant="primary">
              Book Appointment
            </Button>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20 px-8 py-4">
          <div className="flex flex-col gap-4 font-headline tracking-tight text-sm font-medium">
            {items.map((item) => (
              <Link
                key={item.href}
                className={
                  pathname === item.href ||
                  (item.href === '/clinics' && pathname?.startsWith('/clinics/'))
                    ? 'text-primary font-semibold'
                    : 'text-secondary'
                }
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {showLogin && (
              <button className="text-secondary text-left">Login</button>
            )}
            {showBookButton && (
              <Button size="sm" variant="primary" fullWidth={false}>
                Book Appointment
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
