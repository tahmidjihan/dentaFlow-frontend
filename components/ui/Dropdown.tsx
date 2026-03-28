'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({
  trigger,
  options,
  onSelect,
  align = 'left',
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      onSelect?.(option);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 min-w-[200px] bg-surface rounded-lg shadow-lg border border-outline-variant/10 overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    option.disabled
                      ? 'text-outline/40 cursor-not-allowed'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                  disabled={option.disabled}
                >
                  {option.icon && (
                    <span className="material-symbols-outlined text-base">
                      {option.icon}
                    </span>
                  )}
                  <span className="font-medium">{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
