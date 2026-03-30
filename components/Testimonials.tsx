'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

interface TestimonialProps {
  quote: string;
  name: string;
  profession: string;
  index: number;
}

function Testimonial({ quote, name, profession, index }: TestimonialProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      variant='elevated'
      className={`p-8 flex flex-col relative overflow-hidden transition-all duration-500 ease-out hover:transform hover:-translate-y-2 hover:shadow-2xl`}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative quote icon */}
      <div className='absolute top-4 right-4 opacity-10'>
        <svg
          width='80'
          height='80'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='text-primary'
        >
          <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
        </svg>
      </div>

      {/* Star rating with animation */}
      <div className='flex gap-1.5 mb-6'>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`material-symbols-outlined text-amber-400 transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 300",
              animationDelay: `${i * 100}ms`,
            }}
          >
            star
          </span>
        ))}
      </div>

      {/* Quote text with better typography */}
      <p className='font-headline text-xl md:text-2xl font-light leading-relaxed mb-8 italic text-gray-700 relative z-10'>
        "{quote}"
      </p>

      {/* Author info with avatar placeholder */}
      <div className='mt-auto flex items-center gap-4 pt-6 border-t border-gray-100'>
        {/* Avatar circle with initials */}
        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-lg shadow-md'>
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div>
          <p className='font-headline font-bold text-lg text-gray-900'>
            {name}
          </p>
          <p className='font-label text-sm uppercase tracking-widest text-gray-500'>
            {profession}
          </p>
        </div>
      </div>

      {/* Hover effect gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className='bg-gradient-to-br from-slate-50 to-white py-32 px-8 overflow-hidden relative'>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-32 -left-32 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl' />
      </div>

      <div className='max-w-screen-2xl mx-auto relative z-10'>
        {/* Section header with decorative line */}
        <div className='text-center mb-20'>
          <div className='inline-flex items-center gap-3 mb-6'>
            <div className='w-12 h-px bg-primary/50' />
            <span className='text-primary font-label text-sm uppercase tracking-widest'>
              Testimonials
            </span>
            <div className='w-12 h-px bg-primary/50' />
          </div>
          <h2 className='font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 mb-6'>
            Patient Experiences
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto font-light'>
            Discover what our patients have to say about their transformative
            dental care journey with us.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <Testimonial
            quote="The most calming dental experience I've ever had. The interior feels like a spa, and the care is genuinely exceptional."
            name='Elena Rostova'
            profession='Architect'
            index={0}
          />
          <Testimonial
            quote='Transparent pricing and incredible technology. I was able to see a 3D scan of my teeth before we even started.'
            name='Marcus Chen'
            profession='Software Engineer'
            index={1}
          />
          <Testimonial
            quote="I've always had dental anxiety, but the team here made me feel completely at ease. Truly modern care."
            name='Sarah Jenkins'
            profession='Yoga Instructor'
            index={2}
          />
        </div>

        {/* Bottom decorative element */}
        <div className='flex justify-center mt-16'>
          <div className='flex items-center gap-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='w-2 h-2 rounded-full bg-primary/30'
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
