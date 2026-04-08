'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/lib/APICalls/users.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import { getClinics } from '@/lib/APICalls/clinics.api';
import { getAppointments } from '@/lib/APICalls/appointments.api';

interface SiteStats {
  totalUsers: number | null;
  totalDoctors: number | null;
  totalClinics: number | null;
  satisfactionRate: number | null;
}

export default function Stats() {
  const [stats, setStats] = useState<SiteStats>({
    totalUsers: null,
    totalDoctors: null,
    totalClinics: null,
    satisfactionRate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, doctors, clinics, appointments] = await Promise.all([
          getUsers() as Promise<any[]>,
          getDoctors() as Promise<any[]>,
          getClinics() as Promise<any[]>,
          getAppointments() as Promise<any[]>,
        ]);

        const usersArray = Array.isArray(users) ? users : [];
        const doctorsArray = Array.isArray(doctors) ? doctors : [];
        const clinicsArray = Array.isArray(clinics) ? clinics : [];
        const appointmentsArray = Array.isArray(appointments) ? appointments : [];

        // Calculate satisfaction rate from completed appointments
        const completedAppointments = appointmentsArray.filter(
          (a: any) => a.status === 'DONE' || a.status === 'COMPLETED',
        );
        const satisfactionRate =
          appointmentsArray.length > 0
            ? Math.round(
                (completedAppointments.length / appointmentsArray.length) * 100,
              )
            : null;

        setStats({
          totalUsers: usersArray.length,
          totalDoctors: doctorsArray.length,
          totalClinics: clinicsArray.length,
          satisfactionRate,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats({
          totalUsers: null,
          totalDoctors: null,
          totalClinics: null,
          satisfactionRate: null,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const hasAnyData =
    stats.totalUsers !== null ||
    stats.totalDoctors !== null ||
    stats.totalClinics !== null ||
    stats.satisfactionRate !== null;

  if (isLoading) {
    return (
      <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className='flex flex-col items-center text-center p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 animate-pulse'
            >
              <div className='w-12 h-12 md:w-14 md:h-14 rounded-xl bg-surface-container-high mb-4' />
              <div className='w-16 h-6 bg-surface-container-high rounded mb-2' />
              <div className='w-20 h-4 bg-surface-container-high rounded' />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!hasAnyData) {
    return (
      <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='flex flex-col items-center justify-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
          <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
            <span className='material-symbols-outlined text-3xl text-outline-variant'>
              bar_chart
            </span>
          </div>
          <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
            No data available yet
          </h3>
          <p className='text-sm text-on-surface-variant text-center max-w-md'>
            Platform statistics will appear here once we start collecting user
            and appointment data.
          </p>
        </div>
      </section>
    );
  }

  const statItems = [
    {
      value: stats.totalUsers,
      label: 'Users',
      icon: 'group',
    },
    {
      value: stats.totalDoctors,
      label: 'Expert Dentists',
      icon: 'medical_services',
    },
    {
      value: stats.totalClinics,
      label: 'Clinics Nationwide',
      icon: 'business',
    },
    {
      value: stats.satisfactionRate,
      label: 'Satisfaction Rate',
      icon: 'sentiment_satisfied',
      suffix: '%',
    },
  ].filter((item) => item.value !== null);

  return (
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className='flex flex-col items-center text-center p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-primary text-2xl md:text-3xl'>
                {stat.icon}
              </span>
            </div>
            <p className='font-headline text-2xl md:text-4xl font-bold text-on-surface mb-2'>
              {stat.value?.toLocaleString()}
              {'suffix' in stat && stat.suffix ? stat.suffix : ''}
            </p>
            <p className='font-label text-xs md:text-sm text-on-surface-variant uppercase tracking-widest'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
