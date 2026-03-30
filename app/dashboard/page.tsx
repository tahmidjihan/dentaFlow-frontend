'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import { useSession } from '@/lib/hooks/use-auth';
import { getMyAppointments } from '@/lib/APICalls/appointments.api';
import type { Appointment } from '@/types/database';

interface PatientRoute {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

const patientRoutes: PatientRoute[] = [
  {
    title: 'My Appointments',
    description: 'View and manage your scheduled appointments',
    href: '/dashboard/appointments',
    icon: 'calendar_today',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Book Appointment',
    description: 'Schedule a new appointment with our specialists',
    href: '/book',
    icon: 'add_circle',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'My Profile',
    description: 'Manage your personal information',
    href: '/dashboard/profile',
    icon: 'person',
    color: 'bg-tertiary/10 text-tertiary',
  },
];

export default function PatientDashboardPage() {
  const { user } = useSession();
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
  const completedAppointments = appointments.filter((a) => a.status === 'DONE');
  const cancelledAppointments = appointments.filter((a) => a.status === 'CANCELLED');

  return (
    <DashboardWrapper role='USER' mobileTitle='My Dashboard'>
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12 min-h-screen'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Patient Portal
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                Welcome, {user?.name || 'Patient'}
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage your appointments and health records.
              </p>
            </div>
            <Link
              href='/book'
              className='inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold py-3 px-6 rounded-lg transition-all'
            >
              <span className='material-symbols-outlined'>add_circle</span>
              Book Appointment
            </Link>
          </div>
        </header>

        {/* Quick Stats */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-2xl'>
                  calendar_today
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : upcomingAppointments.length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Upcoming
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-secondary text-2xl'>
                  check_circle
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : completedAppointments.length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Completed
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-error text-2xl'>
                  cancel
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : cancelledAppointments.length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Cancelled
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section>
          <h2 className='font-headline text-xl font-bold text-on-background mb-6'>
            Quick Access
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {patientRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='group p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
              >
                <div className='flex flex-col h-full'>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${route.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className='material-symbols-outlined text-3xl'>
                      {route.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className='flex-1'>
                    <h3 className='font-headline text-lg font-bold text-on-background group-hover:text-primary transition-colors'>
                      {route.title}
                    </h3>
                    <p className='text-sm text-secondary mt-2'>
                      {route.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className='flex items-center gap-2 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span>Go to {route.title.split(' ')[0]}</span>
                    <span className='material-symbols-outlined text-base'>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments Preview */}
        <section className='mt-12'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='font-headline text-xl font-bold text-on-background'>
              Upcoming Appointments
            </h2>
            <Link
              href='/dashboard/appointments'
              className='text-sm font-medium text-primary hover:underline decoration-primary/30 underline-offset-4'
            >
              View all
            </Link>
          </div>
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            {isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                  <span className='material-symbols-outlined text-3xl text-outline'>
                    event_available
                  </span>
                </div>
                <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                  No upcoming appointments
                </h3>
                <p className='text-sm text-secondary text-center max-w-md'>
                  You have no scheduled appointments. Book one now to get started.
                </p>
                <Link
                  href='/book'
                  className='mt-4 inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold py-2 px-4 rounded-lg transition-all'
                >
                  <span className='material-symbols-outlined text-sm'>add_circle</span>
                  Book Now
                </Link>
              </div>
            ) : (
              <div className='space-y-4'>
                {upcomingAppointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment.id}
                    className='flex items-center justify-between p-4 bg-surface-container-low/50 rounded-xl border border-outline-variant/5'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                        <span className='material-symbols-outlined text-primary text-xl'>
                          medical_services
                        </span>
                      </div>
                      <div>
                        <p className='font-semibold text-on-surface'>
                          Dr. {appointment.doctor?.name || 'Unknown Doctor'}
                        </p>
                        <p className='text-xs text-secondary'>
                          {new Date(appointment.date).toLocaleDateString()} at{' '}
                          {new Date(appointment.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <span className='px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary'>
                      Booked
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
}
