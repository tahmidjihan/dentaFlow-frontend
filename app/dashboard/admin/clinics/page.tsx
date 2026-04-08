'use client';

import { useState, useMemo } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import Button from '@/components/ui/Button';
import { useClinics, useDeleteClinic } from '@/lib/hooks/use-clinics';
import { useToast } from '@/components/ui/Toast';

const ITEMS_PER_PAGE = 10;

export default function AdminClinicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: clinics = [], isLoading } = useClinics();
  const deleteClinicMutation = useDeleteClinic();
  const { success, error: showError, ToastContainer } = useToast();

  const filteredClinics = useMemo(() => {
    let result = Array.isArray(clinics) ? [...clinics] : [];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c: any) =>
          c.name?.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query),
      );
    }
    return result;
  }, [clinics, searchQuery]);

  const totalPages = Math.ceil(filteredClinics.length / ITEMS_PER_PAGE);
  const paginatedClinics = filteredClinics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    deleteClinicMutation.mutate(id, {
      onSuccess: () => success('Clinic deleted'),
      onError: () => showError('Failed to delete clinic'),
    });
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Clinics'>
        <main className='flex-1 md:ml-64 p-8 flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <AdminGuard>
      <DashboardWrapper role='ADMIN' mobileTitle='Clinics'>
        <ToastContainer position='top-right' />
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <header className='mb-8'>
            <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface'>
              Clinics Management
            </h1>
          </header>

          <div className='mb-6'>
            <div className='relative max-w-md'>
              <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm'>
                search
              </span>
              <input
                type='text'
                placeholder='Search clinics...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
            </div>
          </div>

          <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Name</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Location</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Phone</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>Status</th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {paginatedClinics.map((clinic: any) => (
                    <tr key={clinic.id} className='hover:bg-surface-container-low/20'>
                      <td className='px-6 py-4 text-sm font-semibold text-on-surface'>{clinic.name}</td>
                      <td className='px-6 py-4 text-sm text-on-surface-variant'>{clinic.location}</td>
                      <td className='px-6 py-4 text-sm text-on-surface-variant'>{clinic.phone}</td>
                      <td className='px-6 py-4'>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${clinic.status === 'open' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                          {clinic.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <Button variant='outline' size='sm' onClick={() => handleDelete(clinic.id)}>
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
                  Showing {paginatedClinics.length} of {filteredClinics.length} clinics
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
