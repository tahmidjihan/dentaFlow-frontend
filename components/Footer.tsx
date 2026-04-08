'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className='w-full bg-surface-container-lowest border-t border-outline-variant/10'>
      {/* Main Footer */}
      <div className='max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12'>
          {/* Company Info - 4 columns */}
          <div className='lg:col-span-4'>
            <Link href='/' className='text-2xl font-bold tracking-tighter text-on-surface font-headline inline-block mb-4'>
              DentaWave
            </Link>
            <p className='text-sm text-on-surface-variant leading-relaxed mb-6 max-w-sm'>
              Experience clinical excellence within a sanctuary designed for your
              comfort. We combine advanced technology with a human-centric
              approach to dental care.
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <span className='material-symbols-outlined text-primary text-sm mt-0.5'>
                  location_on
                </span>
                <span className='text-sm text-on-surface-variant'>
                  123 Dental Street, London, EC2A 4BX
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='material-symbols-outlined text-primary text-sm'>
                  phone
                </span>
                <span className='text-sm text-on-surface-variant'>
                  +44 (0) 20 7946 0958
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='material-symbols-outlined text-primary text-sm'>
                  mail
                </span>
                <span className='text-sm text-on-surface-variant'>
                  info@dentawave.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className='lg:col-span-2'>
            <h3 className='font-headline font-bold text-on-surface mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link href='/about' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/clinics' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Clinics
                </Link>
              </li>
              <li>
                <Link href='/doctors' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Doctors
                </Link>
              </li>
              <li>
                <Link href='/blog' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support - 2 columns */}
          <div className='lg:col-span-2'>
            <h3 className='font-headline font-bold text-on-surface mb-4'>
              Support
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link href='/contact' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='/book' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/terms' className='text-sm text-on-surface-variant hover:text-primary transition-colors'>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter - 4 columns */}
          <div className='lg:col-span-4'>
            <h3 className='font-headline font-bold text-on-surface mb-4'>
              Follow Us
            </h3>

            {/* Social Media Links */}
            <div className='flex items-center gap-3 mb-6'>
              <a
                href='https://facebook.com/dentawave'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors'
                aria-label='Facebook'
              >
                <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                  facebook
                </span>
              </a>
              <a
                href='https://twitter.com/dentawave'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors'
                aria-label='Twitter'
              >
                <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                  twitter
                </span>
              </a>
              <a
                href='https://instagram.com/dentawave'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors'
                aria-label='Instagram'
              >
                <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                  photo_camera
                </span>
              </a>
              <a
                href='https://linkedin.com/company/dentawave'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 transition-colors'
                aria-label='LinkedIn'
              >
                <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                  work
                </span>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className='font-headline font-bold text-on-surface mb-2 text-sm'>
                Subscribe to Our Newsletter
              </h4>
              <p className='text-xs text-on-surface-variant mb-3'>
                Get dental health tips and exclusive offers delivered to your
                inbox.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className='flex gap-2'
              >
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your email'
                  className='flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
                  aria-label='Newsletter email'
                />
                <button
                  type='submit'
                  className='px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container transition-colors text-sm'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-outline-variant/10'>
        <div className='max-w-screen-2xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-on-surface-variant'>
            &copy; {currentYear} DentaWave. All rights reserved.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-6'>
            <Link
              href='/privacy'
              className='text-xs text-on-surface-variant hover:text-primary transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='text-xs text-on-surface-variant hover:text-primary transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/contact'
              className='text-xs text-on-surface-variant hover:text-primary transition-colors'
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
