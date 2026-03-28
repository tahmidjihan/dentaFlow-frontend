'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';
import { useAppointments, useUpdateAppointment, useDeleteAppointment } from '@/lib/hooks/use-appointments';
import { useUsers } from '@/lib/hooks/use-users';
import { useClinics } from '@/lib/hooks/use-clinics';

const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case 'BOOKED':
      return 'bg-primary/10 text-primary';
    case 'DONE':
      return 'bg-secondary-container text-on-secondary-container';
    case 'CANCELLED':
      return 'bg-error/10 text-error';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function AppointmentsPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'BOOKED' | 'DONE' | 'CANCELLED'>('all');

  const { data: appointments = [], isLoading, error } = useAppointments();
  const { data: users = [] } = useUsers();
  const { data: clinics = [] } = useClinics();
  const updateAppointmentMutation = useUpdateAppointment();
  const deleteAppointmentMutation = useDeleteAppointment();

  const getUserName = (userId: string) => {
    const user = users?.find((u: any) => u.id === userId);
    return user?.name || 'Unknown';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = users?.find((u: any) => u.id === doctorId && u.role === 'DOCTOR');
    return doctor?.name || 'Unknown Doctor';
  };

  const getClinicName = (clinicId: string) => {
    const clinic = clinics?.find((c: any) => c.id === clinicId);
    return clinic?.name || 'Unknown Clinic';
  };

  const filteredAppointments = (appointments || []).filter((appointment: any) => {
    const patientName = getUserName(appointment.userId);
    const matchesSearch =
      patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (appointmentId: string, newStatus: 'BOOKED' | 'DONE' | 'CANCELLED') => {
    updateAppointmentMutation.mutate({
      id: appointmentId,
      data: { status: newStatus },
    });
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      deleteAppointmentMutation.mutate(appointmentId);
    }
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Appointments'>
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
      <DashboardWrapper role='ADMIN' mobileTitle='Appointments'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='text-center text-error'>
            <p>Failed to load appointments. Please try again.</p>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper role='ADMIN' mobileTitle='Appointments'>
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Appointment Management
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                All Appointments
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage and monitor all appointments across clinics.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' icon='download'>
                Export
              </Button>
              <Button icon='add'>
                New Appointment
              </Button>
            </div>
          </div>
        </header>

        {/* Appointments Table Container */}
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
                  placeholder='Search appointments...'
                  className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
                />
              </div>

              {/* Status Filter */}
              <div className='flex gap-2 flex-wrap'>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Status</option>
                  <option value='BOOKED'>Booked</option>
                  <option value='DONE'>Completed</option>
                  <option value='CANCELLED'>Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
            <span className='text-xs text-outline font-medium'>
              Showing <span className='text-on-surface font-bold'>{filteredAppointments.length}</span>{' '}
              {filteredAppointments.length === 1 ? 'appointment' : 'appointments'}
              {(searchQuery || statusFilter !== 'all') && (
                <span> filtered</span>
              )}
            </span>
          </div>

          {/* Appointments Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-surface-container-low/50'>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    ID
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Patient
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Doctor
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Clinic
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Date
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
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment: any) => (
                    <tr
                      key={appointment.id}
                      className='hover:bg-surface-container-low/20 transition-colors group'
                      onMouseEnter={() => setHoveredRow(appointment.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-8 py-6'>
                        <span className='text-sm font-mono text-outline'>
                          {appointment.id.slice(0, 8)}...
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm font-semibold text-on-surface'>
                          {getUserName(appointment.userId)}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>
                          {getDoctorName(appointment.doctorId)}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-outline'>
                          {getClinicName(appointment.clinicId)}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>
                          {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyles(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className='px-8 py-6 text-right'>
                        <div
                          className={`flex justify-end gap-2 transition-opacity ${
                            hoveredRow === appointment.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {appointment.status === 'BOOKED' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, 'DONE')}
                                className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                                className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'DONE' && (
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'BOOKED')}
                              className='bg-secondary-container hover:bg-secondary hover:text-white text-on-secondary-container text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Reopen
                            </button>
                          )}
                          {appointment.status === 'CANCELLED' && (
                            <button
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              disabled={deleteAppointmentMutation.isPending}
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all disabled:opacity-50'
                            >
                              {deleteAppointmentMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                          )}
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
                            event_busy
                          </span>
                        </div>
                        <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                          No appointments found
                        </h3>
                        <p className='text-body-medium text-secondary max-w-md'>
                          {searchQuery
                            ? `No appointments match your search "${searchQuery}".`
                            : 'No appointments match the selected filters.'}
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
              Showing <span className='text-on-surface font-bold'>{filteredAppointments.length}</span>{' '}
              {filteredAppointments.length === 1 ? 'appointment' : 'appointments'}
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
