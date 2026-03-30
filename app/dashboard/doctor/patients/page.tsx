'use client';

import { useState, useMemo } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';
import { useUsers } from '@/lib/hooks/use-users';
import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/lib/APICalls/appointments.api';
import type { User } from '@/types/database';

interface Patient {
  id: string;
  name: string;
  initials?: string;
  image?: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive' | 'New';
  treatments: number;
}

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

// Helper function to determine patient status based on appointments
const getPatientStatus = (appointments: any[]): 'Active' | 'Inactive' | 'New' => {
  if (!appointments || appointments.length === 0) {
    return 'New';
  }
  
  const now = new Date();
  const hasUpcoming = appointments.some((apt: any) => new Date(apt.date) > now);
  const hasPast = appointments.some((apt: any) => new Date(apt.date) < now);
  
  if (hasUpcoming && hasPast) return 'Active';
  if (hasUpcoming) return 'New';
  if (hasPast) return 'Inactive';
  return 'New';
};

// Transform user data to patient format
const transformUserToPatient = (user: User, appointments: any[]): Patient => {
  const patientAppointments = appointments.filter((apt: any) => apt.userId === user.id);
  const now = new Date();
  const upcomingAppointments = patientAppointments
    .filter((apt: any) => new Date(apt.date) > now)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastAppointments = patientAppointments.filter(
    (apt: any) => new Date(apt.date) < now
  );

  const lastVisitDate = pastAppointments.length > 0
    ? new Date(Math.max(...pastAppointments.map((apt: any) => new Date(apt.date).getTime())))
    : null;

  const nextAppointment = upcomingAppointments.length > 0
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
    image: undefined, // Can be added if user has image field
    email: user.email,
    phone: user.phone || 'Not provided',
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
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Active' | 'Inactive' | 'New'
  >('all');

  // Fetch users (patients) and appointments from API
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  // Transform users to patients with appointment data
  const patients: Patient[] = useMemo(() => {
    // Filter only non-doctor users (patients)
    const patientUsers = users.filter(user => user.role === 'USER');
    return patientUsers.map(user => transformUserToPatient(user, appointments || []));
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
    <DashboardWrapper role="DOCTOR" mobileTitle="My Patients">
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Patient Management
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                My Patients
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                View and manage your patient records, appointments, and
                treatment history.
              </p>
            </div>
            <Button icon='person_add' className='min-w-[160px]'>
              Add Patient
            </Button>
          </div>
        </header>

        {/* Patients Table Container */}
        <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
          {/* Table Header with Search and Filters */}
          <div className='p-6 border-b border-outline-variant/10 bg-surface-container-low/30'>
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
              {/* Search */}
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

              {/* Status Filter */}
              <div className='flex gap-2 bg-surface-container-low p-1 rounded-xl w-full md:w-auto'>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                    statusFilter === 'all'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-outline hover:bg-surface-container-high'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('Active')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                    statusFilter === 'Active'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-outline hover:bg-surface-container-high'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('Inactive')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                    statusFilter === 'Inactive'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-outline hover:bg-surface-container-high'
                  }`}
                >
                  Inactive
                </button>
                <button
                  onClick={() => setStatusFilter('New')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                    statusFilter === 'New'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-outline hover:bg-surface-container-high'
                  }`}
                >
                  New
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
            <span className='text-xs text-outline font-medium'>
              Showing{' '}
              <span className='text-on-surface font-bold'>
                {filteredPatients.length}
              </span>{' '}
              {filteredPatients.length === 1 ? 'patient' : 'patients'}
              {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
            </span>
          </div>

          {/* Patients Table */}
          <div className='overflow-x-auto'>
            {isLoading ? (
              <div className='flex items-center justify-center py-16'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
              </div>
            ) : (
              <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-surface-container-low/50'>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Patient
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Contact
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Last Visit
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Next Appointment
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Treatments
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Status
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-outline-variant/5'>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className='hover:bg-surface-container-low/20 transition-colors group'
                      onMouseEnter={() => setHoveredRow(patient.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-3'>
                          {patient.image ? (
                            <img
                              className='w-10 h-10 rounded-full object-cover'
                              src={patient.image}
                              alt={patient.name}
                            />
                          ) : (
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {patient.initials}
                            </div>
                          )}
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
                            <span className='material-symbols-outlined text-[14px] text-outline'>
                              mail
                            </span>
                            <span className='text-sm text-secondary'>
                              {patient.email}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='material-symbols-outlined text-[14px] text-outline'>
                              phone
                            </span>
                            <span className='text-sm text-outline'>
                              {patient.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm font-medium text-on-surface'>
                          {patient.lastVisit}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        {patient.nextAppointment ? (
                          <div className='flex items-center gap-2'>
                            <span className='material-symbols-outlined text-[14px] text-primary'>
                              calendar_today
                            </span>
                            <span className='text-sm font-medium text-primary'>
                              {patient.nextAppointment}
                            </span>
                          </div>
                        ) : (
                          <span className='text-sm text-outline'>
                            No upcoming
                          </span>
                        )}
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm font-semibold text-on-surface'>
                          {patient.treatments}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(patient.status)}`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className='px-8 py-6 text-right'>
                        <div
                          className={`flex justify-end gap-2 transition-opacity ${
                            hoveredRow === patient.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        >
                          <button className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'>
                            View Profile
                          </button>
                          <button className='bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-outline text-[11px] font-bold px-4 py-1.5 rounded transition-all'>
                            Message
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='px-8 py-16 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                          <span className='material-symbols-outlined text-3xl text-outline'>
                            person_search
                          </span>
                        </div>
                        <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                          No data yet
                        </h3>
                        <p className='text-body-medium text-secondary max-w-md'>
                          {searchQuery
                            ? `No patients match your search "${searchQuery}". Try a different search term.`
                            : statusFilter !== 'all'
                              ? `No ${statusFilter.toLowerCase()} patients found.`
                              : "You haven't added any patients yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className='p-6 flex items-center justify-between bg-surface-container-low/10'>
            <span className='text-xs text-outline font-medium'>
              Showing{' '}
              <span className='text-on-surface font-bold'>
                1-{filteredPatients.length}
              </span>{' '}
              of{' '}
              <span className='text-on-surface font-bold'>
                {patients.length}
              </span>{' '}
              patients
            </span>
            {filteredPatients.length > 0 && (
              <div className='flex items-center gap-2'>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline'>
                  <span className='material-symbols-outlined'>chevron_left</span>
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm shadow-primary/20'>
                  1
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all'>
                  2
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all'>
                  3
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline'>
                  <span className='material-symbols-outlined'>chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      </main>
    </DashboardWrapper>
  );
}
