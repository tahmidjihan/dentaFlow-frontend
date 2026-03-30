'use client';

import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useSession } from '@/lib/hooks/use-auth';
import { getDoctorAppointments, updateAppointmentStatus } from '@/lib/APICalls/appointments.api';
import { useToast } from '@/components/ui/Toast';
import type { Appointment, AppointStatus } from '@/types/database';

const getStatusStyles = (status: AppointStatus) => {
  switch (status) {
    case 'DONE':
      return 'bg-primary/10 text-primary';
    case 'BOOKED':
      return 'bg-secondary/10 text-secondary';
    case 'CANCELLED':
      return 'bg-error/10 text-error';
    default:
      return 'bg-outline/10 text-outline';
  }
};

export default function DoctorAppointmentsPage() {
  const { user } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'BOOKED' | 'DONE' | 'CANCELLED'>('all');
  const [cancellingAppointment, setCancellingAppointment] = useState<{ id: string; patientName: string } | null>(null);
  const { success, error: showError, ToastContainer } = useToast();

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.id) return;

      try {
        const data = await getDoctorAppointments(user.id) as any[];
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        showError('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, [user?.id]);

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment.user?.name || '';
    const matchesSearch =
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleMarkAsDone = async (id: string) => {
    try {
      await updateAppointmentStatus(id, 'DONE');
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: 'DONE' } : apt))
      );
      success('Appointment marked as completed');
    } catch (error) {
      console.error('Failed to mark as done:', error);
      showError('Failed to update appointment status');
    }
  };

  const handleCancel = () => {
    if (!cancellingAppointment) return;

    updateAppointmentStatus(cancellingAppointment.id, 'CANCELLED')
      .then(() => {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === cancellingAppointment.id ? { ...apt, status: 'CANCELLED' } : apt
          )
        );
        success('Appointment cancelled successfully');
        setCancellingAppointment(null);
      })
      .catch((error) => {
        console.error('Failed to cancel appointment:', error);
        showError('Failed to cancel appointment');
      });
  };

  const appointmentToCancel = cancellingAppointment;

  return (
    <DashboardWrapper role='DOCTOR' mobileTitle='Appointments'>
      <ToastContainer position="top-right" />
      
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Appointment Management
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                My Appointments
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage and monitor your scheduled appointments.
              </p>
            </div>
          </div>
        </header>

        {/* Appointments Table Container */}
        {isLoading ? (
          <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='flex items-center justify-center py-24'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
            </div>
          </section>
        ) : (
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
                      Patient
                    </th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Date & Time
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
                    filteredAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className='hover:bg-surface-container-low/20 transition-colors group'
                        onMouseEnter={() => setHoveredRow(appointment.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className='px-8 py-6'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container'>
                              {appointment.user?.name?.charAt(0) || 'P'}
                            </div>
                            <span className='text-sm font-semibold text-on-surface'>
                              {appointment.user?.name || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium text-on-surface'>
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className='text-[11px] text-outline'>
                              {new Date(appointment.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(
                              appointment.status
                            )}`}
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
                                  onClick={() => handleMarkAsDone(appointment.id)}
                                  className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => setCancellingAppointment({ id: appointment.id, patientName: appointment.user?.name || 'Unknown' })}
                                  className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'DONE' && (
                              <span className='text-xs text-outline'>Completed</span>
                            )}
                            {appointment.status === 'CANCELLED' && (
                              <span className='text-xs text-outline'>Cancelled</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='px-8 py-16 text-center'>
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
        )}
      </main>

      {/* Delete Confirmation Modal for Cancel */}
      <DeleteConfirmModal
        isOpen={!!appointmentToCancel}
        entityName={`Appointment with ${appointmentToCancel?.patientName || ''}`}
        entityType="Appointment"
        onClose={() => setCancellingAppointment(null)}
        onConfirm={handleCancel}
        isLoading={false}
        warningMessage="Are you sure you want to cancel this appointment? The patient will be notified."
      />
    </DashboardWrapper>
  );
}
