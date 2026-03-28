'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { Role } from '@/types/database';

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  initialMode?: AuthMode;
}

export default function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('USER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on mode
    console.log('Form submitted in mode:', mode, 'with role:', selectedRole);
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

      {/* Role Selection */}
      <div className='space-y-3'>
        <label className='block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1'>
          I am a
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setSelectedRole('USER')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
              selectedRole === 'USER'
                ? 'border-primary bg-primary-fixed/20 text-primary'
                : 'border-outline-variant/20 bg-surface-container-low text-on-surface-variant hover:border-primary/50'
            }`}
          >
            <span className='material-symbols-outlined text-3xl'>person</span>
            <span className='font-headline text-sm font-semibold'>Patient</span>
          </button>
          <button
            type='button'
            onClick={() => setSelectedRole('DOCTOR')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
              selectedRole === 'DOCTOR'
                ? 'border-primary bg-primary-fixed/20 text-primary'
                : 'border-outline-variant/20 bg-surface-container-low text-on-surface-variant hover:border-primary/50'
            }`}
          >
            <span className='material-symbols-outlined text-3xl'>medical_services</span>
            <span className='font-headline text-sm font-semibold'>Doctor</span>
          </button>
        </div>
        {selectedRole === 'DOCTOR' && (
          <p className='text-xs text-on-surface-variant flex items-center gap-1'>
            <span className='material-symbols-outlined text-sm'>info</span>
            Doctor accounts require clinic verification
          </p>
        )}
      </div>

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
