'use client';

import { useState, useMemo, useEffect } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import { getAppointments } from '@/lib/APICalls/appointments.api';
import type { Appointment } from '@/types/database';

const ITEMS_PER_PAGE = 10;
const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'DONE', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    let result = [...appointments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a: any) =>
          a.user?.name?.toLowerCase().includes(query) ||
          a.doctor?.name?.toLowerCase().includes(query) ||
          a.clinic?.name?.toLowerCase().includes(query),
      );
    }

    if (statusFilter) {
      result = result.filter((a: any) => a.status === statusFilter);
    }

    return result;
  }, [appointments, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Appointments'>
        <main className='flex-1 md:ml-64 p-8 flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <AdminGuard>
      <DashboardWrapper role='ADMIN' mobileTitle='Appointments'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <header className='mb-8'>
            <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface'>
              Appointments Management
            </h1>
          </header>

          {/* Filters */}
          <div className='mb-6 flex flex-col md:flex-row gap-3'>
            <div className='flex-1 relative'>
              <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm'>
                search
              </span>
              <input
                type='text'
                placeholder='Search appointments...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className='px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Patient</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Doctor</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Clinic</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Date</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Status</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {paginatedAppointments.length > 0 ? (
                    paginatedAppointments.map((appt: any) => (
                      <tr key={appt.id} className='hover:bg-surface-container-low/20'>
                        <td className='px-6 py-4 text-sm text-on-surface'>{appt.user?.name || 'N/A'}</td>
                        <td className='px-6 py-4 text-sm text-on-surface'>{appt.doctor?.name || 'N/A'}</td>
                        <td className='px-6 py-4 text-sm text-on-surface-variant'>{appt.clinic?.name || 'N/A'}</td>
                        <td className='px-6 py-4 text-sm text-on-surface-variant'>
                          {new Date(appt.date).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                            appt.status === 'BOOKED' ? 'bg-primary/10 text-primary' :
                            appt.status === 'DONE' ? 'bg-secondary/10 text-secondary' :
                            'bg-error/10 text-error'
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='px-6 py-16 text-center'>
                        <span className='material-symbols-outlined text-4xl text-outline mb-3'>event_busy</span>
                        <p className='text-sm text-secondary'>No appointments found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className='p-4 flex items-center justify-between border-t border-outline-variant/10'>
                <span className='text-xs text-outline'>
                  Showing {paginatedAppointments.length} of {filteredAppointments.length}
                </span>
                <div className='flex gap-1'>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded text-xs font-bold ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </DashboardWrapper>
    </AdminGuard>
  );
}
