'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { getDoctorById } from '@/lib/APICalls/doctors.api';
import { useDoctors } from '@/lib/hooks/use-doctors';

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorDetailsPage({ params }: DoctorPageProps) {
  const { id } = use(params);
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { data: allDoctors = [] } = useDoctors();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error('Failed to fetch doctor:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const relatedDoctors = Array.isArray(allDoctors)
    ? allDoctors.filter((d: any) => d.id !== id).slice(0, 3)
    : [];

  if (loading) {
    return (
      <main className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <span className='material-symbols-outlined text-4xl text-primary animate-spin mb-4'>
            progress_activity
          </span>
          <p className='text-secondary'>Loading doctor profile...</p>
        </div>
      </main>
    );
  }

  if (!doctor) {
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
    <main className='pt-32 pb-24 px-4 md:px-8 max-w-screen-2xl mx-auto min-h-screen'>
      <div className='flex flex-col lg:flex-row gap-8 md:gap-16'>
        {/* Left Side: Doctor Details */}
        <div className='lg:w-5/12 space-y-8'>
          <header className='space-y-4'>
            <Badge variant='success' size='md' icon='medical_services'>
              {doctor.specialty || 'General Dentistry'}
            </Badge>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface'>
              {doctor.name}
            </h1>
            <p className='text-secondary text-lg'>{doctor.title}</p>
          </header>

          {/* Avatar */}
          <div className='flex justify-center'>
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center font-headline text-4xl md:text-5xl font-bold ${getAvatarColor(doctor.name || 'Doctor')}`}
            >
              {getInitials(doctor.name || 'D')}
            </div>
          </div>

          {/* Key Information */}
          <div className='grid grid-cols-1 gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <h2 className='font-headline text-xl font-bold text-on-surface'>
              Professional Information
            </h2>

            <div className='flex items-start gap-4'>
              <span className='material-symbols-outlined text-primary mt-1'>
                medical_services
              </span>
              <div>
                <p className='font-headline font-bold text-on-surface'>
                  Specialization
                </p>
                <p className='text-secondary'>{doctor.specialty}</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <span className='material-symbols-outlined text-primary mt-1'>
                schedule
              </span>
              <div>
                <p className='font-headline font-bold text-on-surface'>
                  Experience
                </p>
                <p className='text-secondary'>{doctor.experience || '10'}+ years</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <span className='material-symbols-outlined text-primary mt-1'>
                star
              </span>
              <div>
                <p className='font-headline font-bold text-on-surface'>
                  Rating
                </p>
                <p className='text-secondary'>
                  {doctor.rating || '4.9'} ({doctor.reviewCount || '120'} reviews)
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <span className='material-symbols-outlined text-primary mt-1'>
                {doctor.available ? 'check_circle' : 'schedule'}
              </span>
              <div>
                <p className='font-headline font-bold text-on-surface'>
                  Availability
                </p>
                <p className='text-secondary'>
                  {doctor.available ? 'Currently Available' : 'Currently Busy'}
                </p>
              </div>
            </div>

            {doctor.nextAvailability && (
              <div className='flex items-start gap-4'>
                <span className='material-symbols-outlined text-primary mt-1'>
                  event
                </span>
                <div>
                  <p className='font-headline font-bold text-on-surface'>
                    Next Available
                  </p>
                  <p className='text-secondary'>{doctor.nextAvailability}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Booking & Reviews */}
        <div className='lg:w-7/12 space-y-8'>
          {/* CTA Card */}
          <div className='bg-primary-container/20 p-8 md:p-12 rounded-2xl'>
            <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4'>
              Book an Appointment with {doctor.name}
            </h2>
            <p className='text-on-surface-variant mb-6'>
              Schedule your visit today and experience exceptional dental care
              tailored to your needs.
            </p>
            <Link href={`/book?doctorId=${doctor.id}`}>
              <Button size='lg' variant='primary' icon='calendar_today'>
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Reviews Section */}
          <div className='p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <h2 className='font-headline text-xl font-bold text-on-surface mb-6'>
              Patient Reviews
            </h2>

            <div className='flex items-center gap-4 mb-6 p-4 bg-surface-container-low rounded-xl'>
              <div className='text-center'>
                <p className='text-3xl font-headline font-bold text-on-surface'>
                  {doctor.rating || '4.9'}
                </p>
                <div className='flex text-warning'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className='material-symbols-filled text-lg'
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className='text-xs text-on-surface-variant mt-1'>
                  {doctor.reviewCount || '120'} reviews
                </p>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className='space-y-4'>
              {[
                {
                  name: 'Sarah M.',
                  comment:
                    'Excellent care and very thorough. Made me feel comfortable throughout the entire procedure.',
                  rating: 5,
                  date: '2 weeks ago',
                },
                {
                  name: 'James L.',
                  comment:
                    'Very professional and friendly. Would highly recommend to anyone looking for quality dental care.',
                  rating: 5,
                  date: '1 month ago',
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className='p-4 bg-surface-container-low/50 rounded-xl'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary'>
                        {review.name[0]}
                      </div>
                      <span className='text-sm font-semibold text-on-surface'>
                        {review.name}
                      </span>
                    </div>
                    <span className='text-xs text-on-surface-variant'>
                      {review.date}
                    </span>
                  </div>
                  <div className='flex text-warning mb-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-${star <= review.rating ? 'filled' : 'outlined'} text-sm`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className='text-sm text-on-surface-variant'>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      {relatedDoctors.length > 0 && (
        <section className='mt-16'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface'>
                Related Doctors
              </h2>
              <p className='text-secondary mt-1'>
                Other specialists you might be interested in
              </p>
            </div>
            <Link href='/doctors'>
              <Button variant='outline' size='sm' icon='arrow_forward'>
                View All
              </Button>
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {relatedDoctors.map((relatedDoctor: any) => (
              <Link
                key={relatedDoctor.id}
                href={`/doctors`}
                className='block group'
              >
                <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all duration-300 h-full p-6'>
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-headline text-lg font-bold mb-4 ${getAvatarColor(relatedDoctor.name)}`}
                  >
                    {getInitials(relatedDoctor.name)}
                  </div>
                  <h3 className='font-headline font-bold text-on-surface group-hover:text-primary transition-colors'>
                    {relatedDoctor.name}
                  </h3>
                  <p className='text-sm text-primary font-semibold'>
                    {relatedDoctor.specialty}
                  </p>
                  <p className='text-sm text-on-surface-variant'>
                    {relatedDoctor.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
