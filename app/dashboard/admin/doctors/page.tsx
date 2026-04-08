'use client';

import { useState, useMemo } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import Button from '@/components/ui/Button';
import { useDoctors, useDeleteDoctor } from '@/lib/hooks/use-doctors';
import { useToast } from '@/components/ui/Toast';

const ITEMS_PER_PAGE = 10;

export default function AdminDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: doctors = [], isLoading } = useDoctors();
  const deleteDoctorMutation = useDeleteDoctor();
  const { success, error: showError, ToastContainer } = useToast();

  const filteredDoctors = useMemo(() => {
    let result = Array.isArray(doctors) ? [...doctors] : [];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d: any) =>
          d.name?.toLowerCase().includes(query) ||
          d.specialty?.toLowerCase().includes(query),
      );
    }
    return result;
  }, [doctors, searchQuery]);

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    deleteDoctorMutation.mutate(id, {
      onSuccess: () => success('Doctor deleted'),
      onError: () => showError('Failed to delete doctor'),
    });
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Doctors'>
        <main className='flex-1 md:ml-64 p-8 flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <AdminGuard>
      <DashboardWrapper role='ADMIN' mobileTitle='Doctors'>
        <ToastContainer position='top-right' />
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <header className='mb-8'>
            <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface'>
              Doctors Management
            </h1>
          </header>

          {/* Filter */}
          <div className='mb-6'>
            <div className='relative max-w-md'>
              <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm'>
                search
              </span>
              <input
                type='text'
                placeholder='Search doctors...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
            </div>
          </div>

          {/* Table */}
          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Name</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Specialty</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Experience</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Rating</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {paginatedDoctors.map((doctor: any) => (
                    <tr key={doctor.id} className='hover:bg-surface-container-low/20'>
                      <td className='px-6 py-4 text-sm font-semibold text-on-surface'>{doctor.name}</td>
                      <td className='px-6 py-4 text-sm text-on-surface-variant'>{doctor.specialty}</td>
                      <td className='px-6 py-4 text-sm text-on-surface-variant'>{doctor.experience || 'N/A'} yrs</td>
                      <td className='px-6 py-4 text-sm text-on-surface-variant'>{doctor.rating || 'N/A'}</td>
                      <td className='px-6 py-4 text-right'>
                        <Button variant='outline' size='sm' onClick={() => handleDelete(doctor.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className='p-4 flex items-center justify-between border-t border-outline-variant/10'>
                <span className='text-xs text-outline'>
                  Showing {paginatedDoctors.length} of {filteredDoctors.length} doctors
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
