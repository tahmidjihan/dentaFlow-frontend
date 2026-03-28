'use client';

import { useState, useMemo } from 'react';
import {
  Button,
  Badge,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
} from '@/components/ui';

// Types aligned with Prisma schema
interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  nextAvailability: string;
  location: string;
  experience: number;
  role: 'DOCTOR';
  clinicId: string | null;
  image: string | null;
}

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

// Helper function to get consistent color from name
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

type ViewMode = 'list';
type SpecialtyFilter = 'All' | 'General Dentistry' | 'Orthodontics' | 'Pediatric Dentistry' | 'Oral Surgery' | 'Endodontics' | 'Periodontics';
type AvailabilityFilter = 'All' | 'Available Today' | 'Available This Week';
type RatingFilter = 'All' | '4+ Stars' | '5 Stars';

// Sample doctor data (aligned with Prisma schema)
const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'DDS, MS',
    specialty: 'Orthodontics',
    rating: 5,
    reviewCount: 127,
    available: true,
    nextAvailability: 'Today, 2:00 PM',
    location: 'Downtown Clinic',
    experience: 12,
    role: 'DOCTOR',
    clinicId: 'clinic-1',
    image: null,
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    title: 'DMD',
    specialty: 'General Dentistry',
    rating: 4.9,
    reviewCount: 89,
    available: true,
    nextAvailability: 'Today, 3:30 PM',
    location: 'Westside Clinic',
    experience: 8,
    role: 'DOCTOR',
    clinicId: 'clinic-2',
    image: null,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'DDS, PhD',
    specialty: 'Pediatric Dentistry',
    rating: 5,
    reviewCount: 156,
    available: false,
    nextAvailability: 'Tomorrow, 9:00 AM',
    location: 'Downtown Clinic',
    experience: 15,
    role: 'DOCTOR',
    clinicId: 'clinic-1',
    image: null,
  },
  {
    id: '4',
    name: 'Dr. Michael Thompson',
    title: 'DMD, MS',
    specialty: 'Oral Surgery',
    rating: 4.8,
    reviewCount: 73,
    available: true,
    nextAvailability: 'Today, 4:00 PM',
    location: 'Northside Clinic',
    experience: 10,
    role: 'DOCTOR',
    clinicId: 'clinic-3',
    image: null,
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    title: 'DDS',
    specialty: 'Endodontics',
    rating: 4.7,
    reviewCount: 64,
    available: true,
    nextAvailability: 'Today, 11:00 AM',
    location: 'Westside Clinic',
    experience: 7,
    role: 'DOCTOR',
    clinicId: 'clinic-2',
    image: null,
  },
  {
    id: '6',
    name: 'Dr. Robert Williams',
    title: 'DMD, MS',
    specialty: 'Periodontics',
    rating: 4.9,
    reviewCount: 98,
    available: false,
    nextAvailability: 'Wed, 10:00 AM',
    location: 'Downtown Clinic',
    experience: 14,
    role: 'DOCTOR',
    clinicId: 'clinic-1',
    image: null,
  },
  {
    id: '7',
    name: 'Dr. Amanda Foster',
    title: 'DDS, MS',
    specialty: 'Orthodontics',
    rating: 5,
    reviewCount: 112,
    available: true,
    nextAvailability: 'Today, 1:00 PM',
    location: 'Northside Clinic',
    experience: 11,
    role: 'DOCTOR',
    clinicId: 'clinic-3',
    image: null,
  },
  {
    id: '8',
    name: 'Dr. David Kim',
    title: 'DMD',
    specialty: 'General Dentistry',
    rating: 4.6,
    reviewCount: 52,
    available: true,
    nextAvailability: 'Today, 5:00 PM',
    location: 'Westside Clinic',
    experience: 6,
    role: 'DOCTOR',
    clinicId: 'clinic-2',
    image: null,
  },
];

const specialties: SpecialtyFilter[] = [
  'All',
  'General Dentistry',
  'Orthodontics',
  'Pediatric Dentistry',
  'Oral Surgery',
  'Endodontics',
  'Periodontics',
];

const availabilityOptions: AvailabilityFilter[] = [
  'All',
  'Available Today',
  'Available This Week',
];

const ratingOptions: RatingFilter[] = [
  'All',
  '4+ Stars',
  '5 Stars',
];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<SpecialtyFilter>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('All');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('All');

  // Filter doctors based on search and filters
  const filteredDoctors = useMemo(() => {
    return sampleDoctors.filter((doctor) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchLower) ||
        doctor.specialty.toLowerCase().includes(searchLower) ||
        doctor.location.toLowerCase().includes(searchLower);

      // Specialty filter
      const matchesSpecialty =
        specialtyFilter === 'All' || doctor.specialty === specialtyFilter;

      // Availability filter
      let matchesAvailability = true;
      if (availabilityFilter === 'Available Today') {
        matchesAvailability = doctor.available && doctor.nextAvailability.includes('Today');
      } else if (availabilityFilter === 'Available This Week') {
        matchesAvailability = doctor.available;
      }

      // Rating filter
      let matchesRating = true;
      if (ratingFilter === '4+ Stars') {
        matchesRating = doctor.rating >= 4;
      } else if (ratingFilter === '5 Stars') {
        matchesRating = doctor.rating === 5;
      }

      return matchesSearch && matchesSpecialty && matchesAvailability && matchesRating;
    });
  }, [searchQuery, specialtyFilter, availabilityFilter, ratingFilter]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-filled text-sm ${
              star <= Math.floor(rating)
                ? 'text-primary'
                : 'text-outline-variant'
            }`}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  // Render doctor row (list view)
  const renderDoctorRow = (doctor: Doctor) => (
    <TableRow key={doctor.id} hoverable className="group">
      <TableCell>
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-headline text-lg font-bold flex-shrink-0 ${getAvatarColor(doctor.name)}`}
          >
            {getInitials(doctor.name)}
          </div>
          <div>
            <h3 className="font-headline text-base font-semibold text-on-surface">
              {doctor.name}
            </h3>
            <p className="font-label text-sm text-on-surface-variant">{doctor.title}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="info" size="sm">{doctor.specialty}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {renderStars(doctor.rating)}
          <span className="font-label text-sm text-on-surface-variant">
            {doctor.rating} ({doctor.reviewCount})
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={doctor.available ? 'success' : 'default'}
          size="sm"
          icon={doctor.available ? 'check_circle' : 'schedule'}
        >
          {doctor.available ? 'Available' : 'Busy'}
        </Badge>
      </TableCell>
      <TableCell className="text-on-surface-variant font-label text-sm">
        {doctor.nextAvailability}
      </TableCell>
      <TableCell align="right">
        <Button variant="primary" size="sm" icon="calendar_today">
          Book
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 bg-gradient-to-b from-primary-fixed/30 to-surface">
        <div className="max-w-screen-2xl mx-auto text-center">
          <Badge variant="success" size="md" icon="medical_services">
            Expert Dental Care
          </Badge>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mt-6 mb-4 tracking-tight">
            Meet Our Specialists
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Discover experienced dental professionals dedicated to providing you with
            exceptional care in a comfortable environment.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 w-full"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-[73px] z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Specialty Filter */}
              <div className="relative">
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value as SpecialtyFilter)}
                  className="appearance-none bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 pr-10 font-label text-sm text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'All' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Availability Filter */}
              <div className="relative">
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value as AvailabilityFilter)}
                  className="appearance-none bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 pr-10 font-label text-sm text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'All' ? 'Any Availability' : option}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Rating Filter */}
              <div className="relative">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as RatingFilter)}
                  className="appearance-none bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 pr-10 font-label text-sm text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {ratingOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === 'All' ? 'Any Rating' : option}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Results Count */}
              <span className="font-label text-sm text-on-surface-variant ml-2">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Table Section */}
      <section className="py-12 px-8">
        <div className="max-w-screen-2xl mx-auto">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">
                search_off
              </span>
              <h3 className="font-headline text-xl font-semibold text-on-surface mb-2">
                No doctors found
              </h3>
              <p className="font-body text-on-surface-variant mb-6">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSpecialtyFilter('All');
                  setAvailabilityFilter('All');
                  setRatingFilter('All');
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <Card variant="outlined">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Next Available</TableHead>
                    <TableHead align="right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map(renderDoctorRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-primary-container/20">
        <div className="max-w-screen-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Can&apos;t find the right specialist?
          </h2>
          <p className="font-body text-lg text-on-surface-variant max-w-xl mx-auto mb-8">
            Our care coordinators are here to help you find the perfect doctor for your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" icon="call">
              Call Us Now
            </Button>
            <Button variant="outline" size="lg" icon="chat">
              Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
