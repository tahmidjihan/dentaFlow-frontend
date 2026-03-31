'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { notFound } from 'next/navigation';
import { getClinicById } from '@/lib/APICalls/clinics.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import type { Clinic, Doctor } from '@/types/database';
import type { User } from '@/types/database';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import { use } from 'react';

interface ClinicPageProps {
  params: Promise<{ id: string }>;
}

interface ClinicWithDoctors extends Clinic {
  doctors?: Array<{
    id: string;
    name: string;
    email: string;
    image: string | null;
    specialty: string;
    title: string;
    clinicId: string | null;
  }>;
}

export default function ClinicPage({ params }: ClinicPageProps) {
  const { id } = use(params);
  const [clinic, setClinic] = useState<ClinicWithDoctors | null>(null);
  const [practitioners, setPractitioners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clinicData, doctorsData] = await Promise.all([
          getClinicById(id, { showToast: false }),
          getDoctors({ showToast: false }),
        ]);
        setClinic(clinicData as ClinicWithDoctors);
        // Filter doctors by clinic ID
        setPractitioners(
          (doctorsData as User[]).filter((doctor) => doctor.clinicId === id),
        );
      } catch (error) {
        console.error('Failed to fetch clinic:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <span className='material-symbols-outlined text-4xl text-primary animate-spin mb-4'>
            progress_activity
          </span>
          <p className='text-secondary'>Loading clinic details...</p>
        </div>
      </main>
    );
  }

  if (!clinic) {
    notFound();
  }

  const getAvatarColor = (name: string): string => {
    const colors = [
      'bg-primary text-on-primary',
      'bg-secondary-container text-on-secondary-container',
      'bg-tertiary-container text-on-tertiary',
      'bg-primary-fixed-dim text-on-primary-fixed-variant',
      'bg-secondary-fixed-dim text-on-secondary-fixed-variant',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <main className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen'>
        <div className='flex flex-col lg:flex-row gap-16 lg:gap-24'>
          {/* Left Side: Clinic Details (Editorial Layout) */}
          <div className='lg:w-5/12 space-y-12'>
            <header className='space-y-6'>
              <span className='text-primary font-label uppercase tracking-widest text-xs font-semibold'>
                {clinic.status === 'open' ? 'Open' : 'Closed'}
              </span>
              <h1 className='text-5xl lg:text-6xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface'>
                {clinic.name}
              </h1>
              <p className='text-secondary text-lg max-w-md font-light leading-relaxed'>
                {clinic.location}
              </p>
            </header>

            <div className='grid grid-cols-1 gap-10'>
              {/* Contact Information */}
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    location_on
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Location
                    </p>
                    <p className='text-secondary font-light'>
                      {clinic.location}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    mail
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Email
                    </p>
                    <p className='text-secondary font-light'>{clinic.email}</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    call
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Phone
                    </p>
                    <p className='text-secondary font-light'>{clinic.phone}</p>
                  </div>
                </div>
              </div>

              {/* Visual Anchor */}
              <div className='relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm bg-surface-container-low flex items-center justify-center'>
                <div className='text-center space-y-2'>
                  <span className='material-symbols-outlined text-6xl text-primary opacity-50'>
                    business
                  </span>
                  <p className='text-secondary font-light'>
                    Clinic image coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form (Surface Stacking Logic) */}
          <div className='lg:w-7/12'>
            <div className='bg-surface-container-low p-10 lg:p-16 rounded-xl relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/10 rounded-full blur-3xl -mr-32 -mt-32'></div>
              <div className='relative z-10'>
                <h2 className='text-3xl font-headline font-bold tracking-tight mb-8 text-on-surface'>
                  Secure Your Session
                </h2>
                <BookingForm
                  practitioners={practitioners.map((p) => ({
                    id: p.id,
                    name: p.name,
                    specialty: 'Practitioner',
                  }))}
                  deposit={50}
                />

                {/* Trust Markers */}
                <div className='mt-12 flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700'>
                  <span className='text-[10px] font-label uppercase tracking-[0.2em] font-bold text-on-surface-variant'>
                    Secure checkout via Stripe
                  </span>
                  <div className='flex gap-4'>
                    <span className='material-symbols-outlined text-sm'>
                      lock
                    </span>
                    <span className='material-symbols-outlined text-sm'>
                      verified_user
                    </span>
                    <span className='material-symbols-outlined text-sm'>
                      shield
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Context / Map Placeholder */}
            <div className='mt-8 rounded-xl overflow-hidden bg-surface-container-low h-48 relative flex items-center justify-center'>
              <div className='text-center space-y-2'>
                <span className='material-symbols-outlined text-4xl text-primary opacity-50'>
                  map
                </span>
                <p className='text-secondary font-light text-sm'>
                  Map view coming soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Table Section */}
        <section className='mt-24'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='font-headline text-3xl font-bold text-on-surface'>
                Our Doctors at {clinic.name}
              </h2>
              <p className='text-secondary mt-2'>
                Meet our team of specialist dentists
              </p>
            </div>
            <Link href='/doctors'>
              <Button variant='outline' size='sm' icon='arrow_forward'>
                View All Doctors
              </Button>
            </Link>
          </div>

          {clinic.doctors && clinic.doctors.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {clinic.doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className='group p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                >
                  <div className='flex flex-col h-full'>
                    {/* Avatar */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-headline text-lg font-bold flex-shrink-0 mb-4 ${getAvatarColor(doctor.name)}`}
                    >
                      {getInitials(doctor.name)}
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
                        {doctor.name}
                      </h3>
                      <p className='text-sm text-secondary mb-2'>
                        {doctor.title}
                      </p>
                      <Badge variant='info' size='sm'>
                        {doctor.specialty}
                      </Badge>
                    </div>

                    {/* Action */}
                    <Link
                      href={`/book?doctorId=${doctor.id}`}
                      className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors'
                    >
                      Book Appointment
                      <span className='material-symbols-outlined text-base'>
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline'>
                  search_off
                </span>
              </div>
              <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                No doctor to show
              </h3>
              <p className='text-secondary mb-6'>
                We're working on bringing you the best specialists soon.
              </p>
              <Link href='/doctors'>
                <Button variant='primary' size='md' icon='search'>
                  Browse All Doctors
                </Button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
