'use client';

import { useState } from 'react';
import ClinicCard from "./ClinicCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useClinics } from '@/lib/hooks/use-clinics';

export default function Clinics() {
  const { data: clinics = [], isLoading, error } = useClinics();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClinics = (clinics || []).filter((clinic: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      clinic.name?.toLowerCase().includes(query) ||
      clinic.location?.toLowerCase().includes(query) ||
      clinic.email?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full">
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full">
      {/* Header Section */}
      <header className="mb-20 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tighter mb-6 leading-[1.1]">
          Find a sanctuary <br />
          <span className="text-primary italic font-light">near you.</span>
        </h1>
        <p className="font-body text-lg text-secondary leading-relaxed mb-12">
          Discover our curated network of clinical spaces designed for your
          wellbeing. Each location offers a unique blend of medical excellence
          and serene intentionality.
        </p>
        {/* Search Bar */}
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search by city, clinic name, or specialty..."
            className="py-5 pl-14 pr-32 rounded-xl font-body text-md shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
            search
          </span>
          <div className="absolute inset-y-2 right-2">
            <Button size="sm" variant="secondary">
              Search
            </Button>
          </div>
        </div>
      </header>

      {/* Clinic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic: any) => (
            <ClinicCard
              key={clinic.id}
              mode="public"
              id={clinic.id}
              name={clinic.name}
              address={clinic.location}
              phone={clinic.phone}
              specialty="Dental Care"
              image={null}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className='flex flex-col items-center justify-center'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline'>
                  search_off
                </span>
              </div>
              <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                No clinics found
              </h3>
              <p className='text-body-medium text-secondary max-w-md'>
                {searchQuery
                  ? `No clinics match your search "${searchQuery}".`
                  : 'No clinics available at the moment.'}
              </p>
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="group relative flex flex-col justify-center items-center rounded-xl bg-secondary-container/20 p-8 border border-primary/10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(#55624c_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">
                map
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface">
              Explore Map View
            </h3>
            <p className="font-body text-sm text-secondary max-w-[200px]">
              Visualize all our sanctuaries across the city on an interactive
              map.
            </p>
            <button className="font-label text-xs uppercase tracking-widest font-bold text-primary hover:underline underline-offset-8 transition-all">
              Launch Map Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
