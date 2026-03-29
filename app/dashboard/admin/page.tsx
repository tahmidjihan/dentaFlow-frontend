'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardWrapper from '@/components/DashboardWrapper';
import { getUsers } from '@/lib/APICalls/users.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import { getAppointments } from '@/lib/APICalls/appointments.api';
import type { User } from '@/types/database';
import type { Appointment } from '@/types/database';

interface AdminRoute {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

const adminRoutes: AdminRoute[] = [
  {
    title: 'Users Management',
    description: 'View and manage all registered users',
    href: '/dashboard/admin/users',
    icon: 'group',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Doctors Management',
    description: 'Manage doctors and their assignments',
    href: '/dashboard/admin/doctors',
    icon: 'medical_services',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Appointments',
    description: 'Monitor and manage all appointments',
    href: '/dashboard/admin/appointments',
    icon: 'calendar_today',
    color: 'bg-tertiary/10 text-tertiary',
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, doctors, appointments] = await Promise.all([
          getUsers(),
          getDoctors(),
          getAppointments(),
        ]);
        setStats({
          totalUsers: users.length,
          totalDoctors: doctors.length,
          totalAppointments: appointments.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <DashboardWrapper role='ADMIN' mobileTitle='Admin Dashboard'>
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12 min-h-screen'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Administration
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                Admin Dashboard
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage your DentaFlow platform from a centralized control panel.
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
                  group
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : stats.totalUsers}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Total Users
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-secondary text-2xl'>
                  medical_services
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : stats.totalDoctors}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Total Doctors
                </p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center'>
                <span className='material-symbols-outlined text-tertiary text-2xl'>
                  calendar_today
                </span>
              </div>
              <div>
                <p className='text-2xl font-headline font-bold text-on-background'>
                  {isLoading ? '-' : stats.totalAppointments}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Appointments
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
            {adminRoutes.map((route) => (
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

        {/* Recent Activity Placeholder */}
        <section className='mt-12'>
          <h2 className='font-headline text-xl font-bold text-on-background mb-6'>
            Recent Activity
          </h2>
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='flex flex-col items-center justify-center py-12'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline'>
                  history
                </span>
              </div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                No recent activity
              </h3>
              <p className='text-sm text-secondary text-center max-w-md'>
                Activity from across your platform will appear here once you start
                managing users, doctors, and appointments.
              </p>
            </div>
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
}
