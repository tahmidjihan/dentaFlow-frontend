'use client';

import { useState } from 'react';

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
  status: 'Confirmed' | 'Pending' | 'In Progress';
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
  },
  {
    id: '2',
    patient: { name: 'Tobias Hart', initials: 'TH' },
    doctor: 'Dr. Sarah Chen',
    clinic: 'South Kensington',
    date: 'Oct 24, 2024',
    time: '11:15 AM',
    status: 'Pending',
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
    status: 'Confirmed',
  },
  {
    id: '4',
    patient: { name: 'Lydia Wright', initials: 'LW' },
    doctor: 'Dr. Julian Vance',
    clinic: 'Chelsea Wellness',
    date: 'Oct 25, 2024',
    time: '04:45 PM',
    status: 'In Progress',
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-primary/10 text-primary';
    case 'Pending':
      return 'bg-secondary-container text-on-secondary-container';
    case 'In Progress':
      return 'bg-surface-container-high text-outline';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function DoctorPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <main className='flex-1 md:ml-64 p-4 md:p-12'>
      {/* Stats Overview */}
      <section className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
        <div className='bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm shadow-on-background/5'>
          <p className='text-[10px] uppercase tracking-widest text-outline font-bold mb-4'>
            Total Bookings
          </p>
          <div className='flex items-end justify-between'>
            <h3 className='text-3xl font-bold text-on-surface'>1,284</h3>
            <span className='text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded'>
              +12%
            </span>
          </div>
        </div>
        <div className='bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm shadow-on-background/5'>
          <p className='text-[10px] uppercase tracking-widest text-outline font-bold mb-4'>
            Active Clinics
          </p>
          <div className='flex items-end justify-between'>
            <h3 className='text-3xl font-bold text-on-surface'>12</h3>
            <span className='text-outline text-xs font-bold'>Stable</span>
          </div>
        </div>
        <div className='bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm shadow-on-background/5'>
          <p className='text-[10px] uppercase tracking-widest text-outline font-bold mb-4'>
            Pending Review
          </p>
          <div className='flex items-end justify-between'>
            <h3 className='text-3xl font-bold text-on-surface'>48</h3>
            <span className='text-error text-xs font-bold bg-error-container px-2 py-1 rounded'>
              Action Required
            </span>
          </div>
        </div>
        <div className='bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm shadow-on-background/5'>
          <p className='text-[10px] uppercase tracking-widest text-outline font-bold mb-4'>
            System Health
          </p>
          <div className='flex items-end justify-between'>
            <h3 className='text-3xl font-bold text-on-surface'>99.9%</h3>
            <div className='flex items-center gap-1 text-primary'>
              <span className='w-2 h-2 rounded-full bg-primary animate-pulse'></span>
              <span className='text-xs font-bold'>Online</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments Table Container */}
      <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
        <div className='p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30'>
          <div className='relative w-full max-w-md'>
            <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline'>
              search
            </span>
            <input
              className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
              placeholder='Search patients, doctors or clinics...'
              type='text'
            />
          </div>
          <div className='flex gap-2'>
            <button className='p-2 rounded-lg hover:bg-surface-container-high text-outline transition-all'>
              <span className='material-symbols-outlined'>filter_list</span>
            </button>
            <button className='p-2 rounded-lg hover:bg-surface-container-high text-outline transition-all'>
              <span className='material-symbols-outlined'>more_vert</span>
            </button>
          </div>
        </div>
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
                  Status
                </th>
                <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-outline-variant/5'>
              {appointments.map((appointment) => (
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
                          className='w-8 h-8 rounded-full object-cover'
                          src={appointment.patient.image}
                          alt={appointment.patient.name}
                        />
                      ) : (
                        <div className='w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container'>
                          {appointment.patient.initials}
                        </div>
                      )}
                      <span className='text-sm font-semibold text-on-surface'>
                        {appointment.patient.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-8 py-6'>
                    <span className='text-sm text-secondary font-medium'>
                      {appointment.doctor}
                    </span>
                  </td>
                  <td className='px-8 py-6'>
                    <span className='text-sm text-outline'>
                      {appointment.clinic}
                    </span>
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
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className='px-8 py-6 text-right'>
                    <div
                      className={`flex justify-end gap-2 transition-opacity ${hoveredRow === appointment.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <button className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'>
                        Done
                      </button>
                      <button className='bg-error-container/30 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className='p-8 flex items-center justify-between bg-surface-container-low/10'>
          <span className='text-xs text-outline font-medium'>
            Showing <span className='text-on-surface font-bold'>1-10</span> of{' '}
            <span className='text-on-surface font-bold'>128</span> appointments
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
    </main>
  );
}
