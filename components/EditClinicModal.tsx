'use client';

import React, { useState, useEffect } from 'react';
import EditModalBase from './EditModalBase';
import Button from './ui/Button';
import Input from './ui/Input';
import FormField from './ui/FormField';
import FormSection from './ui/FormSection';
import { useUpdateClinic, useClinic } from '@/lib/hooks/use-clinics';
import type { CreateClinicInput } from '@/lib/APICalls/clinics.api';

export interface EditClinicModalProps {
  isOpen: boolean;
  clinicId: string | null;
  onClose: () => void;
  onSuccess?: (data: CreateClinicInput) => void;
  isCreateMode?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'open' | 'closed';
}

export default function EditClinicModal({
  isOpen,
  clinicId,
  onClose,
  onSuccess,
  isCreateMode = false,
}: EditClinicModalProps) {
  const updateClinicMutation = useUpdateClinic();
  const { data: clinic } = useClinic(clinicId || '');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'open',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (clinic && !isCreateMode) {
      setFormData({
        name: clinic.name || '',
        email: clinic.email || '',
        phone: clinic.phone || '',
        location: clinic.location || '',
        status: clinic.status || 'open',
      });
    } else if (isCreateMode) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        status: 'open',
      });
    }
  }, [clinic, isCreateMode]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Clinic name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (isCreateMode) {
      onSuccess?.(formData);
    } else if (clinicId) {
      updateClinicMutation.mutate(
        { id: clinicId, data: formData },
        {
          onSuccess: () => {
            onSuccess?.(formData as any);
          },
        },
      );
    }
  };

  const isLoading = updateClinicMutation.isPending;

  return (
    <EditModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={isCreateMode ? 'Create Clinic' : 'Edit Clinic'}
      isLoading={isLoading}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Basic Information */}
        <FormSection title='Basic Information'>
          <FormField label='Clinic Name' icon='business' error={errors.name}>
            <Input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='e.g., Downtown Dental Clinic'
              disabled={isLoading}
              error={errors.name}
            />
          </FormField>

          <FormField label='Email' icon='mail' error={errors.email}>
            <Input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='clinic@example.com'
              disabled={isLoading}
              error={errors.email}
            />
          </FormField>

          <FormField label='Phone' icon='call' error={errors.phone}>
            <Input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='+1 (555) 123-4567'
              disabled={isLoading}
              error={errors.phone}
            />
          </FormField>

          <FormField label='Location' icon='location_on' error={errors.location}>
            <Input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='123 Main St, City, State'
              disabled={isLoading}
              error={errors.location}
            />
          </FormField>
        </FormSection>

        {/* Status */}
        <FormSection title='Status'>
          <div className='flex items-center gap-3 p-4 bg-surface-container-low rounded-lg'>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              disabled={isLoading}
              className='flex-1 bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 py-3 px-4 rounded-lg text-on-surface transition-all duration-300 font-body'
            >
              <option value='open'>Open</option>
              <option value='closed'>Closed</option>
            </select>
            <span
              className={`material-symbols-outlined ${
                formData.status === 'open' ? 'text-primary' : 'text-secondary'
              }`}
            >
              {formData.status === 'open' ? 'check_circle' : 'cancel'}
            </span>
          </div>
          <p className='text-xs text-on-surface-variant ml-1 mt-1'>
            Set the clinic status to control whether it can accept new appointments.
          </p>
        </FormSection>

        {/* Action Buttons */}
        <div className='flex gap-3 mt-8 pt-6 border-t border-outline-variant/20'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={onClose}
            disabled={isLoading}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='primary'
            size='lg'
            loading={isLoading}
            className='flex-1'
          >
            {isCreateMode ? 'Create Clinic' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </EditModalBase>
  );
}
