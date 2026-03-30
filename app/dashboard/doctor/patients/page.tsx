'use client';

import { useState, useMemo } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import { useUsers } from '@/lib/hooks/use-users';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/lib/APICalls/appointments.api';
import type { User, Appointment } from '@/types/database';

interface Patient {
  id: string;
  name: string;
  initials?: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive' | 'New';
  treatments: number;
}

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getPatientStatus = (
  appointments: Appointment[],
): 'Active' | 'Inactive' | 'New' => {
  if (!appointments || appointments.length === 0) {
    return 'New';
  }

  const now = new Date();
  const hasUpcoming = appointments.some((apt: Appointment) => new Date(apt.date) > now);
  const hasPast = appointments.some((apt: Appointment) => new Date(apt.date) < now);

  if (hasUpcoming && hasPast) return 'Active';
  if (hasUpcoming) return 'New';
  if (hasPast) return 'Inactive';
  return 'New';
};

const transformUserToPatient = (user: User, appointments: Appointment[]): Patient => {
  const patientAppointments = appointments.filter(
    (apt: Appointment) => apt.userId === user.id,
  );
  const now = new Date();
  const upcomingAppointments = patientAppointments
    .filter((apt: Appointment) => new Date(apt.date) > now)
    .sort(
      (a: Appointment, b: Appointment) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const pastAppointments = patientAppointments.filter(
    (apt: Appointment) => new Date(apt.date) < now,
  );

  const lastVisitDate =
    pastAppointments.length > 0
      ? new Date(
          Math.max(
            ...pastAppointments.map((apt: Appointment) => new Date(apt.date).getTime()),
          ),
        )
      : null;

  const nextAppointment =
    upcomingAppointments.length > 0
      ? new Date(upcomingAppointments[0].date).toLocaleDateString('en-GB', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : undefined;

  const lastVisit = lastVisitDate
    ? lastVisitDate.toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No visits';

  return {
    id: user.id,
    name: user.name,
    initials: getInitials(user.name),
    email: user.email,
    phone: 'Not provided',
    lastVisit,
    nextAppointment,
    status: getPatientStatus(patientAppointments),
    treatments: pastAppointments.length,
  };
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-primary/10 text-primary';
    case 'Inactive':
      return 'bg-surface-container-high text-outline';
    case 'New':
      return 'bg-secondary-container text-on-secondary-container';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Active' | 'Inactive' | 'New'
  >('all');

  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  const patients: Patient[] = useMemo(() => {
    const patientUsers = Array.isArray(users) ? users.filter((user: User) => user.role === 'USER') : [] ;
    return patientUsers.map((user: User) =>
      transformUserToPatient(user, appointments as Appointment[]),
    );
  }, [users, appointments]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  const isLoading = usersLoading || appointmentsLoading;

  return (
    <DashboardWrapper role='DOCTOR' mobileTitle='My Patients'>
      <main className='flex-1 md:ml-64 p-4 md:p-8'>
        <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
          <div className='p-6 border-b border-outline-variant/10 bg-surface-container-low/30'>
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
              <div className='relative w-full md:w-[300px]'>
                <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline'>
                  search
                </span>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search patients...'
                  className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
                />
              </div>

              <div className='flex gap-2 bg-surface-container-low p-1 rounded-xl w-full md:w-auto'>
                {(['all', 'Active', 'Inactive', 'New'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                      statusFilter === status
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-outline hover:bg-surface-container-high'
                    }`}
                  >
                    {status === 'all' ? 'All' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            {isLoading ? (
              <div className='flex items-center justify-center py-16'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            ) : (
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Patient</th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Contact</th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Last Visit</th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Next Appointment</th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Treatments</th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>Status</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className='hover:bg-surface-container-low/20 transition-colors'>
                        <td className='px-8 py-6'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {patient.initials}
                            </div>
                            <div>
                              <span className='text-sm font-semibold text-on-surface block'>
                                {patient.name}
                              </span>
                              <span className='text-[11px] text-outline'>
                                ID: #{patient.id.padStart(4, '0')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2'>
                              <span className='material-symbols-outlined text-[14px] text-outline'>mail</span>
                              <span className='text-sm text-secondary'>{patient.email}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='material-symbols-outlined text-[14px] text-outline'>phone</span>
                              <span className='text-sm text-outline'>{patient.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm font-medium text-on-surface'>{patient.lastVisit}</span>
                        </td>
                        <td className='px-8 py-6'>
                          {patient.nextAppointment ? (
                            <div className='flex items-center gap-2'>
                              <span className='material-symbols-outlined text-[14px] text-primary'>calendar_today</span>
                              <span className='text-sm font-medium text-primary'>{patient.nextAppointment}</span>
                            </div>
                          ) : (
                            <span className='text-sm text-outline'>No upcoming</span>
                          )}
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm font-semibold text-on-surface'>{patient.treatments}</span>
                        </td>
                        <td className='px-8 py-6'>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(patient.status)}`}
                          >
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='px-8 py-16 text-center'>
                        <div className='flex flex-col items-center justify-center'>
                          <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                            <span className='material-symbols-outlined text-3xl text-outline'>person_search</span>
                          </div>
                          <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                            No patients found
                          </h3>
                          <p className='text-body-medium text-secondary max-w-md'>
                            {searchQuery
                              ? `No patients match your search "${searchQuery}".`
                              : statusFilter !== 'all'
                                ? `No ${statusFilter.toLowerCase()} patients found.`
                                : "No patients available."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </DashboardWrapper>
  );
}
