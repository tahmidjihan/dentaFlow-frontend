import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'default';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-primary/10 text-primary',
  warning: 'bg-secondary-container text-on-secondary-container',
  info: 'bg-surface-container text-on-surface',
  default: 'bg-surface-container-high text-on-surface-variant',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5 rounded-full 
    font-bold uppercase tracking-wider
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  return (
    <span className={baseStyles}>
      {icon && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
      {children}
    </span>
  );
}
