'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const SignupForm = () => (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <Input
        id='fullName'
        label='Full Name'
        placeholder='John Doe'
        type='text'
        icon='person'
        required
      />

      <Input
        id='email'
        label='Email Address'
        placeholder='name@example.com'
        type='email'
        icon='mail'
        required
      />

      <Input
        id='password'
        label='Password'
        placeholder='••••••••'
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? 'visibility_off' : 'visibility'}
        onIconClick={togglePasswordVisibility}
        helperText='Must be at least 8 characters long'
        required
        minLength={8}
      />

      <Input
        id='confirmPassword'
        label='Confirm Password'
        placeholder='••••••••'
        type={showConfirmPassword ? 'text' : 'password'}
        icon={showConfirmPassword ? 'visibility_off' : 'visibility'}
        onIconClick={toggleConfirmPasswordVisibility}
        required
        minLength={8}
      />

      <div className='pt-4'>
        <Button
          type='submit'
          variant='primary'
          size='lg'
          fullWidth
          icon='arrow_forward'
        >
          Create Account
        </Button>
      </div>
    </form>
  );

  const LoginForm = () => (
    <form className='space-y-8' onSubmit={handleSubmit}>
      <Input
        id='email'
        label='Email Address'
        placeholder='name@example.com'
        type='email'
        icon='mail'
        required
      />

      <Input
        id='password'
        label='Password'
        placeholder='••••••••'
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? 'visibility_off' : 'visibility'}
        onIconClick={togglePasswordVisibility}
        required
      />

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
        <Button
          type='submit'
          variant='primary'
          size='lg'
          fullWidth
          icon='arrow_forward'
        >
          Secure Login
        </Button>
      </div>
    </form>
  );

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
            DentaWave
          </h1>
          <p className='font-label text-on-surface-variant tracking-wide text-sm uppercase'>
            {mode === 'signup'
              ? 'Create Your Account'
              : 'Clinical Sanctuary Portal'}
          </p>
        </div>

        {/* Auth Card */}
        <Card variant='elevated' className='p-10 md:p-14 relative overflow-hidden group'>
          {/* Subtle Top Accent */}
          <div className='absolute top-0 left-0 w-full h-1 bg-primary-container/20'></div>

          {mode === 'signup' ? (
            <div className='mb-10 text-center'>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight'>
                Join DentaWave
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

          {mode === 'signup' ? <SignupForm /> : <LoginForm />}

          {mode === 'login' ? (
            <div className='mt-12 text-center pt-8 border-t border-outline-variant/10'>
              <p className='text-on-surface-variant text-sm'>
                Don&apos;t have an account yet?{' '}
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
        </Card>
      </div>
    </main>
  );
}
