'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

function Testimonial({
  quote,
  name,
  date,
}: {
  quote: string;
  name: string;
  date: string;
}) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card variant='elevated' className='p-8 flex flex-col relative overflow-hidden'>
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

      {/* Star rating */}
      <div className='flex gap-1.5 mb-6'>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className='material-symbols-outlined text-amber-400'
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 300",
            }}
          >
            star
          </span>
        ))}
      </div>

      {/* Quote text */}
      <p className='font-headline text-xl md:text-2xl font-light leading-relaxed mb-8 italic text-gray-700 relative z-10'>
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author info */}
      <div className='mt-auto flex items-center gap-4 pt-6 border-t border-gray-100'>
        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-lg shadow-md'>
          {getInitials(name)}
        </div>
        <div>
          <p className='font-headline font-bold text-lg text-gray-900'>{name}</p>
          <p className='font-label text-sm text-gray-500'>{date}</p>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // TODO: Replace with real reviews API endpoint when available
        // const data = await getReviews();
        // setReviews(Array.isArray(data) ? data : []);
        setReviews([]);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <section className='bg-gradient-to-br from-slate-50 to-white py-32 px-8 overflow-hidden relative'>
        <div className='max-w-screen-2xl mx-auto'>
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
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className='p-8 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest animate-pulse'
              >
                <div className='w-24 h-5 bg-surface-container-high rounded mb-6' />
                <div className='w-full h-16 bg-surface-container-high rounded mb-8' />
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-surface-container-high' />
                  <div className='w-24 h-4 bg-surface-container-high rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className='bg-gradient-to-br from-slate-50 to-white py-32 px-8 overflow-hidden relative'>
        {/* Decorative elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <div className='absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-32 -left-32 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl' />
        </div>

        <div className='max-w-screen-2xl mx-auto relative z-10'>
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
          </div>

          <div className='flex flex-col items-center justify-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-3xl text-outline-variant'>
                rate_review
              </span>
            </div>
            <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
              Patient testimonials coming soon
            </h3>
            <p className='text-sm text-on-surface-variant text-center max-w-md'>
              Patient testimonials will appear here once we start collecting
              reviews from our valued patients.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-gradient-to-br from-slate-50 to-white py-32 px-8 overflow-hidden relative'>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
        <div className='absolute -bottom-32 -left-32 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl' />
      </div>

      <div className='max-w-screen-2xl mx-auto relative z-10'>
        {/* Section header */}
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
          {reviews.map((review) => (
            <Testimonial
              key={review.id}
              quote={review.comment}
              name={review.userName}
              date={new Date(review.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
