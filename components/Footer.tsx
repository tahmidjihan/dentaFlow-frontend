import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full py-12 px-8 mt-auto bg-surface dark:bg-inverse-surface border-t border-on-surface/5 dark:border-inverse-on-surface/5'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto'>
        <div className='font-headline font-bold text-on-surface dark:text-inverse-on-surface text-xl'>
          DentaWave
        </div>
        <div className='flex flex-wrap justify-center gap-8 font-body text-xs uppercase tracking-widest text-secondary dark:text-inverse-on-surface/50'>
          <Link
            className='hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100'
            href='/privacy'
          >
            Privacy Policy
          </Link>
          <Link
            className='hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100'
            href='/terms'
          >
            Terms of Service
          </Link>
          <Link
            className='hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100'
            href='/contact'
          >
            Contact Us
          </Link>
          <Link
            className='hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100'
            href='/support'
          >
            Support
          </Link>
        </div>
        <div className='font-body text-xs text-secondary dark:text-inverse-on-surface/50'>
          © 2024 DentaWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
