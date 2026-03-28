'use client';

import { useState } from 'react';
import Link from 'next/link';

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  initialMode?: AuthMode;
}

export default function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on mode
    console.log('Form submitted in mode:', mode);
  };

  const Form = () => {
    switch (mode) {
      case 'signup':
        return (
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'
                htmlFor='fullName'
              >
                Full Name
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='fullName'
                  placeholder='John Doe'
                  type='text'
                  required
                />
                <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40'>
                  person
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'
                htmlFor='email'
              >
                Email Address
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  required
                />
                <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40'>
                  mail
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'
                htmlFor='password'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='password'
                  placeholder='••••••••'
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-outline transition-colors'
                >
                  <span className='material-symbols-outlined'>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <p className='text-xs text-on-surface-variant ml-1'>
                Must be at least 8 characters long
              </p>
            </div>

            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='confirmPassword'
                  placeholder='••••••••'
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-outline transition-colors'
                >
                  <span className='material-symbols-outlined'>
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                className='w-full bg-primary-container text-on-primary-container font-headline font-bold py-4 rounded-lg hover:bg-primary transition-all duration-300 transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group/btn'
              >
                Create Account
                <span className='material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 transition-transform'>
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        );

      case 'login':
      default:
        return (
          <form className='space-y-8' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'
                htmlFor='email'
              >
                Email Address
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  required
                />
                <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40'>
                  mail
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <label
                className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest'
                htmlFor='password'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body'
                  id='password'
                  placeholder='••••••••'
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-outline transition-colors'
                >
                  <span className='material-symbols-outlined'>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className='flex items-center gap-3 pt-2'>
              <label className='flex items-center gap-2 cursor-pointer group'>
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded border-outline focus:ring-2 focus:ring-primary/20 accent-primary'
                />
                <span className='text-sm text-on-surface-variant font-body'>
                  Remember me
                </span>
              </label>
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                className='w-full bg-primary-container text-on-primary-container font-headline font-bold py-4 rounded-lg hover:bg-primary transition-all duration-300 transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group/btn'
              >
                Secure Login
                <span className='material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 transition-transform'>
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <main className='flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden'>
      {/* Background Editorial Element */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'>
        <div className='absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary-fixed/20 blur-[120px]'></div>
        <div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary-container/30 blur-[100px]'></div>
      </div>

      <div className='w-full max-w-[480px] z-10'>
        {/* Brand Identity Section */}
        <div className='text-center mb-12'>
          <h1 className='font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-3'>
            DentaFlow
          </h1>
          <p className='font-label text-on-surface-variant tracking-wide text-sm uppercase'>
            {mode === 'signup'
              ? 'Create Your Account'
              : 'Clinical Sanctuary Portal'}
          </p>
        </div>

        {/* Auth Card */}
        <div className='bg-surface-container-lowest p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(27,28,27,0.04)] rounded-xl relative overflow-hidden group'>
          {/* Subtle Top Accent */}
          <div className='absolute top-0 left-0 w-full h-1 bg-primary-container/20'></div>

          {mode === 'signup' ? (
            <div className='mb-10 text-center'>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight'>
                Join DentaFlow
              </h2>
              <p className='text-on-surface-variant font-body'>
                Create your account to access our clinical services.
              </p>
            </div>
          ) : (
            <div className='mb-10 text-center'>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight'>
                Welcome Back
              </h2>
              <p className='text-on-surface-variant font-body'>
                Enter your credentials to access your secure profile.
              </p>
            </div>
          )}

          <Form />
          {mode === 'login' ? (
            <div className='mt-12 text-center pt-8 border-t border-outline-variant/10'>
              <p className='text-on-surface-variant text-sm'>
                Don't have an account yet?{' '}
                <Link
                  href={'/auth/signup'}
                  className='text-on-surface font-bold hover:text-primary transition-colors underline-offset-4 underline ml-1'
                >
                  Sign Up
                </Link>
              </p>
            </div>
          ) : (
            <div className='mt-12 text-center pt-8 border-t border-outline-variant/10'>
              <p className='text-on-surface-variant text-sm'>
                Already have an account?{' '}
                <Link
                  href={'/auth/login'}
                  className='text-on-surface font-bold hover:text-primary transition-colors underline-offset-4 underline ml-1'
                >
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
