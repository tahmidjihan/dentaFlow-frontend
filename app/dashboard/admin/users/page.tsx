'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import Button from '@/components/ui/Button';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'DOCTOR' | 'ADMIN';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
  lastActive: string;
  avatar?: string;
  initials?: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Eleanor Maxwell',
    email: 'eleanor.maxwell@email.com',
    role: 'USER',
    status: 'Active',
    joinedDate: 'Jan 15, 2024',
    lastActive: '2 hours ago',
    initials: 'EM',
  },
  {
    id: '2',
    name: 'Dr. Julian Vance',
    email: 'julian.vance@dentaflow.com',
    role: 'DOCTOR',
    status: 'Active',
    joinedDate: 'Dec 01, 2023',
    lastActive: '5 minutes ago',
    initials: 'JV',
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    email: 'marcus.thorne@email.com',
    role: 'USER',
    status: 'Active',
    joinedDate: 'Feb 20, 2024',
    lastActive: '1 day ago',
    initials: 'MT',
  },
  {
    id: '4',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@dentaflow.com',
    role: 'DOCTOR',
    status: 'Pending',
    joinedDate: 'Oct 20, 2024',
    lastActive: 'Never',
    initials: 'SC',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@dentaflow.com',
    role: 'ADMIN',
    status: 'Active',
    joinedDate: 'Jan 01, 2023',
    lastActive: 'Now',
    initials: 'AU',
  },
  {
    id: '6',
    name: 'Tobias Hart',
    email: 'tobias.hart@email.com',
    role: 'USER',
    status: 'Suspended',
    joinedDate: 'Mar 10, 2024',
    lastActive: '30 days ago',
    initials: 'TH',
  },
];

const getRoleBadgeStyles = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-primary text-on-primary';
    case 'DOCTOR':
      return 'bg-secondary-container text-on-secondary-container';
    case 'USER':
      return 'bg-surface-container-high text-outline';
    default:
      return 'bg-outline text-on-surface';
  }
};

const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-primary/10 text-primary';
    case 'Suspended':
      return 'bg-error/10 text-error';
    case 'Pending':
      return 'bg-secondary-container text-on-secondary-container';
    default:
      return 'bg-outline text-on-surface';
  }
};

export default function UsersPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'USER' | 'DOCTOR' | 'ADMIN'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Suspended' | 'Pending'>('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: string, newRole: 'USER' | 'DOCTOR' | 'ADMIN') => {
    console.log(`Changing user ${userId} role to ${newRole}`);
    setEditingUser(null);
  };

  const handleStatusChange = (userId: string, newStatus: 'Active' | 'Suspended') => {
    console.log(`Changing user ${userId} status to ${newStatus}`);
  };

  return (
    <DashboardWrapper role="ADMIN" mobileTitle="Users">
      <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
        {/* Header */}
        <header className='mb-12'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            User Management
          </p>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
                All Users
              </h1>
              <p className='text-secondary mt-2 max-w-xl'>
                Manage user accounts, roles, and permissions across the platform.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' icon='download'>
                Export
              </Button>
              <Button icon='person_add'>
                Add User
              </Button>
            </div>
          </div>
        </header>

        {/* Users Table Container */}
        <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
          {/* Table Header with Search and Filters */}
          <div className='p-6 border-b border-outline-variant/10 bg-surface-container-low/30'>
            <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
              {/* Search */}
              <div className='relative w-full lg:w-[300px]'>
                <span className='material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline'>
                  search
                </span>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search users...'
                  className='w-full bg-surface-container-low/50 border-none rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/60'
                />
              </div>

              {/* Filters */}
              <div className='flex gap-2 flex-wrap'>
                {/* Role Filter */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Roles</option>
                  <option value='USER'>User</option>
                  <option value='DOCTOR'>Doctor</option>
                  <option value='ADMIN'>Admin</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className='px-4 py-2.5 rounded-lg bg-surface-container-low border-none text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                >
                  <option value='all'>All Status</option>
                  <option value='Active'>Active</option>
                  <option value='Suspended'>Suspended</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className='px-6 py-3 bg-surface-container-low/10 border-b border-outline-variant/5'>
            <span className='text-xs text-outline font-medium'>
              Showing <span className='text-on-surface font-bold'>{filteredUsers.length}</span>{' '}
              {filteredUsers.length === 1 ? 'user' : 'users'}
              {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') && (
                <span> filtered</span>
              )}
            </span>
          </div>

          {/* Users Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-surface-container-low/50'>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    User
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Role
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Status
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Joined
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline'>
                    Last Active
                  </th>
                  <th className='px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-outline-variant/5'>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className='hover:bg-surface-container-low/20 transition-colors group'
                      onMouseEnter={() => setHoveredRow(user.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-3'>
                          {user.avatar ? (
                            <img
                              className='w-10 h-10 rounded-full object-cover'
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
                              {user.initials}
                            </div>
                          )}
                          <div>
                            <span className='text-sm font-semibold text-on-surface block'>
                              {user.name}
                            </span>
                            <span className='text-[11px] text-outline'>{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        {editingUser === user.id ? (
                          <select
                            value={selectedRole}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'DOCTOR' | 'ADMIN')}
                            onBlur={() => setEditingUser(null)}
                            autoFocus
                            className='px-3 py-1 rounded-lg bg-surface-container-low border border-outline-variant/30 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                          >
                            <option value='USER'>User</option>
                            <option value='DOCTOR'>Doctor</option>
                            <option value='ADMIN'>Admin</option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeStyles(user.role)}`}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyles(user.status)}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-secondary'>{user.joinedDate}</span>
                      </td>
                      <td className='px-8 py-6'>
                        <span className='text-sm text-outline'>{user.lastActive}</span>
                      </td>
                      <td className='px-8 py-6 text-right'>
                        <div
                          className={`flex justify-end gap-2 transition-opacity ${
                            hoveredRow === user.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {user.status === 'Active' ? (
                            <button
                              onClick={() => handleStatusChange(user.id, 'Suspended')}
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(user.id, 'Active')}
                              className='bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                            >
                              Activate
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingUser(user.id);
                              setSelectedRole(user.role);
                            }}
                            className='bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-outline text-[11px] font-bold px-4 py-1.5 rounded transition-all'
                          >
                            Edit Role
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='px-8 py-16 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
                          <span className='material-symbols-outlined text-3xl text-outline'>
                            person_search
                          </span>
                        </div>
                        <h3 className='font-headline text-xl font-bold text-on-surface mb-2'>
                          No users found
                        </h3>
                        <p className='text-body-medium text-secondary max-w-md'>
                          {searchQuery
                            ? `No users match your search "${searchQuery}".`
                            : 'No users match the selected filters.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className='p-6 flex items-center justify-between bg-surface-container-low/10'>
            <span className='text-xs text-outline font-medium'>
              Showing <span className='text-on-surface font-bold'>1-{filteredUsers.length}</span> of{' '}
              <span className='text-on-surface font-bold'>{users.length}</span> users
            </span>
            <div className='flex items-center gap-2'>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline'>
                <span className='material-symbols-outlined'>chevron_left</span>
              </button>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm shadow-primary/20'>
                1
              </button>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all'>
                2
              </button>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all'>
                3
              </button>
              <button className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline'>
                <span className='material-symbols-outlined'>chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </DashboardWrapper>
  );
}
