'use client';

import React from 'react';
import Button from './ui/Button';

export type EntityType = 'User' | 'Doctor' | 'Clinic' | 'Appointment';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  entityName: string;
  entityType: EntityType;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  warningMessage?: string;
}

const entityIcons: Record<EntityType, string> = {
  User: 'person',
  Doctor: 'medical_services',
  Clinic: 'business',
  Appointment: 'event',
};

const entityTitles: Record<EntityType, string> = {
  User: 'Delete User?',
  Doctor: 'Delete Doctor?',
  Clinic: 'Delete Clinic?',
  Appointment: 'Delete Appointment?',
};

export default function DeleteConfirmModal({
  isOpen,
  entityName,
  entityType,
  onClose,
  onConfirm,
  isLoading = false,
  warningMessage,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  const icon = entityIcons[entityType];
  const title = entityTitles[entityType];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md">
          {/* Icon */}
          <div className="pt-6 px-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-4xl">{icon}</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 text-center">
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">
              {title}
            </h2>
            <p className="text-body-medium text-on-surface-variant mb-4">
              Are you sure you want to delete <strong className="text-on-surface font-semibold">"{entityName}"</strong>?
            </p>
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
              <p className="text-body-small text-error">
                <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                {warningMessage || 'This action cannot be undone. All associated data will be permanently removed.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
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
                onClick={handleConfirm}
                disabled={isLoading}
                variant="primary"
                className="flex-1 bg-error hover:bg-error/90 text-on-error"
                icon="delete"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
