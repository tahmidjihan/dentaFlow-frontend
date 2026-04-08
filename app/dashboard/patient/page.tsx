'use client';

import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import RoleGuard from '@/components/RoleGuard';
import { useSession } from '@/lib/hooks/use-auth';
import { getMyAppointments } from '@/lib/APICalls/appointments.api';
import type { Appointment } from '@/types/database';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
  {
    title: 'Settings',
    description: 'Customize your account preferences',
    href: '/dashboard/patient',
    icon: 'settings',
    color: 'bg-primary/10 text-primary',
  },
];

function PatientDashboardContent() {
  const { user } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentTrendsData, setAppointmentTrendsData] = useState<
    { month: string; appointments: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getMyAppointments();
        const appointmentsArray = Array.isArray(data) ? data : [];
        setAppointments(appointmentsArray);

        // Compute appointment trends over last 6 months from real data
        const now = new Date();
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
          const monthLabel = d.toLocaleString('default', { month: 'short' });
          const count = appointmentsArray.filter((a: Appointment) => {
            const apptDate = new Date(a.date);
            return (
              apptDate.getMonth() === d.getMonth() &&
              apptDate.getFullYear() === d.getFullYear()
            );
          }).length;
          return { month: monthLabel, appointments: count };
        });
        setAppointmentTrendsData(last6Months);
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
  const cancelledAppointments = appointments.filter(
    (a) => a.status === 'CANCELLED',
  );

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
              <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface max-w-2xl'>
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
                  {isLoading ? '-' : cancelledAppointments.length}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Cancelled
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Trends Chart */}
        <section className='mb-12'>
          <h2 className='font-headline text-xl font-bold text-on-surface mb-6'>
            Appointment Trends
          </h2>
          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            {appointmentTrendsData.length === 0 || appointmentTrendsData.every((d) => d.appointments === 0) ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3'>
                  <span className='material-symbols-outlined text-2xl text-outline-variant'>
                    show_chart
                  </span>
                </div>
                <p className='text-sm text-on-surface-variant'>
                  Charts will appear once data is available
                </p>
              </div>
            ) : (
              <ResponsiveContainer width='100%' height={250}>
                <LineChart data={appointmentTrendsData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='var(--outline-variant)' opacity={0.3} />
                  <XAxis dataKey='month' stroke='var(--on-surface-variant)' fontSize={12} />
                  <YAxis stroke='var(--on-surface-variant)' fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface-container)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--on-surface)',
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey='appointments'
                    stroke='var(--primary)'
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Navigation Cards */}
        <section>
          <h2 className='font-headline text-xl font-bold text-on-surface mb-6'>
            Quick Access
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {patientRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='group p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
              >
                <div className='flex flex-col h-full'>
                  <div
                    className={`w-14 h-14 rounded-xl ${route.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className='material-symbols-outlined text-3xl'>
                      {route.icon}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors'>
                      {route.title}
                    </h3>
                    <p className='text-sm text-secondary mt-2'>
                      {route.description}
                    </p>
                  </div>
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
      </main>
    </DashboardWrapper>
  );
}

export default function PatientDashboardPage() {
  return (
    <RoleGuard allowedRoles={['USER']}>
      <PatientDashboardContent />
    </RoleGuard>
  );
}
