'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  filled?: boolean;
  section?: 'main' | 'system';
}

export interface UserProfile {
  name: string;
  role: string;
  image: string;
}

export interface SidebarProps {
  navItems?: NavItem[];
  userProfile?: UserProfile;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/dashboard', icon: 'grid_view', section: 'main' },
  { label: 'Clinics', href: '/clinics', icon: 'apartment', section: 'main' },
  { label: 'Appointments', href: '/dashboard/doctor', icon: 'calendar_today', filled: true, section: 'main' },
  { label: 'Users', href: '/dashboard/users', icon: 'group', section: 'main' },
  { label: 'Dashboard', href: '/dashboard/analytics', icon: 'analytics', section: 'main' },
  { label: 'Admin Settings', href: '/dashboard/settings', icon: 'settings', section: 'system' },
];

const defaultUserProfile: UserProfile = {
  name: 'Dr. Sarah Chen',
  role: 'System Admin',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCXKtnRatLULAN9w361Silbvua0RCwcmExv5g05UsN4nU1vcKel73I8wMMv_gQ8rX5Tn7g5tY9-yiRuabDVLh-vIS7DPWwKGgVseQBcZBV063brrw6txf-H8k1Kll6Mq0G-waqZYEb3krEwt0cE7ZXeGiz7mWsuLNU9uQIR-t_YTdqVsHdaebM9JeF1jN1oDPD68B5zHln3OIpxZyRiJtjLhlqu_jGBX2nuSudJR3uSQ_XjT4elmlTQ-etZz-KBMcf7mfewv07JMV4',
};

export default function Sidebar({
  navItems = defaultNavItems,
  userProfile = defaultUserProfile,
  className = '',
}: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems = navItems.filter((item) => item.section !== 'system');
  const systemNavItems = navItems.filter((item) => item.section === 'system');

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col fixed h-full z-40 hidden md:flex ${className}`}
    >
      <div className='px-8 py-8'>
        <Link
          href='/'
          className='text-2xl font-extrabold tracking-tighter text-on-background'
        >
          DentaFlow
        </Link>
      </div>
      <nav className='flex-1 px-4 space-y-2 mt-4'>
        {mainNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all group ${
              isActive(item.href)
                ? 'text-primary bg-primary/5 border-l-2 border-primary'
                : 'text-secondary hover:bg-surface-container-highest'
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                isActive(item.href) || item.filled
                  ? ''
                  : 'text-outline'
              }`}
              style={{
                fontVariationSettings:
                  isActive(item.href) || item.filled
                    ? "'FILL' 1"
                    : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
        {systemNavItems.length > 0 && (
          <>
            <div className='pt-8 pb-4 px-4 text-[10px] uppercase tracking-widest text-outline font-bold'>
              System
            </div>
            {systemNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all group ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/5 border-l-2 border-primary'
                    : 'text-secondary hover:bg-surface-container-highest'
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive(item.href) ? '' : 'text-outline'
                  }`}
                  style={{
                    fontVariationSettings: isActive(item.href)
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>
      <div className='p-6 mt-auto'>
        <div className='bg-surface-container-lowest p-4 rounded-xl shadow-sm shadow-on-background/5 border border-outline-variant/10'>
          <div className='flex items-center gap-3'>
            <img
              className='w-10 h-10 rounded-full object-cover'
              src={userProfile.image}
              alt={userProfile.name}
            />
            <div>
              <p className='text-xs font-bold text-on-surface'>
                {userProfile.name}
              </p>
              <p className='text-[10px] text-outline'>{userProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
