'use client';

import React, { useState, useEffect } from 'react';
import EditModalBase from './EditModalBase';
import Button from './ui/Button';
import Input from './ui/Input';
import FormField from './ui/FormField';
import FormSection from './ui/FormSection';
import { useUpdateDoctor } from '@/lib/hooks/use-doctors';
import { useClinics } from '@/lib/hooks/use-clinics';
import type { User } from '@/types/database';

export interface EditDoctorModalProps {
  isOpen: boolean;
  doctor: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  clinicId: string | null;
}

export default function EditDoctorModal({
  isOpen,
  doctor,
  onClose,
  onSuccess,
}: EditDoctorModalProps) {
  const updateDoctorMutation = useUpdateDoctor();
  const { data: clinics = [] } = useClinics();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    clinicId: null,
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        email: doctor.email || '',
        clinicId: doctor.clinicId || null,
      });
    }
  }, [doctor]);

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorMutation.mutate(
      { id: doctor.id, data: { clinicId: formData.clinicId } },
      {
        onSuccess: () => {
          onSuccess?.();
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to update doctor:', error);
        },
      },
    );
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', clinicId: null });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'clinicId' ? value || null : value,
    }));
  };

  const footer = (
    <div className='flex gap-3'>
      <Button
        type='button'
        variant='outline'
        onClick={handleClose}
        disabled={updateDoctorMutation.isPending}
        className='flex-1'
      >
        Cancel
      </Button>
      <Button
        type='submit'
        disabled={updateDoctorMutation.isPending}
        icon='check'
        className='flex-1'
        form='edit-doctor-form'
      >
        {updateDoctorMutation.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );

  return (
    <EditModalBase
      isOpen={isOpen}
      title='Edit Doctor'
      subtitle='Update doctor information and clinic assignment'
      onClose={handleClose}
      isLoading={updateDoctorMutation.isPending}
      footer={footer}
    >
      <form id='edit-doctor-form' onSubmit={handleSubmit} className='space-y-6'>
        {/* Doctor Information - Read Only */}
        <FormSection title='Doctor Information'>
          <FormField label='Name' icon='person'>
            <Input
              id='edit-doctor-name'
              name='name'
              value={formData.name}
              disabled
              className='opacity-60 cursor-not-allowed'
            />
          </FormField>

          <FormField label='Email' icon='mail'>
            <Input
              id='edit-doctor-email'
              name='email'
              type='email'
              value={formData.email}
              disabled
              className='opacity-60 cursor-not-allowed'
            />
          </FormField>
        </FormSection>

        {/* Clinic Assignment */}
        <FormSection title='Clinic Assignment'>
          <FormField label='Assign to Clinic' icon='business'>
            <select
              name='clinicId'
              value={formData.clinicId || ''}
              onChange={handleChange}
              disabled={updateDoctorMutation.isPending}
              className='w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10'
            >
              <option value=''>Unassigned</option>
              {clinics.map((clinic: any) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </option>
              ))}
            </select>
          </FormField>
          <p className='text-xs text-on-surface-variant ml-1'>
            Assign this doctor to a clinic to enable appointment bookings.
          </p>
        </FormSection>

        {/* Status */}
        <FormSection title='Status'>
          <div className='flex items-center gap-3 p-4 bg-surface-container-low rounded-lg'>
            <span
              className={`material-symbols-outlined ${doctor.emailVerified ? 'text-primary' : 'text-secondary'}`}
            >
              {doctor.emailVerified ? 'verified' : 'pending'}
            </span>
            <div>
              <p className='text-sm font-semibold text-on-surface'>
                {doctor.emailVerified ? 'Verified' : 'Pending Verification'}
              </p>
              <p className='text-xs text-on-surface-variant'>
                {doctor.emailVerified
                  ? 'This doctor has been verified and can accept appointments.'
                  : 'Verification email has been sent to this doctor.'}
              </p>
            </div>
          </div>
        </FormSection>
      </form>
    </EditModalBase>
  );
}
