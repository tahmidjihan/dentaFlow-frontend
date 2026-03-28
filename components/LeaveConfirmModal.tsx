'use client';

import React from 'react';
import Button from './ui/Button';

interface LeaveConfirmModalProps {
  isOpen: boolean;
  clinicName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LeaveConfirmModal({
  isOpen,
  clinicName,
  onClose,
  onConfirm,
  isLoading = false,
}: LeaveConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
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
        <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md">
          {/* Icon */}
          <div className="pt-6 px-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container text-4xl">logout</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 text-center">
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">
              Leave Clinic?
            </h2>
            <p className="text-body-medium text-on-surface-variant mb-4">
              Are you sure you want to leave <strong className="text-on-surface font-semibold">"{clinicName}"</strong>?
            </p>
            <div className="bg-surface-container-high rounded-lg p-4 mb-6">
              <p className="text-body-small text-on-surface-variant">
                <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                You will no longer have access to this clinic's resources and appointments.
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
                icon="logout"
                className="flex-1"
              >
                {isLoading ? 'Leaving...' : 'Leave'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
