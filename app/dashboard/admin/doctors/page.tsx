'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';
import { useDoctors, useUpdateDoctor, useDeleteDoctor } from '@/lib/hooks/use-doctors';
import { useClinics } from '@/lib/hooks/use-clinics';
import type { Role } from '@/types/database';

const getVerificationBadgeStyles = (verified: boolean) => {
  return verified
    ? 'bg-primary/10 text-primary'
    : 'bg-secondary-container text-on-secondary-container';
};

const getStatusBadgeStyles = (active: boolean) => {
  return active
    ? 'bg-primary/10 text-primary'
    : 'bg-error/10 text-error';
};

export default function DoctorsPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'Verified' | 'Pending'>('all');

  const { data: doctors = [], isLoading, error } = useDoctors();
  const { data: clinics = [] } = useClinics();
  const updateDoctorMutation = useUpdateDoctor();
  const deleteDoctorMutation = useDeleteDoctor();

  const filteredDoctors = (doctors || []).filter((doctor: any) => {
    const matchesSearch =
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVerification =
      verificationFilter === 'all' ||
      (verificationFilter === 'Verified' && doctor.emailVerified) ||
      (verificationFilter === 'Pending' && !doctor.emailVerified);

    return matchesSearch && matchesVerification;
  });

  const handleAssignToClinic = (doctorId: string, clinicId: string) => {
    if (clinicId) {
      updateDoctorMutation.mutate({
        id: doctorId,
        data: { clinicId },
      });
    }
  };

  const handleDeleteDoctor = (doctorId: string) => {
    if (confirm('Are you sure you want to remove this doctor?')) {
      deleteDoctorMutation.mutate(doctorId);
    }
  };

  const getClinicName = (clinicId: string | null) => {
    if (!clinicId) return 'Unassigned';
    const clinic = clinics?.find((c: any) => c.id === clinicId);
    return clinic?.name || 'Unassigned';
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Doctors'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  if (error) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Doctors'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='text-center text-error'>
            <p>Failed to load doctors. Please try again.</p>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper role='ADMIN' mobileTitle='Doctors'>
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Doctor Management
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                All Doctors
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage doctor accounts, verifications, and clinic assignments.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' icon='download'>
                Export
              </Button>
              <Button icon='person_add'>
                Add Doctor
              </Button>
            </div>
          </div>
        </header>

        {/* Doctors Table Container */}
        <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
          {/* Table Header with Search and Filters */}
          <div className='p-6 border-b border-outline-variant/10 bg-surface-container-low/30'>
            <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
              {/* Search */}
              <div className='relative w-full lg:w-[300px]'>
                <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline'>
                  search
                </span>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search doctors...'
                  className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
                />
              </div>

              {/* Filters */}
              <div className='flex gap-2 flex-wrap'>
                {/* Verification Filter */}
                <select
                  value={verificationFilter}
                  onChange={(e) =>
                    setVerificationFilter(e.target.value as typeof verificationFilter)
                  }
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Status</option>
                  <option value='Verified'>Verified</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
            <span className='text-xs text-outline font-medium'>
              Showing <span className='text-on-surface font-bold'>{filteredDoctors.length}</span>{' '}
              {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              {(searchQuery || verificationFilter !== 'all') && (
                <span> filtered</span>
              )}
            </span>
          </div>

          {/* Doctors Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-surface-container-low/50'>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Doctor
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Verification
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Clinic
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Joined
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-outline-variant/5'>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor: any) => (
                    <tr
                      key={doctor.id}
                      className='hover:bg-surface-container-low/20 transition-colors group'
                      onMouseEnter={() => setHoveredRow(doctor.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-3'>
                          {doctor.image ? (
                            <img
                              className='w-10 h-10 rounded-full object-cover'
                              src={doctor.image}
                              alt={doctor.name}
                            />
                          ) : (
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {(doctor.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <span className='text-sm font-semibold text-on-surface block'>
                              {doctor.name}
                            </span>
                            <span className='text-[11px] text-outline'>{doctor.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getVerificationBadgeStyles(doctor.emailVerified)}`}
                        >
                          {doctor.emailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <select
                          value={doctor.clinicId || ''}
                          onChange={(e) => handleAssignToClinic(doctor.id, e.target.value)}
                          className='px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                        >
                          <option value=''>Unassigned</option>
                          {clinics?.map((clinic: any) => (
                            <option key={clinic.id} value={clinic.id}>
                              {clinic.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>
                          {doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                      <td className='px-8 py-6 text-right'>
                        <div
                          className={`flex justify-end gap-2 transition-opacity ${
                            hoveredRow === doctor.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <button
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            disabled={deleteDoctorMutation.isPending}
                            className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all disabled:opacity-50'
                          >
                            {deleteDoctorMutation.isPending ? 'Removing...' : 'Remove'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className='px-8 py-16 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                          <span className='material-symbols-outlined text-3xl text-outline'>
                            person_search
                          </span>
                        </div>
                        <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                          No doctors found
                        </h3>
                        <p className='text-body-medium text-secondary max-w-md'>
                          {searchQuery
                            ? `No doctors match your search "${searchQuery}".`
                            : 'No doctors match the selected filters.'}
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
              Showing <span className='text-on-surface font-bold'>{filteredDoctors.length}</span>{' '}
              {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
            </span>
            <div className='flex items-center gap-2'>
              <button
                className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline disabled:opacity-50'
                disabled
              >
                <span className='material-symbols-outlined'>chevron_left</span>
              </button>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm shadow-primary/20'>
                1
              </button>
              <button
                className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all disabled:opacity-50'
                disabled
              >
                <span className='material-symbols-outlined'>chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
}
