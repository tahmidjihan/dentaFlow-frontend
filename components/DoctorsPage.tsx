'use client';

import {
  Badge,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Button,
  TableBody,
} from '@/components/ui';
import { useDoctors } from '@/lib/hooks/use-doctors';
import type { Doctor } from '@/types/database';

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

  const renderDoctorRow = (doctor: Doctor) => (
    <TableRow key={doctor.id} hoverable className='group'>
      <TableCell>
        <div className='flex items-center gap-4'>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-headline text-lg font-bold flex-shrink-0 ${getAvatarColor(doctor.name)}`}
          >
            {getInitials(doctor.name)}
          </div>
          <div>
            <h3 className='font-headline text-base font-semibold text-on-surface'>
              {doctor.name}
            </h3>
            <p className='font-label text-sm text-on-surface-variant'>
              {doctor.title}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant='info' size='sm'>
          {doctor.specialty}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={doctor.available ? 'success' : 'default'}
          size='sm'
          icon={doctor.available ? 'check_circle' : 'schedule'}
        >
          {doctor.available ? 'Available' : 'Busy'}
        </Badge>
      </TableCell>
      <TableCell className='text-on-surface-variant font-label text-sm'>
        {doctor.nextAvailability}
      </TableCell>
      <TableCell align='right'>
        <Button variant='primary' size='sm' icon='calendar_today'>
          Book
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className='min-h-screen bg-surface'>
      {/* Hero Section */}
      <section className='relative pt-32 pb-16 px-8 bg-gradient-to-b from-primary-fixed/30 to-surface'>
        <div className='max-w-screen-2xl mx-auto text-center'>
          <Badge variant='success' size='md' icon='medical_services'>
            Expert Dental Care
          </Badge>
          <h1 className='font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mt-6 mb-4 tracking-tight'>
            Meet Our Specialists
          </h1>
          <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto mb-8'>
            Discover experienced dental professionals dedicated to providing you
            with exceptional care in a comfortable environment.
          </p>
        </div>
      </section>

      {/* Doctors Table Section */}
      <section className='py-12 px-8'>
        <div className='max-w-screen-2xl mx-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center py-16'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          ) : Array.isArray(doctors) && doctors.length === 0 ? (
            <div className='text-center py-16'>
              <span className='material-symbols-outlined text-6xl text-outline-variant mb-4'>
                search_off
              </span>
              <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                No data yet
              </h3>
              <p className='font-body text-on-surface-variant mb-6'>
                There are no doctors available at the moment.
              </p>
            </div>
          ) : (
            <Card variant='outlined'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Next Available</TableHead>
                    <TableHead align='right'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(doctors) && doctors.map(renderDoctorRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-8 bg-primary-container/20'>
        <div className='max-w-screen-2xl mx-auto text-center'>
          <h2 className='font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4'>
            Can&apos;t find the right specialist?
          </h2>
          <p className='font-body text-lg text-on-surface-variant max-w-xl mx-auto mb-8'>
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
