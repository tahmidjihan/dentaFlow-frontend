'use client';

import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

interface CreateClinicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clinicData: CreateClinicFormData) => void;
  isLoading?: boolean;
}

export interface CreateClinicFormData {
  name: string;
  description: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

export default function CreateClinicModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateClinicModalProps) {
  const [formData, setFormData] = useState<CreateClinicFormData>({
    name: '',
    description: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateClinicFormData, string>>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateClinicFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Clinic name is required';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CreateClinicFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      email: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-surface border-b border-outline-variant/10 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-headline font-bold text-2xl text-on-surface">
                Create New Clinic
              </h2>
              <p className="text-body-small text-on-surface-variant mt-1">
                Add a new clinic to your network
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* Clinic Information */}
            <div>
              <h3 className="font-label text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
                Clinic Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Clinic Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="e.g., Harley Street Dental"
                  icon="business"
                />
                <div>
                  <label className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body resize-none"
                    placeholder="Brief description of your clinic..."
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-label text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
                Location
              </h3>
              <div className="space-y-4">
                <Input
                  label="Address Line 1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  error={errors.addressLine1}
                  placeholder="Street address"
                  icon="location_on"
                />
                <Input
                  label="Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  icon="apartment"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="City"
                    icon="location_city"
                  />
                  <Input
                    label="State/Province"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    icon="map"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                    placeholder="Postal/ZIP code"
                    icon="pin"
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    placeholder="Country"
                    icon="public"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-label text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+44 20 1234 5678"
                  icon="phone"
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="clinic@example.com"
                  icon="mail"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-outline-variant/10">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                icon="check"
                className="flex-1"
              >
                {isLoading ? 'Creating...' : 'Create Clinic'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
