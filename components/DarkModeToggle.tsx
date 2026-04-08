'use client';

import { useDarkMode } from '@/lib/hooks/use-dark-mode';

export default function DarkModeToggle() {
  const { isDark, toggle, mounted } = useDarkMode();

  if (!mounted) {
    return (
      <button
        className='p-2 rounded-full hover:bg-surface-container-high transition-colors'
        aria-label='Toggle dark mode'
        disabled
      >
        <span className='material-symbols-outlined text-on-surface'>
          dark_mode
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className='p-2 rounded-full hover:bg-surface-container-high transition-colors'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className='material-symbols-outlined text-on-surface'>
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
