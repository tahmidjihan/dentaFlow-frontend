'use client';

import Link from 'next/link';
import ClinicCard from './ClinicCard';
import { useClinics } from '@/lib/hooks/use-clinics';
import ClinicCardSkeleton from './ClinicCardSkeleton';

export default function FeaturedClinics() {
  const { data: clinics = [], isLoading } = useClinics();

  const featuredClinics = Array.isArray(clinics) ? clinics.slice(0, 4) : [];

  return (
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto bg-surface-container-low/30'>
      <div className='text-center mb-12 md:mb-16'>
        <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
          Top-Rated Facilities
        </span>
        <h2 className='font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
          Featured Clinics
        </h2>
        <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Discover our most highly-rated dental clinics, trusted by thousands of
          patients for exceptional care
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ClinicCardSkeleton key={i} />
            ))
          : featuredClinics.map((clinic: any) => (
              <ClinicCard
                key={clinic.id}
                mode='public'
                id={clinic.id}
                name={clinic.name}
                address={clinic.location}
                phone={clinic.phone}
                specialty='Dental Care'
                image=''
              />
            ))}
      </div>

      <div className='text-center mt-12'>
        <Link
          href='/clinics'
          className='inline-flex items-center gap-2 font-headline font-bold text-primary hover:text-primary-container transition-colors group'
        >
          View All Clinics
          <span className='material-symbols-outlined transition-transform group-hover:translate-x-1'>
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
