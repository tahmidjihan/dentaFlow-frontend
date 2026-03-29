'use client';

import React, { useEffect, useCallback } from 'react';

interface EditModalBaseProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  footer?: React.ReactNode;
}

export default function EditModalBase({
  isOpen,
  title,
  subtitle,
  onClose,
  children,
  isLoading = false,
  footer,
}: EditModalBaseProps) {
  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-surface border-b border-outline-variant/10 px-6 py-5 flex items-center justify-between flex-shrink-0">
            <div>
              <h2
                id="modal-title"
                className="font-headline font-bold text-2xl text-on-surface"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-body-small text-on-surface-variant mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-surface-container-high rounded-full transition-colors disabled:opacity-50"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                close
              </span>
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1">
            <div className="px-6 py-6">
              {children}
            </div>
          </div>

          {/* Footer - Sticky */}
          {footer && (
            <div className="sticky bottom-0 bg-surface border-t border-outline-variant/10 px-6 py-4 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
