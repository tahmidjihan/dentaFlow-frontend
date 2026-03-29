'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useSignIn, useSignUp } from '@/lib/hooks/use-auth';
import type { Role } from '@/types/database';

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  initialMode?: AuthMode;
}

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'DOCTOR']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
    reset: resetSignup,
    watch: watchSignup,
    setValue: setSignupValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'USER',
    },
  });

  const selectedRole = watchSignup('role');

  const onLogin = async (data: LoginFormData) => {
    signInMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success('Welcome back!');
          router.push('/dashboard');
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Invalid email or password');
        },
      },
    );
  };

  const onSignup = async (data: SignupFormData) => {
    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully!');
          router.push('/dashboard');
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Failed to create account');
        },
      },
    );
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    // Reset forms when switching modes
    resetLogin();
    resetSignup();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <main className='min-h-screen flex items-center justify-center px-4 py-12 bg-surface'>
      <div className='w-full max-w-[400px]'>
        {/* Brand Section */}
        <div className='text-center mb-8 space-y-2'>
          <h1 className='font-serif text-5xl font-light tracking-tight text-on-surface'>
            DentaWave
          </h1>
          <p className='text-on-surface-variant text-sm font-light tracking-wide'>
            {mode === 'signup' ? 'Begin your journey' : 'Return to care'}
          </p>
        </div>

        {/* Auth Card */}
        <Card variant='elevated' className='p-8 rounded-2xl shadow-sm'>
          {/* Mode Header */}
          <div className='mb-8 text-center'>
            <h2 className='font-serif text-2xl font-light text-on-surface mb-1'>
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </h2>
            <p className='text-on-surface-variant text-xs font-light tracking-wide'>
              {mode === 'signup'
                ? 'Join our community of dental professionals'
                : 'Access your dashboard'}
            </p>
          </div>

          {/* Forms */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit(onLogin)} className='space-y-5'>
              <Input
                id='email'
                label='Email'
                placeholder='name@example.com'
                type='email'
                error={loginErrors.email?.message}
                {...registerLogin('email')}
              />

              <Input
                id='password'
                label='Password'
                placeholder='••••••••'
                type={showPassword ? 'text' : 'password'}
                icon={showPassword ? 'visibility_off' : 'visibility'}
                onIconClick={togglePasswordVisibility}
                error={loginErrors.password?.message}
                {...registerLogin('password')}
              />

              <Button
                type='submit'
                variant='primary'
                size='lg'
                fullWidth
                loading={isLoginSubmitting || signInMutation.isPending}
                disabled={isLoginSubmitting || signInMutation.isPending}
              >
                Sign in
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignup)} className='space-y-5'>
              <Input
                id='name'
                label='Full name'
                placeholder='Dr. John Doe'
                type='text'
                error={signupErrors.name?.message}
                {...registerSignup('name')}
              />

              <Input
                id='email'
                label='Email'
                placeholder='name@example.com'
                type='email'
                error={signupErrors.email?.message}
                {...registerSignup('email')}
              />

              <Input
                id='password'
                label='Password'
                placeholder='••••••••'
                type={showPassword ? 'text' : 'password'}
                icon={showPassword ? 'visibility_off' : 'visibility'}
                onIconClick={togglePasswordVisibility}
                error={signupErrors.password?.message}
                helperText='8+ chars, 1 uppercase, 1 number'
                {...registerSignup('password')}
              />

              <Input
                id='confirmPassword'
                label='Confirm password'
                placeholder='••••••••'
                type={showConfirmPassword ? 'text' : 'password'}
                icon={showConfirmPassword ? 'visibility_off' : 'visibility'}
                onIconClick={toggleConfirmPasswordVisibility}
                error={signupErrors.confirmPassword?.message}
                {...registerSignup('confirmPassword')}
              />

              {/* Role Selection */}
              <div className='space-y-2'>
                <label className='block text-xs font-light tracking-wider text-on-surface-variant uppercase ml-1'>
                  Account type
                </label>
                <div className='flex gap-3'>
                  <button
                    type='button'
                    onClick={() => setSignupValue('role', 'USER')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 text-sm font-light ${
                      selectedRole === 'USER'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/20 bg-transparent text-on-surface-variant hover:border-outline-variant/40'
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type='button'
                    onClick={() => setSignupValue('role', 'DOCTOR')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 text-sm font-light ${
                      selectedRole === 'DOCTOR'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/20 bg-transparent text-on-surface-variant hover:border-outline-variant/40'
                    }`}
                  >
                    Doctor
                  </button>
                </div>
                {selectedRole === 'DOCTOR' && (
                  <p className='text-xs text-on-surface-variant/70 flex items-center gap-1.5 mt-2'>
                    <span className='text-xs'>ℹ️</span>
                    Verification required for doctor accounts
                  </p>
                )}
              </div>

              <Button
                type='submit'
                variant='primary'
                size='lg'
                fullWidth
                loading={isSignupSubmitting || signUpMutation.isPending}
                disabled={isSignupSubmitting || signUpMutation.isPending}
              >
                Create account
              </Button>
            </form>
          )}

          {/* Mode Switch */}
          <div className='mt-8 pt-6 text-center border-t border-outline-variant/10'>
            <p className='text-on-surface-variant text-xs'>
              {mode === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() =>
                  switchMode(mode === 'login' ? 'signup' : 'login')
                }
                className='text-primary hover:text-primary-dark font-medium transition-colors duration-200'
              >
                {mode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </Card>

        {/* Footer Note */}
        <p className='text-center text-on-surface-variant/50 text-xs mt-6'>
          By continuing, you agree to our{' '}
          <Link href='/terms' className='hover:text-primary transition-colors'>
            Terms
          </Link>{' '}
          &{' '}
          <Link
            href='/privacy'
            className='hover:text-primary transition-colors'
          >
            Privacy
          </Link>
        </p>
      </div>
    </main>
  );
}
