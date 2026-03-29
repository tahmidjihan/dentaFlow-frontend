'use client';

import React, { useState, useEffect } from 'react';
import EditModalBase from './EditModalBase';
import Button from './ui/Button';
import Input from './ui/Input';
import FormField from './ui/FormField';
import FormSection from './ui/FormSection';
import { useUpdateUser } from '@/lib/hooks/use-users';
import { useClinics } from '@/lib/hooks/use-clinics';
import type { User, Role } from '@/types/database';

export interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Suspended';
  clinicId: string | null;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const updateUserMutation = useUpdateUser();
  const { data: clinics = [] } = useClinics();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'USER',
    status: 'Active',
    clinicId: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Populate form when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role as Role,
        status: user.emailVerified ? 'Active' : 'Suspended',
        clinicId: user.clinicId || null,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    const updateData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      clinicId: formData.clinicId,
    };

    updateUserMutation.mutate(
      { id: user.id, data: updateData },
      {
        onSuccess: () => {
          onSuccess?.();
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to update user:', error);
        },
      },
    );
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      role: 'USER',
      status: 'Active',
      clinicId: null,
    });
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'clinicId' ? (value || null) : value }));
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
        disabled={updateUserMutation.isPending}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={updateUserMutation.isPending}
        icon="check"
        className="flex-1"
        form="edit-user-form"
      >
        {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );

  return (
    <EditModalBase
      isOpen={isOpen}
      title="Edit User"
      subtitle="Update user information and permissions"
      onClose={handleClose}
      isLoading={updateUserMutation.isPending}
      footer={footer}
    >
      <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Account Information */}
        <FormSection title="Account Information">
          <FormField
            label="Name"
            error={errors.name}
            icon="person"
            required
          >
            <Input
              id="edit-user-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              disabled={updateUserMutation.isPending}
            />
          </FormField>

          <FormField
            label="Email"
            error={errors.email}
            icon="mail"
            required
          >
            <Input
              id="edit-user-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={updateUserMutation.isPending}
            />
          </FormField>
        </FormSection>

        {/* Role & Status */}
        <FormSection title="Role & Status">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Role" icon="badge">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={updateUserMutation.isPending}
                className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10"
              >
                <option value="USER">User</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </FormField>

            <FormField label="Status" icon="verified_user">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={updateUserMutation.isPending}
                className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </FormField>
          </div>
        </FormSection>

        {/* Clinic Assignment */}
        <FormSection title="Clinic Assignment">
          <FormField label="Assign to Clinic" icon="business">
            <select
              name="clinicId"
              value={formData.clinicId || ''}
              onChange={handleChange}
              disabled={updateUserMutation.isPending}
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10"
            >
              <option value="">No Clinic</option>
              {clinics.map((clinic: any) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </option>
              ))}
            </select>
          </FormField>
        </FormSection>
      </form>
    </EditModalBase>
  );
}
