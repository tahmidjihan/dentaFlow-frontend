'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import Button from '@/components/ui/Button';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import EditClinicModal from '@/components/EditClinicModal';
import {
  useClinics,
  useCreateClinic,
  useUpdateClinic,
  useDeleteClinic,
} from '@/lib/hooks/use-clinics';
import { useToast } from '@/components/ui/Toast';
import type { CreateClinicInput } from '@/lib/APICalls/clinics.api';

const getStatusBadgeStyles = (status: string) => {
  return status === 'open'
    ? 'bg-primary/10 text-primary'
    : 'bg-error/10 text-error';
};

export default function ClinicsPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>(
    'all',
  );
  const [editingClinic, setEditingClinic] = useState<string | null>(null);
  const [deletingClinic, setDeletingClinic] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: clinicsData, isLoading, error } = useClinics();
  const createClinicMutation = useCreateClinic();
  const updateClinicMutation = useUpdateClinic();
  const deleteClinicMutation = useDeleteClinic();
  const { success, error: showError, ToastContainer } = useToast();

  const clinics = (clinicsData as any[]) || [];

  const filteredClinics = (clinics || []).filter((clinic: any) => {
    const matchesSearch =
      clinic.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || clinic.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteClinic = () => {
    if (!deletingClinic) return;

    deleteClinicMutation.mutate(deletingClinic.id, {
      onSuccess: () => {
        success('Clinic removed successfully');
        setDeletingClinic(null);
      },
      onError: () => {
        showError('Failed to remove clinic');
      },
    });
  };

  const handleEditSuccess = () => {
    success('Clinic updated successfully');
    setEditingClinic(null);
  };

  const handleCreateClinic = (data: CreateClinicInput) => {
    createClinicMutation.mutate(data, {
      onSuccess: () => {
        success('Clinic created successfully');
        setIsCreateModalOpen(false);
      },
      onError: () => {
        showError('Failed to create clinic');
      },
    });
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Clinics'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  return (
    <AdminGuard>
      <DashboardWrapper role='ADMIN' mobileTitle='Clinics'>
        <ToastContainer position='top-right' />

        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          {/* Header */}
          <header className='mb-12'>
            <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
              Clinic Management
            </p>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
              <div>
                <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                  Clinics
                </h1>
                <p className='text-secondary mt-2 max-w-xl'>
                  Manage all clinics and their information.
                </p>
              </div>
              <Button
                variant='primary'
                size='sm'
                icon='add'
                onClick={() => setIsCreateModalOpen(true)}
              >
                Add Clinic
              </Button>
            </div>
          </header>

          {/* Clinics Table Container */}
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
                    placeholder='Search clinics...'
                    className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
                  />
                </div>

                {/* Status Filter */}
                <div className='flex gap-2 flex-wrap'>
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as typeof statusFilter)
                    }
                    className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                  >
                    <option value='all'>All Status</option>
                    <option value='open'>Open</option>
                    <option value='closed'>Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
              <span className='text-xs text-outline font-medium'>
                Showing{' '}
                <span className='text-on-surface font-bold'>
                  {filteredClinics.length}
                </span>{' '}
                {filteredClinics.length === 1 ? 'clinic' : 'clinics'}
                {(searchQuery || statusFilter !== 'all') && (
                  <span> filtered</span>
                )}
              </span>
            </div>

            {/* Clinics Table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Clinic
                    </th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Contact
                    </th>
                    <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Location
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
                  {filteredClinics.length > 0 ? (
                    filteredClinics.map((clinic: any) => (
                      <tr
                        key={clinic.id}
                        className='hover:bg-surface-container-low/20 transition-colors group'
                        onMouseEnter={() => setHoveredRow(clinic.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className='px-8 py-6'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container'>
                              {clinic.name?.charAt(0) || 'C'}
                            </div>
                            <span className='text-sm font-semibold text-on-surface'>
                              {clinic.name}
                            </span>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium text-on-surface'>
                              {clinic.email}
                            </span>
                            <span className='text-[11px] text-outline'>
                              {clinic.phone}
                            </span>
                          </div>
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm text-on-surface-variant'>
                            {clinic.location}
                          </span>
                        </td>
                        <td className='px-8 py-6'>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyles(
                              clinic.status,
                            )}`}
                          >
                            {clinic.status}
                          </span>
                        </td>
                        <td className='px-8 py-6 text-right'>
                          <div
                            className={`flex justify-end gap-2 transition-opacity ${
                              hoveredRow === clinic.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                          >
                            <button
                              onClick={() => setEditingClinic(clinic.id)}
                              className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeletingClinic({
                                  id: clinic.id,
                                  name: clinic.name,
                                })
                              }
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='px-8 py-16 text-center'>
                        <div className='flex flex-col items-center justify-center'>
                          <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                            <span className='material-symbols-outlined text-3xl text-outline'>
                              search_off
                            </span>
                          </div>
                          <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                            No clinics found
                          </h3>
                          <p className='text-body-medium text-secondary max-w-md'>
                            {searchQuery
                              ? `No clinics match your search "${searchQuery}".`
                              : 'No clinics match the selected filters.'}
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
                Showing{' '}
                <span className='text-on-surface font-bold'>
                  {filteredClinics.length}
                </span>{' '}
                {filteredClinics.length === 1 ? 'clinic' : 'clinics'}
              </span>
              <div className='flex items-center gap-2'>
                <button
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline disabled:opacity-50'
                  disabled
                >
                  <span className='material-symbols-outlined'>
                    chevron_left
                  </span>
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm shadow-primary/20'>
                  1
                </button>
                <button
                  className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all disabled:opacity-50'
                  disabled
                >
                  <span className='material-symbols-outlined'>
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Edit Clinic Modal */}
        {editingClinic && (
          <EditClinicModal
            isOpen={!!editingClinic}
            clinicId={editingClinic}
            onClose={() => setEditingClinic(null)}
            onSuccess={handleEditSuccess}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={!!deletingClinic}
          entityName={deletingClinic?.name || ''}
          entityType='Clinic'
          onClose={() => setDeletingClinic(null)}
          onConfirm={handleDeleteClinic}
          isLoading={deleteClinicMutation.isPending}
          warningMessage='Are you sure you want to delete this clinic? This action cannot be undone.'
        />

        {/* Create Clinic Modal */}
        {isCreateModalOpen && (
          <EditClinicModal
            isOpen={isCreateModalOpen}
            clinicId={null}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={(data: any) => handleCreateClinic(data)}
            isCreateMode={true}
          />
        )}
      </DashboardWrapper>
    </AdminGuard>
  );
}
