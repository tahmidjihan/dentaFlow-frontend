'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  clinic?: string;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  patients: number;
  avatar?: string;
  initials?: string;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Julian Vance',
    email: 'julian.vance@dentaflow.com',
    specialty: 'Orthodontics',
    clinic: 'Chelsea Wellness',
    verificationStatus: 'Verified',
    status: 'Active',
    joinedDate: 'Dec 01, 2023',
    patients: 248,
    initials: 'JV',
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@dentaflow.com',
    specialty: 'Periodontics',
    clinic: 'South Kensington',
    verificationStatus: 'Pending',
    status: 'Inactive',
    joinedDate: 'Oct 20, 2024',
    patients: 0,
    initials: 'SC',
  },
  {
    id: '3',
    name: 'Dr. Marcus Thorne',
    email: 'marcus.thorne@dentaflow.com',
    specialty: 'Endodontics',
    clinic: 'Mayfair Sanctuary',
    verificationStatus: 'Verified',
    status: 'Active',
    joinedDate: 'Jan 15, 2024',
    patients: 186,
    initials: 'MT',
  },
  {
    id: '4',
    name: 'Dr. Emma Charlotte',
    email: 'emma.charlotte@dentaflow.com',
    specialty: 'General Dentistry',
    clinic: 'Notting Hill Haven',
    verificationStatus: 'Verified',
    status: 'Active',
    joinedDate: 'Feb 10, 2024',
    patients: 312,
    initials: 'EC',
  },
  {
    id: '5',
    name: 'Dr. James Pemberton',
    email: 'james.pemberton@dentaflow.com',
    specialty: 'Oral Surgery',
    verificationStatus: 'Rejected',
    status: 'Inactive',
    joinedDate: 'Mar 05, 2024',
    patients: 0,
    initials: 'JP',
  },
  {
    id: '6',
    name: 'Dr. Olivia Beaumont',
    email: 'olivia.beaumont@dentaflow.com',
    specialty: 'Pediatric Dentistry',
    clinic: 'Harley Studio',
    verificationStatus: 'Verified',
    status: 'Active',
    joinedDate: 'Nov 20, 2023',
    patients: 425,
    initials: 'OB',
  },
];

const getVerificationBadgeStyles = (status: string) => {
  switch (status) {
    case 'Verified':
      return 'bg-primary/10 text-primary';
    case 'Pending':
      return 'bg-secondary-container text-on-secondary-container';
    case 'Rejected':
      return 'bg-error/10 text-error';
    default:
      return 'bg-outline text-on-surface';
  }
};

const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-primary/10 text-primary';
    case 'Inactive':
      return 'bg-surface-container-high text-outline';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function DoctorsPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'Verified' | 'Pending' | 'Rejected'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVerification = verificationFilter === 'all' || doctor.verificationStatus === verificationFilter;
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    
    return matchesSearch && matchesVerification && matchesStatus;
  });

  const handleVerify = (doctorId: string) => {
    console.log(`Verifying doctor ${doctorId}`);
  };

  const handleReject = (doctorId: string) => {
    console.log(`Rejecting doctor ${doctorId}`);
  };

  const handleToggleStatus = (doctorId: string, currentStatus: string) => {
    console.log(`Toggling doctor ${doctorId} status to ${currentStatus === 'Active' ? 'Inactive' : 'Active'}`);
  };

  return (
    <DashboardWrapper role="ADMIN" mobileTitle="Doctors">
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
                Verify doctor credentials, manage clinic assignments, and monitor activity.
              </p>
            </div>
            <Button icon='person_add' className='min-w-[160px]'>
              Add Doctor
            </Button>
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
                  onChange={(e) => setVerificationFilter(e.target.value as typeof verificationFilter)}
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Verification</option>
                  <option value='Verified'>Verified</option>
                  <option value='Pending'>Pending</option>
                  <option value='Rejected'>Rejected</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Status</option>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
            <span className='text-xs text-outline font-medium'>
              Showing <span className='text-on-surface font-bold'>{filteredDoctors.length}</span>{' '}
              {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              {(searchQuery || verificationFilter !== 'all' || statusFilter !== 'all') && (
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
                    Specialty
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Clinic
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Verification
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Status
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Patients
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-outline-variant/5'>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className='hover:bg-surface-container-low/20 transition-colors group'
                      onMouseEnter={() => setHoveredRow(doctor.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-3'>
                          {doctor.avatar ? (
                            <img
                              className='w-10 h-10 rounded-full object-cover'
                              src={doctor.avatar}
                              alt={doctor.name}
                            />
                          ) : (
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {doctor.initials}
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
                        <span className='text-sm text-secondary'>{doctor.specialty}</span>
                      </td>
                      <td className='px-8 py-6'>
                        {doctor.clinic ? (
                          <div className='flex items-center gap-2'>
                            <span className='material-symbols-outlined text-[14px] text-outline'>business</span>
                            <span className='text-sm text-secondary'>{doctor.clinic}</span>
                          </div>
                        ) : (
                          <span className='text-sm text-outline'>Unassigned</span>
                        )}
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getVerificationBadgeStyles(doctor.verificationStatus)}`}
                        >
                          {doctor.verificationStatus}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyles(doctor.status)}`}
                        >
                          {doctor.status}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm font-semibold text-on-surface'>
                          {doctor.patients}
                        </span>
                      </td>
                      <td className='px-8 py-6 text-right'>
                        <div
                          className={`flex justify-end gap-2 transition-opacity ${
                            hoveredRow === doctor.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {doctor.verificationStatus === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleVerify(doctor.id)}
                                className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Verify
                              </button>
                              <button
                                onClick={() => handleReject(doctor.id)}
                                className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {doctor.verificationStatus === 'Rejected' && (
                            <button
                              onClick={() => handleVerify(doctor.id)}
                              className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Re-verify
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleStatus(doctor.id, doctor.status)}
                            className='bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-outline text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                          >
                            {doctor.status === 'Active' ? 'Deactivate' : 'Activate'}
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
              Showing <span className='text-on-surface font-bold'>1-{filteredDoctors.length}</span> of{' '}
              <span className='text-on-surface font-bold'>{doctors.length}</span> doctors
            </span>
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
          </div>
        </section>

        {/* Pending Verifications Alert */}
        <div className='mt-6 bg-secondary-container/20 border border-secondary-container/30 rounded-2xl p-6'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center flex-shrink-0'>
              <span className='material-symbols-outlined text-on-secondary-container text-2xl'>
                pending_actions
              </span>
            </div>
            <div className='flex-1'>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
                Pending Verifications
              </h3>
              <p className='text-body-medium text-secondary mb-4'>
                You have <span className='font-semibold text-on-surface'>1 doctor(s)</span> waiting for verification. 
                Please review their credentials and approve or reject their applications.
              </p>
              <Button variant='secondary' icon='review'>
                Review Pending Applications
              </Button>
            </div>
          </div>
        </div>
      </main>
    </DashboardWrapper>
  );
}
