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
          {/* Abstract decorative illustration instead of stock photo */}
          <div className='aspect-[4/5] rounded-[2rem] overflow-hidden editorial-shadow relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-container/30 to-secondary-container/40' />
            {/* Abstract dental-themed SVG illustration */}
            <svg
              viewBox='0 0 400 500'
              className='absolute inset-0 w-full h-full opacity-30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* Tooth-like abstract shape */}
              <path
                d='M200 80C160 80 130 110 130 150C130 190 140 220 150 260C160 300 170 350 170 380C170 410 185 430 200 430C215 430 230 410 230 380C230 350 240 300 250 260C260 220 270 190 270 150C270 110 240 80 200 80Z'
                fill='white'
                fillOpacity='0.15'
              />
              {/* Decorative circles */}
              <circle cx='80' cy='120' r='40' fill='white' fillOpacity='0.08' />
              <circle cx='320' cy='180' r='60' fill='white' fillOpacity='0.06' />
              <circle cx='120' cy='350' r='30' fill='white' fillOpacity='0.1' />
              <circle cx='300' cy='380' r='45' fill='white' fillOpacity='0.07' />
              {/* Abstract wave */}
              <path
                d='M0 280C100 250 150 300 200 270C250 240 300 280 400 260'
                stroke='white'
                strokeWidth='2'
                strokeOpacity='0.2'
              />
              <path
                d='M0 320C120 290 180 340 250 310C320 280 360 320 400 300'
                stroke='white'
                strokeWidth='1.5'
                strokeOpacity='0.15'
              />
            </svg>
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
