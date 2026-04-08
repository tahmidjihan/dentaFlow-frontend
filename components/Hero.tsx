'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className='relative min-h-[60vh] max-h-[70vh] flex items-center px-4 md:px-8 max-w-screen-2xl mx-auto py-12 md:py-20'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center w-full'>
        <div
          className={`lg:col-span-7 z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 md:mb-6 block'>
            Wellness Redefined
          </span>
          <h1 className='font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-on-background tracking-tighter leading-[0.95] mb-6 md:mb-8'>
            Modern Dental <br /> Care for <br />{' '}
            <span className='italic font-light'>Modern Lives.</span>
          </h1>
          <p className='font-body text-secondary text-base md:text-lg lg:text-xl max-w-lg mb-8 md:mb-12 leading-relaxed'>
            Experience clinical excellence within a sanctuary designed for your
            comfort. We combine advanced technology with a human-centric
            approach to dental care.
          </p>
          <div className='flex flex-wrap gap-4 md:gap-6'>
            <Link href='/book'>
              <Button size='lg' variant='primary' icon='calendar_today'>
                Book Now
              </Button>
            </Link>
            <Link
              href='/clinics'
              className='flex items-center gap-3 font-headline font-bold text-on-surface group'
            >
              Explore Clinics
              <span className='material-symbols-outlined transition-transform group-hover:translate-x-1'>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
        <div
          className={`lg:col-span-5 relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className='aspect-[4/5] rounded-[2rem] overflow-hidden editorial-shadow'>
            <img
              className='w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700'
              src='https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop'
              alt='Minimalist aesthetic dental clinic interior with soft natural light'
            />
          </div>
          {/* Decorative element */}
          <div className='absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-secondary-container p-6 md:p-8 rounded-2xl hidden md:block'>
            <p className='font-headline text-on-secondary-container font-bold text-3xl md:text-4xl leading-tight'>
              98%
            </p>
            <p className='font-label text-on-secondary-container/70 text-xs uppercase tracking-widest mt-1'>
              Patient Satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce'>
        <span className='text-xs font-label text-on-surface-variant uppercase tracking-widest'>
          Scroll
        </span>
        <span className='material-symbols-outlined text-on-surface-variant text-lg'>
          expand_more
        </span>
      </div>
    </section>
  );
}
