'use client';

import { useState, useRef, useEffect } from 'react';
import { useClinics } from '@/lib/hooks/use-clinics';
import { useDoctors } from '@/lib/hooks/use-doctors';

interface Suggestion {
  id: string;
  text: string;
  icon: string;
  type: 'clinic' | 'doctor' | 'service';
}

interface AISearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function AISearchBar({
  onSearch,
  placeholder = 'Search clinics, doctors, services...',
}: AISearchBarProps) {
  const { data: clinics = [] } = useClinics();
  const { data: doctors = [] } = useDoctors();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Build suggestions from real API data
  useEffect(() => {
    const generated: Suggestion[] = [];

    // Add clinics as suggestions
    if (Array.isArray(clinics)) {
      clinics.forEach((clinic: any) => {
        if (clinic.name) {
          generated.push({
            id: `clinic-${clinic.id}`,
            text: clinic.name,
            icon: 'business',
            type: 'clinic',
          });
        }
      });
    }

    // Add doctors as suggestions
    if (Array.isArray(doctors)) {
      doctors.forEach((doctor: any) => {
        if (doctor.name) {
          generated.push({
            id: `doctor-${doctor.id}`,
            text: `${doctor.name} — ${doctor.specialty || 'Dentist'}`,
            icon: 'medical_services',
            type: 'doctor',
          });
        }
      });
    }

    // If no data yet, show generic service types based on specialties
    if (generated.length === 0) {
      const genericServices: Suggestion[] = [
        { id: 'svc-1', text: 'General Dentistry', icon: 'medical_services', type: 'service' },
        { id: 'svc-2', text: 'Orthodontics', icon: 'science', type: 'service' },
        { id: 'svc-3', text: 'Teeth Whitening', icon: 'brightness_1', type: 'service' },
        { id: 'svc-4', text: 'Dental Implants', icon: 'construction', type: 'service' },
        { id: 'svc-5', text: 'Pediatric Dentistry', icon: 'child_care', type: 'service' },
        { id: 'svc-6', text: 'Root Canal Treatment', icon: 'healing', type: 'service' },
      ];
      generated.push(...genericServices);
    }

    // Filter by query if provided
    if (query.trim().length > 0) {
      const lowerQuery = query.toLowerCase();
      const filtered = generated.filter((s) =>
        s.text.toLowerCase().includes(lowerQuery),
      );
      const ranked = filtered.sort((a, b) => {
        const aStarts = a.text.toLowerCase().startsWith(lowerQuery);
        const bStarts = b.text.toLowerCase().startsWith(lowerQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
      setSuggestions(ranked.slice(0, 5));
    } else {
      setSuggestions(generated.slice(0, 5));
    }
  }, [query, clinics, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    if (onSearch) onSearch(suggestion.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch && query.trim()) onSearch(query.trim());
  };

  return (
    <div ref={wrapperRef} className='relative w-full max-w-2xl'>
      <form onSubmit={handleSubmit}>
        <div className='relative'>
          <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant'>
            search
          </span>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className='w-full pl-12 pr-12 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm'
          />
          {query && (
            <button
              type='submit'
              className='absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container transition-colors'
            >
              <span className='material-symbols-outlined'>arrow_forward</span>
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg overflow-hidden z-50'>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className='w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high transition-colors text-left'
            >
              <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                {suggestion.icon}
              </span>
              <span className='text-sm text-on-surface flex-1'>
                {suggestion.text}
              </span>
              <span className='text-xs text-on-surface-variant uppercase px-2 py-0.5 rounded bg-surface-container-high'>
                {suggestion.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
