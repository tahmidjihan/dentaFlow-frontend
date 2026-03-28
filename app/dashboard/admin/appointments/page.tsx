'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';

interface Appointment {
  id: string;
  patient: {
    name: string;
    initials?: string;
    image?: string;
  };
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  type: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    patient: { name: 'Eleanor Maxwell', initials: 'EM' },
    doctor: 'Dr. Julian Vance',
    clinic: 'Chelsea Wellness',
    date: 'Oct 24, 2024',
    time: '09:30 AM',
    status: 'Confirmed',
    type: 'Checkup',
  },
  {
    id: '2',
    patient: { name: 'Tobias Hart', initials: 'TH' },
    doctor: 'Dr. Sarah Chen',
    clinic: 'South Kensington',
    date: 'Oct 24, 2024',
    time: '11:15 AM',
    status: 'Pending',
    type: 'Cleaning',
  },
  {
    id: '3',
    patient: {
      name: 'Marcus Thorne',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDat-3fuaHcXy2xor6JHd6WC2C3Te7VKUaTBp3E7Dz0Cfpe7dXC3bEyAbasU1EtDD6U3xVYv0Xp_FhQk6o0jZHMwUIGKdb7RfR_eY4ZeZ84kAEFj9ztUf-ZAhfdqHCzT2mJJXUBEAvWbbWcQDrp-R5KOqqP3d37xkDuR1F5pDRmlxURdYSmKQBpujatUP0d3dguxLrGeiwbiD8A-so8LjpUInc09Jp8JlwWnZiyRI7_C6_0XQmCg-zrWHgUd2mfCXu-vhKiaZGeaeQ',
    },
    doctor: 'Dr. Anya Kovic',
    clinic: 'Mayfair Sanctuary',
    date: 'Oct 25, 2024',
    time: '02:00 PM',
    status: 'In Progress',
    type: 'Root Canal',
  },
  {
    id: '4',
    patient: { name: 'Lydia Wright', initials: 'LW' },
    doctor: 'Dr. Julian Vance',
    clinic: 'Chelsea Wellness',
    date: 'Oct 25, 2024',
    time: '04:45 PM',
    status: 'Completed',
    type: 'Filling',
  },
  {
    id: '5',
    patient: { name: 'James Pemberton', initials: 'JP' },
    doctor: 'Dr. Emma Charlotte',
    clinic: 'Notting Hill Haven',
    date: 'Oct 26, 2024',
    time: '10:00 AM',
    status: 'Cancelled',
    type: 'Extraction',
  },
  {
    id: '6',
    patient: { name: 'Sophia Chen', initials: 'SC' },
    doctor: 'Dr. Olivia Beaumont',
    clinic: 'Harley Studio',
    date: 'Oct 26, 2024',
    time: '03:30 PM',
    status: 'Confirmed',
    type: 'Whitening',
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-primary/10 text-primary';
    case 'Pending':
      return 'bg-secondary-container text-on-secondary-container';
    case 'In Progress':
      return 'bg-primary-fixed/30 text-primary';
    case 'Completed':
      return 'bg-surface-container-high text-outline';
    case 'Cancelled':
      return 'bg-error/10 text-error';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function AdminAppointmentsPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Confirmed' | 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'>('all');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCancelAppointment = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    console.log(`Cancelling appointment ${selectedAppointment}`);
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleMarkComplete = (appointmentId: string) => {
    console.log(`Marking appointment ${appointmentId} as completed`);
  };

  return (
    <DashboardWrapper role="ADMIN" mobileTitle="Appointments">
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
                Monitor and manage all appointments across all clinics and doctors.
              </p>
            </div>
            <Button icon='download' variant='outline'>
              Export Data
            </Button>
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
                  <option value='Confirmed'>Confirmed</option>
                  <option value='Pending'>Pending</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                  <option value='Cancelled'>Cancelled</option>
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
                    Doctor
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Clinic
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Date & Time
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Type
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
                          {appointment.patient.image ? (
                            <img
                              className='w-10 h-10 rounded-full object-cover'
                              src={appointment.patient.image}
                              alt={appointment.patient.name}
                            />
                          ) : (
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {appointment.patient.initials}
                            </div>
                          )}
                          <span className='text-sm font-semibold text-on-surface'>
                            {appointment.patient.name}
                          </span>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>{appointment.doctor}</span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-outline'>{appointment.clinic}</span>
                      </td>
                      <td className='px-8 py-6'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium text-on-surface'>
                            {appointment.date}
                          </span>
                          <span className='text-[11px] text-outline'>
                            {appointment.time}
                          </span>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>{appointment.type}</span>
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(appointment.status)}`}
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
                          {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                            <>
                              <button
                                onClick={() => handleMarkComplete(appointment.id)}
                                className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'Completed' && (
                            <span className='text-[11px] font-bold text-outline px-4 py-1.5'>
                              Completed
                            </span>
                          )}
                          {appointment.status === 'Cancelled' && (
                            <span className='text-[11px] font-bold text-error px-4 py-1.5'>
                              Cancelled
                            </span>
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
                            : 'No appointments match the selected filter.'}
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
              Showing <span className='text-on-surface font-bold'>1-{filteredAppointments.length}</span> of{' '}
              <span className='text-on-surface font-bold'>{appointments.length}</span> appointments
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

        {/* Stats Summary */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-8'>
          <div className='bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-4 text-center'>
            <p className='text-xs font-label font-bold uppercase tracking-widest text-outline mb-1'>Total</p>
            <p className='text-2xl font-headline font-bold text-on-surface'>{appointments.length}</p>
          </div>
          <div className='bg-primary/10 rounded-xl border border-primary/20 p-4 text-center'>
            <p className='text-xs font-label font-bold uppercase tracking-widest text-primary mb-1'>Confirmed</p>
            <p className='text-2xl font-headline font-bold text-primary'>
              {appointments.filter(a => a.status === 'Confirmed').length}
            </p>
          </div>
          <div className='bg-secondary-container/30 rounded-xl border border-secondary-container/40 p-4 text-center'>
            <p className='text-xs font-label font-bold uppercase tracking-widest text-on-secondary-container mb-1'>Pending</p>
            <p className='text-2xl font-headline font-bold text-on-secondary-container'>
              {appointments.filter(a => a.status === 'Pending').length}
            </p>
          </div>
          <div className='bg-surface-container-high rounded-xl border border-outline-variant/20 p-4 text-center'>
            <p className='text-xs font-label font-bold uppercase tracking-widest text-outline mb-1'>Completed</p>
            <p className='text-2xl font-headline font-bold text-on-surface'>
              {appointments.filter(a => a.status === 'Completed').length}
            </p>
          </div>
          <div className='bg-error/10 rounded-xl border border-error/20 p-4 text-center'>
            <p className='text-xs font-label font-bold uppercase tracking-widest text-error mb-1'>Cancelled</p>
            <p className='text-2xl font-headline font-bold text-error'>
              {appointments.filter(a => a.status === 'Cancelled').length}
            </p>
          </div>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
            onClick={() => setCancelModalOpen(false)}
          />
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div className='bg-surface rounded-2xl shadow-2xl w-full max-w-md'>
              <div className='pt-6 px-6 flex justify-center'>
                <div className='w-16 h-16 rounded-full bg-error/10 flex items-center justify-center'>
                  <span className='material-symbols-outlined text-error text-4xl'>warning</span>
                </div>
              </div>
              <div className='px-6 pb-6 text-center'>
                <h2 className='font-headline font-bold text-2xl text-on-surface mb-2'>
                  Cancel Appointment?
                </h2>
                <p className='text-body-medium text-on-surface-variant mb-6'>
                  Are you sure you want to cancel this appointment? This action will notify the patient and doctor.
                </p>
                <div className='flex gap-3'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setCancelModalOpen(false)}
                    className='flex-1'
                  >
                    Go Back
                  </Button>
                  <Button
                    onClick={confirmCancel}
                    variant='primary'
                    className='flex-1 bg-error hover:bg-error/90 text-on-error'
                    icon='cancel'
                  >
                    Cancel Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardWrapper>
  );
}
