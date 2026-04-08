'use client';

import Link from 'next/link';
import { useDoctors } from '@/lib/hooks/use-doctors';
import DoctorCardSkeleton from './DoctorCardSkeleton';

export default function FeaturedDoctors() {
  const { data: doctors = [], isLoading } = useDoctors();

  const featuredDoctors = Array.isArray(doctors) ? doctors.slice(0, 4) : [];

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
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='text-center mb-12 md:mb-16'>
        <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
          Meet the Experts
        </span>
        <h2 className='font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
          Featured Doctors
        </h2>
        <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Our most experienced and highly-rated dental specialists, dedicated to
          providing you with exceptional care
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))
          : featuredDoctors.map((doctor: any) => (
              <Link
                key={doctor.id}
                href={`/doctors`}
                className='block group'
              >
                <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full'>
                  <div className='p-6'>
                    {/* Avatar */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-headline text-xl font-bold mb-4 ${getAvatarColor(doctor.name)}`}
                    >
                      {getInitials(doctor.name)}
                    </div>

                    {/* Content */}
                    <h3 className='font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors mb-1'>
                      {doctor.name}
                    </h3>
                    <p className='text-body-small text-primary font-semibold mb-2'>
                      {doctor.specialty}
                    </p>
                    {doctor.title && (
                      <p className='text-sm text-on-surface-variant mb-3'>
                        {doctor.title}
                      </p>
                    )}

                    {/* Meta info — only render if values exist */}
                    {(doctor.rating || doctor.experience) && (
                      <div className='flex items-center gap-4 text-sm text-on-surface-variant'>
                        {doctor.rating && (
                          <div className='flex items-center gap-1'>
                            <span className='material-symbols-outlined text-sm'>
                              star
                            </span>
                            <span>{doctor.rating}</span>
                          </div>
                        )}
                        {doctor.experience && (
                          <div className='flex items-center gap-1'>
                            <span className='material-symbols-outlined text-sm'>
                              schedule
                            </span>
                            <span>{doctor.experience}+ yrs</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <div className='text-center mt-12'>
        <Link
          href='/doctors'
          className='inline-flex items-center gap-2 font-headline font-bold text-primary hover:text-primary-container transition-colors group'
        >
          View All Doctors
          <span className='material-symbols-outlined transition-transform group-hover:translate-x-1'>
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
