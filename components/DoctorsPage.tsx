'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { useDoctors } from '@/lib/hooks/use-doctors';
import DoctorCardSkeleton from '@/components/DoctorCardSkeleton';

const specialtyOptions = [
  'General Dentistry',
  'Orthodontics',
  'Oral Surgery',
  'Pediatric Dentistry',
  'Cosmetic Dentistry',
  'Endodontics',
  'Periodontics',
];

const experienceOptions = [
  { value: '', label: 'Any Experience' },
  { value: '5', label: '5+ years' },
  { value: '10', label: '10+ years' },
  { value: '15', label: '15+ years' },
  { value: '20', label: '20+ years' },
];

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'rating-desc', label: 'Rating (High to Low)' },
  { value: 'experience-desc', label: 'Experience (Most First)' },
];

const ITEMS_PER_PAGE = 8;

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

export default function DoctorsPage() {
  const { data: doctors = [], isLoading } = useDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedDoctors = useMemo(() => {
    let result = Array.isArray(doctors) ? [...doctors] : [];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (doctor: any) =>
          doctor.name?.toLowerCase().includes(query) ||
          doctor.specialty?.toLowerCase().includes(query) ||
          doctor.title?.toLowerCase().includes(query),
      );
    }

    // Specialty filter
    if (selectedSpecialty) {
      result = result.filter(
        (doctor: any) => doctor.specialty === selectedSpecialty,
      );
    }

    // Experience filter
    if (minExperience) {
      const minExp = parseInt(minExperience);
      result = result.filter(
        (doctor: any) => (doctor.experience || 0) >= minExp,
      );
    }

    // Sort
    result.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience-desc':
          return (b.experience || 0) - (a.experience || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [doctors, searchQuery, selectedSpecialty, minExperience, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedDoctors.length / ITEMS_PER_PAGE,
  );
  const paginatedDoctors = filteredAndSortedDoctors.slice(
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
    setMinExperience('');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-surface'>
      {/* Hero Section */}
      <section className='relative pt-32 pb-12 md:pb-16 px-4 md:px-8 bg-gradient-to-b from-primary-fixed/30 to-surface'>
        <div className='max-w-screen-2xl mx-auto text-center'>
          <Badge variant='success' size='md' icon='medical_services'>
            Expert Dental Care
          </Badge>
          <h1 className='font-headline text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-bold text-on-surface mt-4 md:mt-6 mb-3 md:mb-4 tracking-tight'>
            Meet Our Specialists
          </h1>
          <p className='font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-6 md:mb-8'>
            Discover experienced dental professionals dedicated to providing you
            with exceptional care in a comfortable environment.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className='py-6 md:py-8 px-4 md:px-8'>
        <div className='max-w-screen-2xl mx-auto'>
          <div className='p-4 md:p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex flex-col lg:flex-row gap-4'>
              {/* Search */}
              <div className='flex-1'>
                <div className='relative'>
                  <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant'>
                    search
                  </span>
                  <input
                    type='text'
                    placeholder='Search doctors by name, specialty...'
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

              {/* Experience Filter */}
              <select
                value={minExperience}
                onChange={(e) => {
                  setMinExperience(e.target.value);
                  setCurrentPage(1);
                }}
                className='px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[150px]'
              >
                {experienceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[180px]'
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
              Showing {paginatedDoctors.length} of{' '}
              {filteredAndSortedDoctors.length} doctors
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Table Section */}
      <section className='pb-12 px-4 md:px-8'>
        <div className='max-w-screen-2xl mx-auto'>
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 8 }).map((_, i) => (
                <DoctorCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredAndSortedDoctors.length === 0 ? (
            <div className='text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <span className='material-symbols-outlined text-6xl text-outline-variant mb-4'>
                search_off
              </span>
              <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                No doctors found
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
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {paginatedDoctors.map((doctor: any) => (
                  <Link
                    key={doctor.id}
                    href={`/book?doctorId=${doctor.id}`}
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
                        <p className='text-sm text-primary font-semibold mb-1'>
                          {doctor.specialty}
                        </p>
                        {doctor.title && (
                          <p className='text-sm text-on-surface-variant mb-3'>
                            {doctor.title}
                          </p>
                        )}

                        {/* Meta info — only render if values exist */}
                        {(doctor.rating || doctor.experience) && (
                          <div className='flex items-center gap-4 text-sm text-on-surface-variant mb-4'>
                            {doctor.rating && (
                              <div className='flex items-center gap-1'>
                                <span className='material-symbols-outlined text-sm text-warning'>
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

                        {/* Availability badge */}
                        <Badge
                          variant={doctor.available ? 'success' : 'default'}
                          size='sm'
                          icon={doctor.available ? 'check_circle' : 'schedule'}
                        >
                          {doctor.available ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                    </div>
                  </Link>
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
      </section>

      {/* CTA Section */}
      <section className='py-12 md:py-16 px-4 md:px-8 bg-primary-container/20'>
        <div className='max-w-screen-2xl mx-auto text-center'>
          <h2 className='font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface mb-4'>
            Can&apos;t find the right specialist?
          </h2>
          <p className='font-body text-base md:text-lg text-on-surface-variant max-w-xl mx-auto mb-8'>
            Our care coordinators are here to help you find the perfect doctor
            for your needs.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button variant='primary' size='lg' icon='call'>
              Call Us Now
            </Button>
            <Button variant='outline' size='lg' icon='chat'>
              Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
