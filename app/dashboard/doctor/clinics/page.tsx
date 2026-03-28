'use client';

import React, { useState, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ClinicCard from '@/components/ClinicCard';
import CreateClinicModal, { CreateClinicFormData } from '@/components/CreateClinicModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import LeaveConfirmModal from '@/components/LeaveConfirmModal';
import Button from '@/components/ui/Button';
import { ClinicExtended } from '@/types/database';
import clinicsData from '@/data/clinics.json';

// Mock data - will be replaced with API calls
const MOCK_CLINICS: ClinicExtended[] = clinicsData.map((clinic: any) => ({
  id: clinic.id,
  name: clinic.name,
  status: 'open',
  email: clinic.contact.email,
  phone: clinic.phone,
  location: clinic.address,
  address: clinic.address,
  addressLine2: clinic.addressLine2 || '',
  city: clinic.city,
  state: clinic.state,
  postalCode: clinic.postalCode,
  country: clinic.country,
  specialty: clinic.specialty,
  description: clinic.description,
  doctorCount: clinic.practitioners.length,
  createdAt: new Date(),
}));

// Simulated doctor memberships (for demo purposes)
const DOCTOR_MEMBERSHIPS: Record<string, 'OWNER' | 'MEMBER'> = {
  'the-sanctuary-highwood': 'OWNER',
  'the-chelsea-mews': 'MEMBER',
};

type FilterType = 'all' | 'my-clinics' | 'available';

export default function ClinicsPage() {
  const [clinics] = useState<ClinicExtended[]>(MOCK_CLINICS);
  const [memberships, setMemberships] = useState<Record<string, 'OWNER' | 'MEMBER'>>(
    DOCTOR_MEMBERSHIPS
  );
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  // Filter clinics based on current filter and search query
  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      // Filter by membership status
      if (filter === 'my-clinics' && !memberships[clinic.id]) {
        return false;
      }
      if (filter === 'available' && memberships[clinic.id]) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = clinic.name.toLowerCase().includes(query);
        const matchesLocation = clinic.location.toLowerCase().includes(query);
        const matchesCity = clinic.city.toLowerCase().includes(query);
        const matchesSpecialty = clinic.specialty?.toLowerCase().includes(query);
        return matchesName || matchesLocation || matchesCity || matchesSpecialty;
      }

      return true;
    });
  }, [clinics, memberships, filter, searchQuery]);

  const getMembershipStatus = (clinicId: string): 'OWNER' | 'MEMBER' | 'AVAILABLE' => {
    return memberships[clinicId] || 'AVAILABLE';
  };

  const handleCreateClinic = (clinicData: CreateClinicFormData) => {
    // Simulate API call
    console.log('Creating clinic:', clinicData);
    // In real implementation, this would call an API endpoint
    setIsCreateModalOpen(false);
  };

  const handleJoinClinic = async (clinicId: string) => {
    setLoadingActionId(clinicId);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMemberships((prev) => ({ ...prev, [clinicId]: 'MEMBER' }));
    } catch (error) {
      console.error('Failed to join clinic:', error);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleLeaveClinic = async (clinicId: string) => {
    setLoadingActionId(clinicId);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMemberships((prev) => {
        const newMemberships = { ...prev };
        delete newMemberships[clinicId];
        return newMemberships;
      });
      setIsLeaveModalOpen(false);
      setSelectedClinicId(null);
    } catch (error) {
      console.error('Failed to leave clinic:', error);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleDeleteClinic = async (clinicId: string) => {
    setLoadingActionId(clinicId);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMemberships((prev) => {
        const newMemberships = { ...prev };
        delete newMemberships[clinicId];
        return newMemberships;
      });
      setIsDeleteModalOpen(false);
      setSelectedClinicId(null);
    } catch (error) {
      console.error('Failed to delete clinic:', error);
    } finally {
      setLoadingActionId(null);
    }
  };

  const openLeaveModal = (clinicId: string) => {
    setSelectedClinicId(clinicId);
    setIsLeaveModalOpen(true);
  };

  const openDeleteModal = (clinicId: string) => {
    setSelectedClinicId(clinicId);
    setIsDeleteModalOpen(true);
  };

  const getSelectedClinic = () => {
    return clinics.find((c) => c.id === selectedClinicId);
  };

  return (
    <>
      <DashboardHeader title="Clinics" />
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
      {/* Header */}
      <header className='mb-12'>
        <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
          Clinic Management
        </p>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
              Manage your clinics
            </h1>
            <p className='text-secondary mt-2 max-w-xl'>
              View, join, or create clinic locations. Manage your memberships and access clinic resources.
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            icon='add'
            className='min-w-[160px]'
          >
            Create Clinic
          </Button>
        </div>
      </header>

      {/* Filters and Search */}
      <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden mb-6'>
        <div className='p-6 border-b border-outline-variant/10 bg-surface-container-low/30'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            {/* Filter Tabs */}
            <div className='flex gap-2 bg-surface-container-low p-1 rounded-xl w-full lg:w-auto'>
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 lg:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-outline hover:bg-surface-container-high'
                }`}
              >
                All Clinics
              </button>
              <button
                onClick={() => setFilter('my-clinics')}
                className={`flex-1 lg:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === 'my-clinics'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-outline hover:bg-surface-container-high'
                }`}
              >
                My Clinics
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`flex-1 lg:flex-none px-4 py-2 rounded-lg font-label text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === 'available'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-outline hover:bg-surface-container-high'
                }`}
              >
                Available
              </button>
            </div>

            {/* Search */}
            <div className='relative w-full lg:w-auto'>
              <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline'>
                search
              </span>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search clinics...'
                className='w-full lg:w-[300px] bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
          <span className='text-xs text-outline font-medium'>
            Showing <span className='text-on-surface font-bold'>{filteredClinics.length}</span>{' '}
            {filteredClinics.length === 1 ? 'clinic' : 'clinics'}
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
          </span>
        </div>

        {/* Clinic Grid */}
        {filteredClinics.length > 0 ? (
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {filteredClinics.map((clinic) => (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                  membershipStatus={getMembershipStatus(clinic.id)}
                  onJoin={handleJoinClinic}
                  onLeave={openLeaveModal}
                  onDelete={openDeleteModal}
                  isLoading={loadingActionId === clinic.id}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className='flex flex-col items-center justify-center py-16 text-center px-6'>
            <div className='w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6'>
              <span className='material-symbols-outlined text-4xl text-outline'>
                business
              </span>
            </div>
            <h3 className='font-headline text-2xl font-bold text-on-surface mb-2'>
              No clinics found
            </h3>
            <p className='text-body-medium text-secondary max-w-md mb-6'>
              {searchQuery
                ? `No clinics match your search "${searchQuery}". Try a different search term.`
                : filter === 'my-clinics'
                ? "You haven't joined any clinics yet. Browse available clinics and join one to get started."
                : filter === 'available'
                ? 'All clinics are currently at capacity or you have joined all available clinics.'
                : 'There are no clinics available at the moment.'}
            </p>
            {filter === 'my-clinics' && (
              <Button onClick={() => setFilter('available')} icon='browse_gallery'>
                Browse Available Clinics
              </Button>
            )}
            {filter === 'all' && !searchQuery && (
              <Button onClick={() => setIsCreateModalOpen(true)} icon='add_business'>
                Create Your First Clinic
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Modals */}
      <CreateClinicModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClinic}
      />

      {getSelectedClinic() && (
        <>
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            clinicName={getSelectedClinic()!.name}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedClinicId(null);
            }}
            onConfirm={() => handleDeleteClinic(selectedClinicId!)}
            isLoading={loadingActionId === selectedClinicId}
          />

          <LeaveConfirmModal
            isOpen={isLeaveModalOpen}
            clinicName={getSelectedClinic()!.name}
            onClose={() => {
              setIsLeaveModalOpen(false);
              setSelectedClinicId(null);
            }}
            onConfirm={() => handleLeaveClinic(selectedClinicId!)}
            isLoading={loadingActionId === selectedClinicId}
          />
        </>
      )}
    </main>
    </>
  );
}
