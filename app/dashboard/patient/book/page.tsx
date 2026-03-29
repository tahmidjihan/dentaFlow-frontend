'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardWrapper from '@/components/DashboardWrapper';
import { getClinics } from '@/lib/APICalls/clinics.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import { createAppointment } from '@/lib/APICalls/appointments.api';
import { useSession } from '@/lib/hooks/use-auth';
import type { Clinic } from '@/types/database';
import type { User } from '@/types/database';

export default function BookAppointmentPage() {
  const router = useRouter();
  const { user } = useSession();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [clinicsData, doctorsData] = await Promise.all([
          getClinics(),
          getDoctors(),
        ]);
        setClinics(clinicsData);
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClinic || !selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill in all fields');
      return;
    }

    if (!user?.id) {
      alert('Please log in to book an appointment');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const appointmentDate = new Date(`${selectedDate}T${selectedTime}`);

      await createAppointment({
        userId: user.id,
        doctorId: selectedDoctor,
        clinicId: selectedClinic,
        date: appointmentDate.toISOString(),
        status: 'BOOKED',
      });

      alert('Appointment booked successfully!');
      router.push('/dashboard/patient/appointments');
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDoctors = selectedClinic
    ? doctors.filter((doctor) => doctor.clinicId === selectedClinic)
    : doctors;

  return (
    <DashboardWrapper role="USER" mobileTitle="Book Appointment">
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-8'>
          <h1 className='font-headline text-4xl font-bold text-on-background mb-2'>
            Book Appointment
          </h1>
          <p className='text-secondary'>Schedule your dental appointment</p>
        </header>

        {/* Booking Form */}
        <div className='max-w-2xl bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-8'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Select Clinic */}
              <div>
                <label className='block text-sm font-medium text-on-background mb-2'>
                  Select Clinic
                </label>
                <select
                  value={selectedClinic}
                  onChange={(e) => {
                    setSelectedClinic(e.target.value);
                    setSelectedDoctor(''); // Reset doctor when clinic changes
                  }}
                  className='w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  required
                >
                  <option value=''>Choose a clinic</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name} - {clinic.location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Doctor */}
              <div>
                <label className='block text-sm font-medium text-on-background mb-2'>
                  Select Doctor
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className='w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  required
                  disabled={!selectedClinic}
                >
                  <option value=''>Choose a doctor</option>
                  {filteredDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                {!selectedClinic && (
                  <p className='text-xs text-secondary mt-1'>
                    Please select a clinic first
                  </p>
                )}
              </div>

              {/* Select Date */}
              <div>
                <label className='block text-sm font-medium text-on-background mb-2'>
                  Select Date
                </label>
                <input
                  type='date'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className='w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  required
                />
              </div>

              {/* Select Time */}
              <div>
                <label className='block text-sm font-medium text-on-background mb-2'>
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className='w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  required
                >
                  <option value=''>Choose a time slot</option>
                  <option value='09:00'>09:00 AM</option>
                  <option value='09:30'>09:30 AM</option>
                  <option value='10:00'>10:00 AM</option>
                  <option value='10:30'>10:30 AM</option>
                  <option value='11:00'>11:00 AM</option>
                  <option value='11:30'>11:30 AM</option>
                  <option value='12:00'>12:00 PM</option>
                  <option value='14:00'>02:00 PM</option>
                  <option value='14:30'>02:30 PM</option>
                  <option value='15:00'>03:00 PM</option>
                  <option value='15:30'>03:30 PM</option>
                  <option value='16:00'>04:00 PM</option>
                  <option value='16:30'>04:30 PM</option>
                  <option value='17:00'>05:00 PM</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </main>
    </DashboardWrapper>
  );
}
