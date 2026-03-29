'use client';

import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import { useSession } from '@/lib/hooks/use-auth';
import { getDoctorAppointments, updateAppointmentStatus } from '@/lib/APICalls/appointments.api';
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

export default function DoctorPage() {
  const { user } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      if (!user?.id) return;
      
      try {
        const data = await getDoctorAppointments(user.id);
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, [user?.id]);

  const handleMarkAsDone = async (id: string) => {
    try {
      await updateAppointmentStatus(id, 'DONE');
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: 'DONE' } : apt))
      );
    } catch (error) {
      console.error('Failed to mark as done:', error);
      alert('Failed to update appointment status');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await updateAppointmentStatus(id, 'CANCELLED');
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: 'CANCELLED' } : apt))
      );
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
      alert('Failed to cancel appointment');
    }
  };

  return (
    <DashboardWrapper role="DOCTOR" mobileTitle="Appointments">
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-8'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Welcome back
          </p>
          <h1 className='font-headline text-4xl font-bold text-on-background'>
            My Appointments
          </h1>
        </header>

        {/* Stats Overview */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10'>
            <p className='text-2xl font-bold text-on-background'>
              {appointments.filter(a => a.status === 'BOOKED').length}
            </p>
            <p className='text-xs text-secondary uppercase tracking-wider'>Pending</p>
          </div>
          <div className='p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10'>
            <p className='text-2xl font-bold text-on-background'>
              {appointments.filter(a => a.status === 'DONE').length}
            </p>
            <p className='text-xs text-secondary uppercase tracking-wider'>Completed</p>
          </div>
          <div className='p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10'>
            <p className='text-2xl font-bold text-on-background'>
              {appointments.length}
            </p>
            <p className='text-xs text-secondary uppercase tracking-wider'>Total</p>
          </div>
        </section>

        {/* Appointments Table */}
        {isLoading ? (
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className='p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='flex flex-col items-center justify-center py-12'>
              <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                <span className='material-symbols-outlined text-3xl text-outline'>
                  calendar_today
                </span>
              </div>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                No appointments yet
              </h3>
              <p className='text-sm text-secondary text-center max-w-md'>
                You don't have any appointments scheduled at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Patient
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Date & Time
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
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className='hover:bg-surface-container-low/20 group'
                      onMouseEnter={() => setHoveredRow(appointment.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container'>
                            {appointment.user?.name?.charAt(0) || 'P'}
                          </div>
                          <span className='text-sm font-semibold text-on-surface'>
                            {appointment.user?.name || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium text-on-surface'>
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className='text-[11px] text-outline'>
                            {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
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
                                Done
                              </button>
                              <button
                                onClick={() => handleCancel(appointment.id)}
                                className='bg-error-container/30 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status !== 'BOOKED' && (
                            <span className='text-xs text-outline'>
                              {appointment.status === 'DONE' ? 'Completed' : 'Cancelled'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </DashboardWrapper>
  );
}
