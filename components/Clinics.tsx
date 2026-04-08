'use client';

import { useState, useMemo } from 'react';
import ClinicCard from './ClinicCard';
import ClinicCardSkeleton from './ClinicCardSkeleton';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useClinics } from '@/lib/hooks/use-clinics';

const specialtyOptions = [
  'General Dentistry',
  'Orthodontics',
  'Oral Surgery',
  'Pediatric Dentistry',
  'Cosmetic Dentistry',
  'Endodontics',
  'Periodontics',
  'Prosthodontics',
];

const locationOptions = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Bristol',
  'Edinburgh',
  'Cardiff',
  'Liverpool',
];

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'location-asc', label: 'Location (A-Z)' },
];

const ITEMS_PER_PAGE = 8;

export default function Clinics() {
  const { data: clinics = [], isLoading, error } = useClinics();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedClinics = useMemo(() => {
    let result = Array.isArray(clinics) ? [...clinics] : [];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (clinic: any) =>
          clinic.name?.toLowerCase().includes(query) ||
          clinic.location?.toLowerCase().includes(query) ||
          clinic.phone?.toLowerCase().includes(query),
      );
    }

    // Specialty filter
    if (selectedSpecialty) {
      result = result.filter(
        (clinic: any) => clinic.specialty === selectedSpecialty,
      );
    }

    // Location filter
    if (selectedLocation) {
      result = result.filter(
        (clinic: any) =>
          clinic.location?.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }

    // Sort
    result.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'location-asc':
          return (a.location || '').localeCompare(b.location || '');
        default:
          return 0;
      }
    });

    return result;
  }, [clinics, searchQuery, selectedSpecialty, selectedLocation, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClinics.length / ITEMS_PER_PAGE);
  const paginatedClinics = filteredAndSortedClinics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedLocation('');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  return (
    <div className='pt-32 pb-24 px-4 md:px-8 max-w-screen-2xl mx-auto w-full'>
      {/* Header Section */}
      <header className='mb-10 md:mb-16 max-w-3xl'>
        <h1 className='font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-4 md:mb-6 leading-[1.1]'>
          Find a sanctuary <br />
          <span className='text-primary italic font-light'>near you.</span>
        </h1>
        <p className='font-body text-base md:text-lg text-on-surface-variant leading-relaxed'>
          Discover our curated network of clinical spaces designed for your
          wellbeing. Each location offers a unique blend of medical excellence
          and serene intentionality.
        </p>
      </header>

      {/* Search & Filters */}
      <div className='mb-8 p-4 md:p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1'>
            <div className='relative'>
              <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                search
              </span>
              <input
                type='text'
                placeholder='Search clinics by name, location...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => {
              setSelectedSpecialty(e.target.value);
              setCurrentPage(1);
            }}
            className='px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[180px]'
          >
            <option value=''>All Specialties</option>
            {specialtyOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setCurrentPage(1);
            }}
            className='px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[160px]'
          >
            <option value=''>All Locations</option>
            {locationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[160px]'
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Reset */}
          <Button
            variant='outline'
            size='sm'
            onClick={resetFilters}
            icon='refresh'
            className='lg:self-auto'
          >
            Reset
          </Button>
        </div>

        {/* Results count */}
        <div className='mt-4 text-sm text-on-surface-variant'>
          Showing {paginatedClinics.length} of {filteredAndSortedClinics.length}{' '}
          clinics
        </div>
      </div>

      {/* Clinic Grid */}
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {Array.from({ length: 8 }).map((_, i) => (
            <ClinicCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className='text-center py-16'>
          <span className='material-symbols-outlined text-6xl text-error mb-4'>
            error
          </span>
          <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
            Failed to load clinics
          </h3>
          <p className='text-on-surface-variant mb-6'>
            Please try again later or contact support.
          </p>
          <Button variant='primary' onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : filteredAndSortedClinics.length === 0 ? (
        <div className='text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
          <span className='material-symbols-outlined text-6xl text-outline-variant mb-4'>
            search_off
          </span>
          <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
            No clinics found
          </h3>
          <p className='text-on-surface-variant mb-6'>
            Try adjusting your search or filter criteria.
          </p>
          <Button variant='primary' onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {paginatedClinics.map((clinic: any) => (
              <ClinicCard
                key={clinic.id}
                mode='public'
                id={clinic.id}
                name={clinic.name}
                address={clinic.location}
                phone={clinic.phone}
                specialty={clinic.specialty || 'General Dentistry'}
                image=''
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2 mt-12'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-on-surface disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='material-symbols-outlined text-sm'>
                  chevron_left
                </span>
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary text-on-primary shadow-sm shadow-primary/20'
                      : 'hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-on-surface disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='material-symbols-outlined text-sm'>
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
