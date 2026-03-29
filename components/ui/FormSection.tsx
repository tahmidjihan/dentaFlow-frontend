import React from 'react';

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  children,
  className = '',
}: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-label text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
