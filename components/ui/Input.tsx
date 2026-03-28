import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  error?: string;
  helperText?: string;
  onIconClick?: () => void;
}

export default function Input({
  label,
  icon,
  iconPosition = 'right',
  error,
  helperText,
  className = '',
  id,
  onIconClick,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '');

  const baseStyles = `
    w-full bg-surface-container-low border-none 
    focus:ring-2 focus:ring-primary/20 
    py-4 px-5 rounded-lg 
    text-on-surface placeholder:text-outline/50 
    transition-all duration-300 font-body
    ${icon ? 'pr-12' : ''}
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest ml-1"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={baseStyles}
          id={inputId}
          {...props}
        />
        {icon && onIconClick ? (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-outline transition-colors"
          >
            <span className="material-symbols-outlined">{icon}</span>
          </button>
        ) : icon ? (
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40">
            {icon}
          </span>
        ) : null}
      </div>
      {error && (
        <p className="text-xs text-error ml-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-on-surface-variant ml-1">{helperText}</p>
      )}
    </div>
  );
}
