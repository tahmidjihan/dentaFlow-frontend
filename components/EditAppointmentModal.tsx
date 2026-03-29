'use client';

import React, { useState, useEffect } from 'react';
import EditModalBase from './EditModalBase';
import Button from './ui/Button';
import Input from './ui/Input';
import FormField from './ui/FormField';
import FormSection from './ui/FormSection';
import { useUpdateAppointment } from '@/lib/hooks/use-appointments';
import { useUsers } from '@/lib/hooks/use-users';
import { useClinics } from '@/lib/hooks/use-clinics';
import type { Appointment, AppointStatus } from '@/types/database';

export interface EditAppointmentModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  patientId: string;
  doctorId: string;
  clinicId: string;
  date: string;
  status: AppointStatus;
  notes: string;
}

interface FormErrors {
  date?: string;
}

export default function EditAppointmentModal({
  isOpen,
  appointment,
  onClose,
  onSuccess,
}: EditAppointmentModalProps) {
  const updateAppointmentMutation = useUpdateAppointment();
  const { data: users = [] } = useUsers();
  const { data: clinics = [] } = useClinics();

  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    doctorId: '',
    clinicId: '',
    date: '',
    status: 'BOOKED',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Filter doctors from users
  const doctors = users?.filter((u: any) => u.role === 'DOCTOR') || [];
  
  // Filter patients from users
  const patients = users?.filter((u: any) => u.role === 'USER') || [];

  // Filter doctors by selected clinic
  const filteredDoctors = formData.clinicId
    ? doctors.filter((d: any) => d.clinicId === formData.clinicId)
    : doctors;

  // Populate form when appointment changes
  useEffect(() => {
    if (appointment) {
      // Convert date to datetime-local format
      const dateObj = new Date(appointment.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const dateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;

      setFormData({
        patientId: appointment.userId || '',
        doctorId: appointment.doctorId || '',
        clinicId: appointment.clinicId || '',
        date: dateTimeLocal,
        status: appointment.status as AppointStatus,
        notes: '',
      });
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.date = 'Cannot schedule appointments in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updateData: { status?: AppointStatus; date?: Date } = {};

    if (formData.status !== appointment.status) {
      updateData.status = formData.status;
    }

    if (formData.date) {
      updateData.date = new Date(formData.date);
    }

    updateAppointmentMutation.mutate(
      { id: appointment.id, data: updateData },
      {
        onSuccess: () => {
          onSuccess?.();
          handleClose();
        },
        onError: (error) => {
          console.error('Failed to update appointment:', error);
        },
      },
    );
  };

  const handleClose = () => {
    setFormData({
      patientId: '',
      doctorId: '',
      clinicId: '',
      date: '',
      status: 'BOOKED',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClinicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clinicId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      clinicId,
      // Reset doctor when clinic changes
      doctorId: '',
    }));
  };

  const footer = (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        disabled={updateAppointmentMutation.isPending}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={updateAppointmentMutation.isPending}
        icon="check"
        className="flex-1"
        form="edit-appointment-form"
      >
        {updateAppointmentMutation.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );

  const formatDateTimeDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <EditModalBase
      isOpen={isOpen}
      title="Edit Appointment"
      subtitle="Update appointment details"
      onClose={handleClose}
      isLoading={updateAppointmentMutation.isPending}
      footer={footer}
    >
      <form id="edit-appointment-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Appointment Details - Read Only */}
        <FormSection title="Appointment Details">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
                Patient
              </label>
              <div className="w-full bg-surface-container-low/50 border-none py-4 px-5 rounded-lg text-on-surface opacity-60">
                {appointment.user?.name || 'Unknown'}
              </div>
            </div>

            <div>
              <label className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
                Current Doctor
              </label>
              <div className="w-full bg-surface-container-low/50 border-none py-4 px-5 rounded-lg text-on-surface opacity-60">
                {appointment.doctor?.name || 'Unknown'}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
              Current Clinic
            </label>
            <div className="w-full bg-surface-container-low/50 border-none py-4 px-5 rounded-lg text-on-surface opacity-60">
              {appointment.clinic?.name || 'Unknown'}
            </div>
          </div>
        </FormSection>

        {/* Update Status & Date */}
        <FormSection title="Update Details">
          <FormField label="Status" icon="status" required>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={updateAppointmentMutation.isPending}
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body appearance-none pr-10"
            >
              <option value="BOOKED">Booked</option>
              <option value="DONE">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </FormField>

          <FormField
            label="Date & Time"
            error={errors.date}
            icon="schedule"
            required
          >
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={updateAppointmentMutation.isPending}
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface transition-all duration-300 font-body"
            />
          </FormField>

          {errors.date && (
            <p className="text-xs text-on-surface-variant ml-1">
              Current: {formatDateTimeDisplay(appointment.date)}
            </p>
          )}
        </FormSection>

        {/* Notes */}
        <FormSection title="Notes">
          <div>
            <label className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              disabled={updateAppointmentMutation.isPending}
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 py-4 px-5 rounded-lg text-on-surface placeholder:text-outline/50 transition-all duration-300 font-body resize-none"
              placeholder="Add any notes about this appointment..."
            />
          </div>
        </FormSection>
      </form>
    </EditModalBase>
  );
}
