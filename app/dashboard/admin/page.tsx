'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardWrapper from '@/components/DashboardWrapper';
import RoleGuard from '@/components/RoleGuard';
import { getUsers } from '@/lib/APICalls/users.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import { getAppointments } from '@/lib/APICalls/appointments.api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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
    title: 'Clinics Management',
    description: 'Manage clinics and their locations',
    href: '/dashboard/admin/clinics',
    icon: 'business',
    color: 'bg-tertiary/10 text-tertiary',
  },
  {
    title: 'Appointments',
    description: 'Monitor and manage all appointments',
    href: '/dashboard/admin/appointments',
    icon: 'calendar_today',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Reports',
    description: 'View analytics and generate reports',
    href: '/dashboard/admin',
    icon: 'bar_chart',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Settings',
    description: 'Platform configuration and settings',
    href: '/dashboard/admin',
    icon: 'settings',
    color: 'bg-tertiary/10 text-tertiary',
  },
];

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState<
    { month: string; users: number }[]
  >([]);
  const [roleDistributionData, setRoleDistributionData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, doctors, appointments] = await Promise.all([
          getUsers() as Promise<any[]>,
          getDoctors() as Promise<any[]>,
          getAppointments() as Promise<any[]>,
        ]);

        const usersArray = Array.isArray(users) ? users : [];
        const doctorsArray = Array.isArray(doctors) ? doctors : [];
        const appointmentsArray = Array.isArray(appointments)
          ? appointments
          : [];

        setStats({
          totalUsers: usersArray.length,
          totalDoctors: doctorsArray.length,
          totalAppointments: appointmentsArray.length,
        });

        // Compute role distribution from real data
        const roleDistribution = [
          {
            name: 'Patients',
            value: usersArray.filter(
              (u: any) => u.role === 'USER' || u.role === 'PATIENT',
            ).length,
            color: 'var(--primary)',
          },
          {
            name: 'Doctors',
            value: doctorsArray.length,
            color: 'var(--secondary)',
          },
          {
            name: 'Admins',
            value: usersArray.filter((u: any) => u.role === 'ADMIN').length,
            color: 'var(--tertiary)',
          },
        ].filter((r) => r.value > 0);
        setRoleDistributionData(roleDistribution);

        // Compute user growth over last 6 months from real user creation dates
        const now = new Date();
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
          return {
            month: d.toLocaleString('default', { month: 'short' }),
            users: usersArray.filter((u: any) => {
              const created = new Date(u.createdAt || u.created_at || u.createdAt);
              return (
                created.getMonth() === d.getMonth() &&
                created.getFullYear() === d.getFullYear()
              );
            }).length,
          };
        });
        setUserGrowthData(last6Months);
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
              <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface max-w-2xl'>
                Admin Dashboard
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage your DentaWave platform from a centralized control panel.
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
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
                <p className='text-2xl font-headline font-bold text-on-surface'>
                  {isLoading ? '-' : stats.totalAppointments}
                </p>
                <p className='text-xs font-label uppercase tracking-widest text-secondary'>
                  Appointments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Row */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12'>
          {/* User Growth Chart */}
          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <h2 className='font-headline text-lg font-bold text-on-surface mb-4'>
              User Growth
            </h2>
            {userGrowthData.length === 0 || userGrowthData.every((d) => d.users === 0) ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3'>
                  <span className='material-symbols-outlined text-2xl text-outline-variant'>
                    timeline
                  </span>
                </div>
                <p className='text-sm text-on-surface-variant'>
                  Charts will appear once data is available
                </p>
              </div>
            ) : (
              <ResponsiveContainer width='100%' height={250}>
                <LineChart data={userGrowthData}>
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
                    dataKey='users'
                    stroke='var(--primary)'
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Role Distribution Chart */}
          <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm'>
            <h2 className='font-headline text-lg font-bold text-on-surface mb-4'>
              Role Distribution
            </h2>
            {roleDistributionData.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3'>
                  <span className='material-symbols-outlined text-2xl text-outline-variant'>
                    donut_large
                  </span>
                </div>
                <p className='text-sm text-on-surface-variant'>
                  Charts will appear once data is available
                </p>
              </div>
            ) : (
              <ResponsiveContainer width='100%' height={250}>
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    dataKey='value'
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface-container)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--on-surface)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Navigation Cards */}
        <section>
          <h2 className='font-headline text-xl font-bold text-on-surface mb-6'>
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

        {/* Recent Activity Placeholder */}
        <section className='mt-12'>
          <h2 className='font-headline text-xl font-bold text-on-surface mb-6'>
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
                Activity from across your platform will appear here once you
                start managing users, doctors, and appointments.
              </p>
            </div>
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
}

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <AdminDashboardContent />
    </RoleGuard>
  );
}
