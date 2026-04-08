'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardWrapper from '@/components/DashboardWrapper';
import { useSession } from '@/lib/hooks/use-auth';
import { useCreateAppointment } from '@/lib/hooks/use-appointments';
import { useDoctors } from '@/lib/hooks/use-doctors';
import { useToast } from '@/components/ui/Toast';
import type { Doctor } from '@/types/database';

interface BookingFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useSession();
  const { data: doctors = [], isLoading: doctorsLoading } = useDoctors() as { data: Doctor[], isLoading: boolean };
  const createAppointment = useCreateAppointment();
  const { success, error: showError, ToastContainer } = useToast();

  const [formData, setFormData] = useState<BookingFormData>({
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    patientPhone: '',
    doctorId: '',
    clinicId: '',
    date: '',
    time: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);

  // Pre-select doctor from URL query parameter
  useEffect(() => {
    const doctorIdFromUrl = searchParams.get('doctorId');
    if (doctorIdFromUrl && doctors.length > 0) {
      setFormData((prev) => ({ ...prev, doctorId: doctorIdFromUrl }));
    }
  }, [searchParams, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.doctorId) {
      showError('Please select a doctor');
      return;
    }

    if (!formData.date || !formData.time) {
      showError('Please select date and time');
      return;
    }

    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone) {
      showError('Please fill in all patient details');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);

      // Create appointment
      const result = await createAppointment.mutateAsync({
        userId: user?.id || '',
        doctorId: formData.doctorId,
        clinicId: formData.clinicId || '',
        date: appointmentDateTime.toISOString(),
        status: 'BOOKED',
      });

      success('Appointment booked successfully! Redirecting to payment...');
      
      // Redirect to payment page with appointment ID
      setTimeout(() => {
        router.push(`/payment?appointmentId=${result.id}&amount=2500`);
      }, 1500);
    } catch (err) {
      console.error('Booking error:', err);
      showError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinimumDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <DashboardWrapper role='USER' mobileTitle='Book Appointment'>
      <ToastContainer position='top-right' />
      
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12 min-h-screen'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Appointment Booking
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                Book Your Appointment
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Fill in your details and select your preferred doctor and time slot.
              </p>
            </div>
          </div>
        </header>

        {/* Booking Form */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Patient Information Section */}
              <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm p-6 md:p-8'>
                <h2 className='font-headline text-xl font-bold text-on-background mb-6 flex items-center gap-3'>
                  <span className='material-symbols-outlined text-primary text-2xl'>
                    person
                  </span>
                  Patient Information
                </h2>

                <div className='space-y-6'>
                  {/* Patient Name */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      name='patientName'
                      value={formData.patientName}
                      onChange={handleInputChange}
                      disabled={!!user?.name}
                      className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50'
                      placeholder='Enter your full name'
                      required
                    />
                  </div>

                  {/* Patient Email */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      name='patientEmail'
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      disabled={!!user?.email}
                      className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50'
                      placeholder='Enter your email'
                      required
                    />
                  </div>

                  {/* Patient Phone */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='patientPhone'
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                      placeholder='Enter your phone number'
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Appointment Details Section */}
              <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm p-6 md:p-8'>
                <h2 className='font-headline text-xl font-bold text-on-background mb-6 flex items-center gap-3'>
                  <span className='material-symbols-outlined text-primary text-2xl'>
                    calendar_today
                  </span>
                  Appointment Details
                </h2>

                <div className='space-y-6'>
                  {/* Doctor Selection */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Select Doctor *
                    </label>
                    <div className='relative'>
                      <select
                        name='doctorId'
                        value={formData.doctorId}
                        onChange={handleInputChange}
                        className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer'
                        required
                      >
                        <option value=''>Choose a specialist...</option>
                        {doctorsLoading ? (
                          <option disabled>Loading doctors...</option>
                        ) : (
                          doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} — {doctor.specialty}
                            </option>
                          ))
                        )}
                      </select>
                      <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none'>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Preferred Date *
                    </label>
                    <input
                      type='date'
                      name='date'
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getMinimumDate()}
                      className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                      required
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className='block text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                      Preferred Time *
                    </label>
                    <div className='relative'>
                      <select
                        name='time'
                        value={formData.time}
                        onChange={handleInputChange}
                        className='w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer'
                        required
                      >
                        <option value=''>Select a time slot...</option>
                        <option value='09:00'>9:00 AM</option>
                        <option value='09:30'>9:30 AM</option>
                        <option value='10:00'>10:00 AM</option>
                        <option value='10:30'>10:30 AM</option>
                        <option value='11:00'>11:00 AM</option>
                        <option value='11:30'>11:30 AM</option>
                        <option value='12:00'>12:00 PM</option>
                        <option value='14:00'>2:00 PM</option>
                        <option value='14:30'>2:30 PM</option>
                        <option value='15:00'>3:00 PM</option>
                        <option value='15:30'>3:30 PM</option>
                        <option value='16:00'>4:00 PM</option>
                        <option value='16:30'>4:30 PM</option>
                        <option value='17:00'>5:00 PM</option>
                      </select>
                      <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none'>
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={() => router.back()}
                  className='flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold py-4 px-6 rounded-lg transition-all'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting || doctorsLoading}
                  className='flex-1 bg-primary hover:bg-primary-container text-on-primary font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className='material-symbols-outlined'>payment</span>
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm p-6 sticky top-6'>
              <h2 className='font-headline text-lg font-bold text-on-background mb-6'>
                Booking Summary
              </h2>

              <div className='space-y-4'>
                {/* Selected Doctor */}
                <div className='pb-4 border-b border-outline-variant/10'>
                  <p className='text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                    Doctor
                  </p>
                  {selectedDoctor ? (
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                        <span className='material-symbols-outlined text-primary text-xl'>
                          medical_services
                        </span>
                      </div>
                      <div>
                        <p className='font-semibold text-on-surface text-sm'>
                          {selectedDoctor.name}
                        </p>
                        <p className='text-xs text-secondary'>
                          {selectedDoctor.specialty}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className='text-sm text-secondary'>No doctor selected</p>
                  )}
                </div>

                {/* Appointment Date & Time */}
                <div className='pb-4 border-b border-outline-variant/10'>
                  <p className='text-xs font-label uppercase tracking-widest text-secondary mb-2'>
                    Date & Time
                  </p>
                  {formData.date && formData.time ? (
                    <div className='flex items-center gap-3'>
                      <span className='material-symbols-outlined text-secondary text-xl'>
                        event
                      </span>
                      <div>
                        <p className='font-semibold text-on-surface text-sm'>
                          {new Date(formData.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <p className='text-xs text-secondary'>
                          {new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className='text-sm text-secondary'>No date selected</p>
                  )}
                </div>

                {/* Consultation Fee */}
                <div className='pt-2'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-secondary'>Consultation Fee</span>
                    <span className='font-bold text-on-surface'>£50.00</span>
                  </div>
                  <div className='flex justify-between items-center mb-4'>
                    <span className='text-sm text-secondary'>Deposit (50%)</span>
                    <span className='font-bold text-primary'>£25.00</span>
                  </div>
                  <div className='flex justify-between items-center pt-4 border-t border-outline-variant/20'>
                    <span className='text-base font-bold text-on-surface'>Total Due Today</span>
                    <span className='text-xl font-bold text-primary'>£25.00</span>
                  </div>
                </div>

                {/* Info Note */}
                <div className='bg-primary/10 rounded-lg p-4 mt-4'>
                  <div className='flex items-start gap-3'>
                    <span className='material-symbols-outlined text-primary text-xl'>
                      info
                    </span>
                    <p className='text-xs text-secondary leading-relaxed'>
                      A deposit is required to secure your appointment. The remaining balance can be paid after your consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardWrapper>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
