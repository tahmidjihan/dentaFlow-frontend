'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function UserAvatar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const signOut = authClient.signOut;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const user = session?.user as {
    id: string;
    name: string;
    email: string;
    role?: 'USER' | 'ADMIN' | 'DOCTOR';
  } | null;

  const isAuthenticated = !!user;

  if (!isAuthenticated || !user) {
    return null;
  }

  // Get initials from user's name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(user.name);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div ref={dropdownRef} className='relative'>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
        type='button'
        aria-label='User menu'
      >
        <div className='flex items-center gap-3'>
          <span className='hidden md:block text-sm font-medium text-on-surface'>
            {user.name}
          </span>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary shadow-sm'>
            {initials}
          </div>
        </div>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className='absolute z-50 mt-2 right-0 min-w-[220px] bg-surface rounded-lg shadow-lg border border-outline-variant/10 overflow-hidden'>
          {/* User Info Header */}
          <div className='border-b border-outline-variant/10 px-4 py-3 bg-surface-container-high'>
            <p className='text-sm font-semibold text-on-surface'>{user.name}</p>
            <p className='text-xs text-on-surface/70 mt-0.5'>{user.email}</p>
            <div className='flex gap-2 mt-2'>
              {user.role === 'ADMIN' && (
                <span className='text-xs px-2 py-1 bg-primary-container text-on-primary rounded font-medium'>
                  Admin
                </span>
              )}
              {user.role === 'DOCTOR' && (
                <span className='text-xs px-2 py-1 bg-secondary-container text-on-secondary rounded font-medium'>
                  Doctor
                </span>
              )}
              {user.role === 'USER' && (
                <span className='text-xs px-2 py-1 bg-outline-variant text-on-surface rounded font-medium'>
                  User
                </span>
              )}
            </div>
          </div>
          {/* Logout Option */}
          <div className='py-1'>
            <button
              onClick={handleSignOut}
              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-high transition-colors'
              type='button'
            >
              <span className='material-symbols-outlined text-base'>
                logout
              </span>
              <span className='font-medium'>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
