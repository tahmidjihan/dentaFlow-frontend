'use client';

import { useState } from 'react';
import ClinicCard from './ClinicCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useClinics } from '@/lib/hooks/use-clinics';

export default function Clinics() {
  const { data: clinics = [], isLoading, error } = useClinics();

  if (isLoading) {
    return (
      <div className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full'>
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full'>
      {/* Header Section */}
      <header className='mb-20 max-w-3xl'>
        <h1 className='font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tighter mb-6 leading-[1.1]'>
          Find a sanctuary <br />
          <span className='text-primary italic font-light'>near you.</span>
        </h1>
        <p className='font-body text-lg text-secondary leading-relaxed mb-12'>
          Discover our curated network of clinical spaces designed for your
          wellbeing. Each location offers a unique blend of medical excellence
          and serene intentionality.
        </p>
      </header>

      {/* Clinic Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
        {Array.isArray(clinics) &&
          clinics.map((clinic: any) => (
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

        {/* Map Placeholder */}
      </div>
    </div>
  );
}
