'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 10000, suffix: '+', label: 'Patients Served', icon: 'group' },
  { value: 50, suffix: '+', label: 'Expert Dentists', icon: 'medical_services' },
  { value: 15, suffix: '', label: 'Clinics Nationwide', icon: 'business' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: 'sentiment_satisfied' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='flex flex-col items-center text-center p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-primary text-2xl md:text-3xl'>
                {stat.icon}
              </span>
            </div>
            <p className='font-headline text-2xl md:text-4xl font-bold text-on-surface mb-2'>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className='font-label text-xs md:text-sm text-on-surface-variant uppercase tracking-widest'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
