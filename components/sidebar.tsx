import React from 'react';

interface Props {}

function Sidebar(props: Props) {
  const {} = props;

  return (
    <aside className='w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col fixed h-full z-40 hidden md:flex'>
      <div className='px-8 py-8'>
        <span className='text-2xl font-extrabold tracking-tighter text-on-background'>
          DentaFlow
        </span>
      </div>
      <nav className='flex-1 px-4 space-y-2 mt-4'>
        <a
          className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-lg transition-all border-l-2 border-primary'
          href='#'
        >
          <span className='material-symbols-outlined'>calendar_today</span>
          Appointments
        </a>
        <a
          className='flex items-center gap-3 px-4 py-3 text-sm font-medium text-secondary hover:bg-surface-container-highest rounded-lg transition-all group'
          href='#'
        >
          <span className='material-symbols-outlined text-outline'>group</span>
          Users
        </a>
        <a
          className='flex items-center gap-3 px-4 py-3 text-sm font-medium text-secondary hover:bg-surface-container-highest rounded-lg transition-all group'
          href='#'
        >
          <span className='material-symbols-outlined text-outline'>
            analytics
          </span>
          Dashboard
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
