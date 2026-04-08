'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Thank you for subscribing! Check your inbox for a confirmation.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className='py-16 md:py-20 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm p-8 md:p-12'>
        <div className='max-w-2xl mx-auto text-center'>
          <span className='material-symbols-outlined text-primary text-4xl mb-4'>
            mail
          </span>
          <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tighter mb-3'>
            Stay Updated with Dental Health Tips
          </h2>
          <p className='font-body text-on-surface-variant mb-8 leading-relaxed'>
            Subscribe to our newsletter for expert dental advice, clinic updates,
            and exclusive offers delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3 max-w-lg mx-auto'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              className='flex-1 px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              aria-label='Email address for newsletter'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-6 py-3 bg-primary text-on-primary font-headline font-semibold rounded-lg hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isSubmitting ? (
                <>
                  <span className='material-symbols-outlined text-[20px] animate-spin'>
                    progress_activity
                  </span>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>

          <p className='text-xs text-on-surface-variant/60 mt-4'>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
