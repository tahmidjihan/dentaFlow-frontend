import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-surface-container-lowest',
  elevated: 'bg-surface-container-lowest shadow-[0_40px_80px_-15px_rgba(27,28,27,0.04)]',
  outlined: 'bg-surface-container-lowest border border-outline-variant/10',
};

export function Card({ children, className = '', variant = 'elevated' }: CardProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-outline-variant/10 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-outline-variant/10 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
