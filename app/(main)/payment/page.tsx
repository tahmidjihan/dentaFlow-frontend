'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardWrapper from '@/components/DashboardWrapper';
import { useSession } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/Toast';
import { post } from '@/lib/fetchAPI';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();
  const { success, error: showError, ToastContainer } = useToast();

  const [appointmentId, setAppointmentId] = useState<string>('');
  const [amount, setAmount] = useState<number>(2500); // £25.00 in cents
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const aptId = searchParams.get('appointmentId');
    const amt = searchParams.get('amount');
    
    if (aptId) {
      setAppointmentId(aptId);
    }
    
    if (amt) {
      setAmount(parseFloat(amt));
    }
  }, [searchParams]);

  const handlePayment = async () => {
    if (!appointmentId) {
      showError('No appointment found');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await post<{ url: string }>('/api/payments/create-payment', {
        appointmentId,
        amount,
      });

      if (response.url) {
        success('Redirecting to payment...');
        window.location.href = response.url;
      } else {
        showError('Failed to create payment session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      showError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardWrapper role='USER' mobileTitle='Payment'>
      <ToastContainer position='top-right' />
      
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12 min-h-screen'>
        <div className='max-w-2xl mx-auto'>
          {/* Header */}
          <header className='mb-12 text-center'>
            <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
              Secure Payment
            </p>
            <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background mb-4'>
              Complete Your Payment
            </h1>
            <p className='text-secondary max-w-xl mx-auto'>
              You're almost done! Complete your payment to secure your appointment.
            </p>
          </header>

          {/* Payment Card */}
          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm p-8 md:p-12'>
            {/* Payment Icon */}
            <div className='flex justify-center mb-8'>
              <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-4xl'>
                  account_balance_wallet
                </span>
              </div>
            </div>

            {/* Payment Details */}
            <div className='space-y-6 mb-8'>
              <div className='pb-6 border-b border-outline-variant/10'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm text-secondary'>Consultation Fee</span>
                  <span className='font-semibold text-on-surface'>£50.00</span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm text-secondary'>Deposit (50%)</span>
                  <span className='font-bold text-primary'>
                    £{(amount / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center pt-2'>
                <span className='text-lg font-bold text-on-surface'>Total Due Today</span>
                <span className='text-3xl font-bold text-primary'>
                  £{(amount / 100).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className='mb-8'>
              <p className='text-xs font-label uppercase tracking-widest text-secondary mb-4 text-center'>
                Accepted Payment Methods
              </p>
              <div className='flex justify-center gap-4'>
                <div className='w-16 h-10 bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20'>
                  <span className='material-symbols-outlined text-2xl text-outline'>credit_card</span>
                </div>
                <div className='w-16 h-10 bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20'>
                  <span className='material-symbols-outlined text-2xl text-outline'>account_balance</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className='bg-primary/10 rounded-lg p-4 mb-8'>
              <div className='flex items-start gap-3'>
                <span className='material-symbols-outlined text-primary text-xl'>
                  security
                </span>
                <div>
                  <p className='text-sm font-semibold text-on-surface mb-1'>
                    Secure Payment
                  </p>
                  <p className='text-xs text-secondary leading-relaxed'>
                    Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
              <button
                onClick={handlePayment}
                disabled={isProcessing || !appointmentId}
                className='w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {isProcessing ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className='material-symbols-outlined'>lock</span>
                    Pay £{(amount / 100).toFixed(2)} Securely
                  </>
                )}
              </button>

              <button
                onClick={() => router.push('/dashboard/appointments')}
                className='w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-4 px-6 rounded-lg transition-all'
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Help Text */}
          <p className='text-xs text-secondary text-center mt-6'>
            By completing this payment, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </DashboardWrapper>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
