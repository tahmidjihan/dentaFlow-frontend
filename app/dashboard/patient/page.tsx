'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    title: 'Book Appointment',
    description: 'Schedule a new appointment with a doctor',
    href: '/dashboard/patient/book',
    icon: 'calendar_add_on',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'My Appointments',
    description: 'View and manage your appointments',
    href: '/dashboard/patient/appointments',
    icon: 'calendar_today',
    color: 'bg-secondary/10 text-secondary',
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
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) > new Date() && apt.status !== 'CANCELLED'
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) <= new Date() || apt.status === 'CANCELLED'
  );

  return (
    <DashboardWrapper role="USER" mobileTitle="Patient Dashboard">
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12 min-h-screen'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Welcome back
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                {user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Patient Dashboard'}
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage your dental appointments and care from one place.
              </p>
            </div>
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
                  Upcoming Appointments
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-secondary text-2xl'>
                  history
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : pastAppointments.length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Past Appointments
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-tertiary text-2xl'>
                  check_circle
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : appointments.filter(a => a.status === 'DONE').length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className='mb-12'>
          <h2 className='font-headline text-xl font-bold text-on-background mb-6'>
            Quick Actions
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                    <span>{route.title}</span>
                    <span className='material-symbols-outlined text-base'>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Appointments */}
        <section>
          <h2 className='font-headline text-xl font-bold text-on-background mb-6'>
            Recent Appointments
          </h2>
          {isLoading ? (
            <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='flex items-center justify-center py-12'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                  <span className='material-symbols-outlined text-3xl text-outline'>
                    calendar_today
                  </span>
                </div>
                <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                  No appointments yet
                </h3>
                <p className='text-sm text-secondary text-center max-w-md mb-4'>
                  Book your first appointment with one of our expert dentists.
                </p>
                <Link
                  href='/dashboard/patient/book'
                  className='px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors'
                >
                  Book Now
                </Link>
              </div>
            </div>
          ) : (
            <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                  <thead>
                    <tr className='bg-surface-container-low/50'>
                      <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                        Date
                      </th>
                      <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                        Status
                      </th>
                      <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-outline-variant/5'>
                    {appointments.slice(0, 5).map((appointment) => (
                      <tr key={appointment.id} className='hover:bg-surface-container-low/20'>
                        <td className='px-6 py-4'>
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium text-on-surface'>
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className='text-xs text-outline'>
                              {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            appointment.status === 'DONE' ? 'bg-primary/10 text-primary' :
                            appointment.status === 'BOOKED' ? 'bg-secondary/10 text-secondary' :
                            'bg-error/10 text-error'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <Link
                            href={`/dashboard/patient/appointments`}
                            className='text-sm font-medium text-primary hover:text-primary/80'
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {appointments.length > 5 && (
                <div className='p-4 border-t border-outline-variant/10 text-center'>
                  <Link
                    href='/dashboard/patient/appointments'
                    className='text-sm font-medium text-primary hover:text-primary/80'
                  >
                    View all appointments
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </DashboardWrapper>
  );
}
