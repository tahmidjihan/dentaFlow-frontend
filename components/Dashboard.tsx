'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Badge from '@/components/ui/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { getMyAppointments } from '@/lib/APICalls/appointments.api';
import type { Appointment, AppointStatus } from '@/types/database';

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getMyAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'BOOKED',
  );

  const getStatusBadge = (status: AppointStatus) => {
    switch (status) {
      case 'DONE':
        return <Badge variant='success'>Done</Badge>;
      case 'BOOKED':
        return <Badge variant='warning'>Booked</Badge>;
      case 'CANCELLED':
        return <Badge variant='default'>Cancelled</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <main className='pt-32 pb-20 px-8 max-w-screen-2xl mx-auto min-h-screen'>
        <div className='animate-pulse space-y-8'>
          <div className='w-64 h-12 bg-surface-container-high rounded' />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[0, 1, 2].map((i) => (
              <div key={i} className='h-48 bg-surface-container-high rounded-2xl' />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className='pt-32 pb-20 px-8 max-w-screen-2xl mx-auto min-h-screen'>
        {/* Header Section */}
        <header className='mb-16'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Welcome back
          </p>
          <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
            Your Health, <span className='text-primary'>Simplified.</span>
          </h1>
        </header>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          <div className='p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-48 bg-surface-container-lowest shadow-sm shadow-on-background/5 border border-outline-variant/10'>
            <span className='material-symbols-outlined text-3xl text-primary'>
              event_available
            </span>
            <div>
              <p className='text-4xl font-headline font-bold text-on-background'>
                {upcomingAppointments.length}
              </p>
              <p className='font-label text-xs uppercase tracking-widest text-secondary'>
                Upcoming Visits
              </p>
            </div>
          </div>

          <div className='p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-48 bg-surface-container-low'>
            <span className='material-symbols-outlined text-3xl text-secondary'>
              history
            </span>
            <div>
              <p className='text-4xl font-headline font-bold text-on-background'>
                {appointments.filter((a) => a.status === 'DONE').length}
              </p>
              <p className='font-label text-xs uppercase tracking-widest text-secondary'>
                Completed Visits
              </p>
            </div>
          </div>

          <div className='p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-48 bg-primary-container text-on-primary-container'>
            <span
              className='material-symbols-outlined text-3xl'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              calendar_month
            </span>
            <div>
              <p className='text-4xl font-headline font-bold'>
                {appointments.length}
              </p>
              <p className='font-label text-xs uppercase tracking-widest opacity-70'>
                Total Bookings
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className='space-y-12'>
          <div className='flex justify-between items-end'>
            <h2 className='font-headline text-2xl font-bold tracking-tight text-on-background'>
              Appointment History
            </h2>
          </div>

          {appointments.length === 0 ? (
            <div className='p-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 flex flex-col items-center justify-center'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline-variant'>
                  event_busy
                </span>
              </div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                No appointments yet
              </h3>
              <p className='text-sm text-secondary text-center max-w-md mb-6'>
                Your appointment history will appear here once you book your
                first visit.
              </p>
              <Link
                href='/book'
                className='inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold py-3 px-6 rounded-lg transition-all'
              >
                <span className='material-symbols-outlined'>add_circle</span>
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead align='right'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} hoverable>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            appointment.status === 'DONE'
                              ? 'bg-primary-fixed text-on-primary-fixed'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {appointment.doctor?.name?.slice(0, 2).toUpperCase() || '?'}
                        </div>
                        <p className='text-sm font-medium text-on-background'>
                          {appointment.doctor?.name || 'Unknown Doctor'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className='text-sm text-secondary'>
                      {new Date(appointment.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell align='right'>
                      <Link
                        href={`/doctors/${appointment.doctorId}`}
                        className='text-xs font-label uppercase tracking-widest text-primary font-bold hover:underline decoration-primary/30 underline-offset-4'
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </>
  );
}
