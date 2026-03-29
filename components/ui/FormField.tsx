import React from 'react';

export interface FormFieldProps {
  label: string;
  error?: string;
  icon?: string;
  children: React.ReactNode;
  helperText?: string;
  required?: boolean;
}

export default function FormField({
  label,
  error,
  icon,
  children,
  helperText,
  required = false,
}: FormFieldProps) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
        {icon && (
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-error ml-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">error</span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-on-surface-variant ml-1">{helperText}</p>
      )}
    </div>
  );
}
