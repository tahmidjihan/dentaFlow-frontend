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
import { authClient } from '@/lib/auth-client';
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
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

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
        onError: () => {
          toast.error('Invalid email or password');
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
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully!');
          router.push('/dashboard');
        },
        onError: () => {
          toast.error('Failed to create account');
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    setIsSocialLoading('google');
    const frontendUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    try {
      await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: `${frontendUrl}/dashboard`,
          // For better-auth v1.x, also set errorCallbackURL for failures
          errorCallbackURL: `${frontendUrl}/auth/login?error=social_failed`,
        },
        {
          onError: (error) => {
            toast.error('Failed to sign in with Google. Please try again.');
            setIsSocialLoading(null);
          },
        },
      );
    } catch (error) {
      toast.error('Failed to sign in with Google. Please try again.');
      setIsSocialLoading(null);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetLogin();
    resetSignup();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <main className='min-h-screen flex items-center justify-center px-4 py-12 bg-surface'>
      <div className='w-full max-w-[440px]'>
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
          <div className='mb-6 text-center'>
            <h2 className='font-serif text-2xl font-light text-on-surface mb-1'>
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </h2>
            <p className='text-on-surface-variant text-xs font-light tracking-wide'>
              {mode === 'signup'
                ? 'Join our community of dental professionals'
                : 'Access your dashboard'}
            </p>
          </div>

          {/* Social Login Buttons */}
          {mode === 'login' && (
            <>
              <div className='mb-6'>
                <Button
                  type='button'
                  variant='outline'
                  size='lg'
                  fullWidth
                  onClick={handleGoogleLogin}
                  disabled={isSocialLoading !== null}
                >
                  {isSocialLoading === 'google' ? (
                    <span className='material-symbols-outlined text-[20px] animate-spin'>
                      progress_activity
                    </span>
                  ) : (
                    <div className='flex items-center gap-3'>
                      <svg className='w-5 h-5' viewBox='0 0 24 24'>
                        <path
                          fill='#4285F4'
                          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        />
                        <path
                          fill='#34A853'
                          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        />
                        <path
                          fill='#FBBC05'
                          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                        />
                        <path
                          fill='#EA4335'
                          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                        />
                      </svg>
                      Continue with Google
                    </div>
                  )}
                </Button>
              </div>

              <div className='relative mb-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-outline-variant/20' />
                </div>
                <div className='relative flex justify-center text-xs'>
                  <span className='bg-surface-container-lowest px-4 text-on-surface-variant uppercase tracking-widest'>
                    or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

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
          <div className='mt-6 pt-6 text-center border-t border-outline-variant/10'>
            <p className='text-on-surface-variant text-xs'>
              {mode === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() =>
                  switchMode(mode === 'login' ? 'signup' : 'login')
                }
                className='text-primary hover:text-primary-container font-medium transition-colors duration-200'
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
