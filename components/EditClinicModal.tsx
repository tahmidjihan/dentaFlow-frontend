'use client';

import React, { useState, useEffect } from 'react';
import EditModalBase from './EditModalBase';
import Button from './ui/Button';
import Input from './ui/Input';
import FormField from './ui/FormField';
import FormSection from './ui/FormSection';
import { useUpdateClinic } from '@/lib/hooks/use-clinics';
import type { Clinic } from '@/types/database';

export interface EditClinicModalProps {
  isOpen: boolean;
  clinic: Clinic | null;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'open' | 'closed';
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export default function EditClinicModal({
  isOpen,
  clinic,
  onClose,
  onSuccess,
}: EditClinicModalProps) {
  const updateClinicMutation = useUpdateClinic();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'open',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Populate form when clinic changes
  useEffect(() => {
    if (clinic) {
      setFormData({
        name: clinic.name || '',
        email: clinic.email || '',
        phone: clinic.phone || '',
        location: clinic.location || '',
        status: clinic.status || 'open',
      });
    }
  }, [clinic]);

  if (!isOpen || !clinic) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Clinic name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    updateClinicMutation.mutate(
      { id: clinic.id, data: formData },
      {
        onSuccess: () => {
          onSuccess?.();
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to update clinic:', error);
        },
      },
    );
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'open',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const footer = (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        disabled={updateClinicMutation.isPending}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={updateClinicMutation.isPending}
        icon="check"
        className="flex-1"
        form="edit-clinic-form"
      >
        {updateClinicMutation.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );

  return (
    <EditModalBase
      isOpen={isOpen}
      title="Edit Clinic"
      subtitle="Update clinic information and settings"
      onClose={handleClose}
      isLoading={updateClinicMutation.isPending}
      footer={footer}
    >
      <form id="edit-clinic-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Clinic Information */}
        <FormSection title="Clinic Information">
          <FormField
            label="Clinic Name"
            error={errors.name}
            icon="business"
            required
          >
            <Input
              id="edit-clinic-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Harley Street Dental"
              disabled={updateClinicMutation.isPending}
            />
          </FormField>

          <FormField
            label="Location"
            error={errors.location}
            icon="location_on"
            required
          >
            <Input
              id="edit-clinic-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Full address"
              disabled={updateClinicMutation.isPending}
            />
          </FormField>
        </FormSection>

        {/* Contact Information */}
        <FormSection title="Contact Information">
          <FormField
            label="Phone Number"
            error={errors.phone}
            icon="phone"
            required
          >
            <Input
              id="edit-clinic-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+44 20 1234 5678"
              disabled={updateClinicMutation.isPending}
            />
          </FormField>

          <FormField
            label="Email Address"
            error={errors.email}
            icon="mail"
            required
          >
            <Input
              id="edit-clinic-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="clinic@example.com"
              disabled={updateClinicMutation.isPending}
            />
          </FormField>
        </FormSection>

        {/* Status */}
        <FormSection title="Clinic Status">
          <FormField label="Status" icon="store">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={updateClinicMutation.isPending}
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </FormField>
          <p className="text-xs text-on-surface-variant ml-1">
            Set clinic status to control visibility and appointment bookings.
          </p>
        </FormSection>
      </form>
    </EditModalBase>
  );
}
