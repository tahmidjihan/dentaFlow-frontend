'use client';

import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import EditAppointmentModal from '@/components/EditAppointmentModal';
import { getMyAppointments, updateAppointmentStatus } from '@/lib/APICalls/appointments.api';
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

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [cancellingAppointment, setCancellingAppointment] = useState<{ id: string; clinicName: string } | null>(null);
  const [reschedulingAppointment, setReschedulingAppointment] = useState<Appointment | null>(null);
  const { success, error: showError, ToastContainer } = useToast();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        showError('Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'upcoming') {
      return new Date(apt.date) > new Date() && apt.status !== 'CANCELLED';
    }
    if (filter === 'past') {
      return new Date(apt.date) <= new Date() || apt.status === 'CANCELLED';
    }
    return true;
  });

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
        showError('Failed to cancel appointment. Please try again.');
      });
  };

  const handleRescheduleSuccess = () => {
    success('Appointment rescheduled successfully');
    setReschedulingAppointment(null);
  };

  const appointmentToCancel = cancellingAppointment;
  const appointmentToReschedule = reschedulingAppointment;

  return (
    <DashboardWrapper role="USER" mobileTitle="My Appointments">
      <ToastContainer position="top-right" />
      
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-8'>
          <h1 className='font-headline text-4xl font-bold text-on-background mb-2'>
            My Appointments
          </h1>
          <p className='text-secondary'>View and manage your dental appointments</p>
        </header>

        {/* Filter Tabs */}
        <div className='flex gap-2 mb-6'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest text-secondary hover:bg-surface-container-high'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest text-secondary hover:bg-surface-container-high'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'past'
                ? 'bg-primary text-white'
                : 'bg-surface-container-lowest text-secondary hover:bg-surface-container-high'
            }`}
          >
            Past
          </button>
        </div>

        {/* Appointments List */}
        {isLoading ? (
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='flex flex-col items-center justify-center py-12'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline'>
                  calendar_today
                </span>
              </div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                No appointments found
              </h3>
              <p className='text-sm text-secondary text-center max-w-md'>
                {filter === 'all'
                  ? "You haven't booked any appointments yet."
                  : `No ${filter} appointments found.`}
              </p>
            </div>
          </div>
        ) : (
          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Date & Time
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Clinic
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Doctor
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Status
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className='hover:bg-surface-container-low/20'>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium text-on-surface'>
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className='text-xs text-outline'>
                            {new Date(appointment.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-secondary'>
                          {appointment.clinic?.name || 'Unknown Clinic'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-secondary'>
                          {appointment.doctor?.name || 'Unknown Doctor'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        {appointment.status === 'BOOKED' && (
                          <div className='flex justify-end gap-2'>
                            <button
                              onClick={() => setReschedulingAppointment(appointment)}
                              className='bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-outline text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => setCancellingAppointment({ id: appointment.id, clinicName: appointment.clinic?.name || 'Unknown' })}
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {appointment.status !== 'BOOKED' && (
                          <span className='text-xs text-outline'>
                            {appointment.status === 'CANCELLED' ? 'Cancelled' : 'Completed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal for Cancel */}
      <DeleteConfirmModal
        isOpen={!!appointmentToCancel}
        entityName={`Appointment at ${appointmentToCancel?.clinicName || ''}`}
        entityType="Appointment"
        onClose={() => setCancellingAppointment(null)}
        onConfirm={handleCancel}
        isLoading={false}
        warningMessage="Are you sure you want to cancel this appointment? This action cannot be undone."
      />

      {/* Edit Appointment Modal for Reschedule */}
      <EditAppointmentModal
        isOpen={!!appointmentToReschedule}
        appointment={appointmentToReschedule}
        onClose={() => setReschedulingAppointment(null)}
        onSuccess={handleRescheduleSuccess}
      />
    </DashboardWrapper>
  );
}
