'use client';

import React, { useEffect, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const typeStyles: Record<ToastType, { bg: string; icon: string; border: string }> = {
  success: {
    bg: 'bg-primary/10',
    icon: 'check_circle',
    border: 'border-primary/20',
  },
  error: {
    bg: 'bg-error/10',
    icon: 'error',
    border: 'border-error/20',
  },
  warning: {
    bg: 'bg-secondary/10',
    icon: 'warning',
    border: 'border-secondary/20',
  },
  info: {
    bg: 'bg-surface-container-high',
    icon: 'info',
    border: 'border-outline-variant/20',
  },
};

export default function Toast({
  id,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  action,
}: ToastProps) {
  const styles = typeStyles[type];

  const handleClose = useCallback(() => {
    onClose(id);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3
        bg-surface-container-lowest border-l-4 ${styles.border}
        rounded-lg shadow-lg shadow-on-surface/10
        animate-slide-in-right
        min-w-[300px] max-w-md
      `}
      role="alert"
    >
      <span className={`material-symbols-filled text-[20px] ${type === 'success' ? 'text-primary' : type === 'error' ? 'text-error' : type === 'warning' ? 'text-secondary' : 'text-on-surface-variant'}`}>
        {styles.icon}
      </span>
      
      <p className="flex-1 font-body text-sm font-medium text-on-surface">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="font-label text-xs font-semibold text-primary hover:underline"
        >
          {action.label}
        </button>
      )}

      <button
        onClick={handleClose}
        className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors"
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}

// Toast Container Component
export interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function ToastContainer({
  toasts,
  onRemove,
  position = 'top-right',
}: ToastContainerProps) {
  const positionStyles: Record<string, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div
      className={`fixed z-[100] flex flex-col gap-2 ${positionStyles[position]}`}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onRemove} />
      ))}
    </div>
  );
}

// Toast Hook
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = useCallback((
    message: string,
    type: ToastType = 'info',
    options?: { duration?: number; action?: { label: string; onClick: () => void } }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = {
      id,
      message,
      type,
      duration: options?.duration ?? 5000,
      onClose: () => removeToast(id),
      action: options?.action,
    };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    return addToast(message, 'success', options);
  }, [addToast]);

  const error = useCallback((message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    return addToast(message, 'error', options);
  }, [addToast]);

  const warning = useCallback((message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    return addToast(message, 'warning', options);
  }, [addToast]);

  const info = useCallback((message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    return addToast(message, 'info', options);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    ToastContainer: (props: Omit<ToastContainerProps, 'toasts' | 'onRemove'>) => (
      <ToastContainer toasts={toasts} onRemove={removeToast} {...props} />
    ),
  };
}

// Add CSS animation for toast
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
}
