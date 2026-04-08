'use client';

import { useState, useMemo } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import Button from '@/components/ui/Button';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useUsers, useUpdateUser, useDeleteUser } from '@/lib/hooks/use-users';
import { useToast } from '@/components/ui/Toast';
import type { Role } from '@/types/database';

const ITEMS_PER_PAGE = 10;
const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'USER', label: 'User' },
  { value: 'DOCTOR', label: 'Doctor' },
  { value: 'ADMIN', label: 'Admin' },
];
const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'verified', label: 'Verified' },
  { value: 'unverified', label: 'Unverified' },
];

export default function UsersPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: usersData, isLoading, error } = useUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const { success, error: showError, ToastContainer } = useToast();

  const users = (usersData as any[]) || [];

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u: any) =>
          u.name?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query),
      );
    }

    if (roleFilter) {
      result = result.filter((u: any) => u.role === roleFilter);
    }

    if (statusFilter === 'verified') {
      result = result.filter((u: any) => u.emailVerified);
    } else if (statusFilter === 'unverified') {
      result = result.filter((u: any) => !u.emailVerified);
    }

    return result;
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (userId: string, newRole: Role) => {
    updateUserMutation.mutate(
      { id: userId, data: { role: newRole } },
      {
        onSuccess: () => {
          success('User role updated successfully');
        },
        onError: () => {
          showError('Failed to update user role');
        },
      },
    );
  };

  const handleDeleteUser = () => {
    if (!deletingUser) return;

    deleteUserMutation.mutate(deletingUser.id, {
      onSuccess: () => {
        success('User deleted successfully');
        setDeletingUser(null);
      },
      onError: () => {
        showError('Failed to delete user');
      },
    });
  };

  if (isLoading) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Users'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  if (error) {
    return (
      <DashboardWrapper role='ADMIN' mobileTitle='Users'>
        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          <div className='text-center text-error'>
            <p>Failed to load users. Please try again.</p>
          </div>
        </main>
      </DashboardWrapper>
    );
  }

  const userToDelete = deletingUser;

  return (
    <AdminGuard>
      <DashboardWrapper role='ADMIN' mobileTitle='Users'>
        <ToastContainer position='top-right' />

        <main className='flex-1 md:ml-64 p-4 md:p-8 lg:p-12'>
          {/* Header */}
          <header className='mb-8'>
            <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
              User Management
            </p>
            <h1 className='font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface max-w-2xl'>
              All Users
            </h1>
          </header>

          {/* Filters */}
          <div className='mb-6 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex flex-col md:flex-row gap-3'>
            <div className='flex-1 relative'>
              <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm'>
                search
              </span>
              <input
                type='text'
                placeholder='Search users...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className='px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className='px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Users Table Container */}
          <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-surface-container-low/50'>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      User
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Role
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Status
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline'>
                      Joined
                    </th>
                    <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline text-right'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-outline-variant/5'>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user: any) => (
                      <tr
                        key={user.id}
                        className='hover:bg-surface-container-low/20 transition-colors group'
                        onMouseEnter={() => setHoveredRow(user.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-3'>
                            {user.image ? (
                              <img
                                className='w-9 h-9 rounded-full object-cover'
                                src={user.image}
                                alt={user.name}
                              />
                            ) : (
                              <div className='w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container'>
                                {(user.name || '')
                                  .split(' ')
                                  .map((n: string) => n[0])
                                  .join('')
                                  .slice(0, 2)}
                              </div>
                            )}
                            <div>
                              <span className='text-sm font-semibold text-on-surface block'>
                                {user.name}
                              </span>
                              <span className='text-[11px] text-outline'>
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value as Role)
                            }
                            className='px-2 py-1 rounded bg-surface-container-low border border-outline-variant/30 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                          >
                            <option value='USER'>User</option>
                            <option value='DOCTOR'>Doctor</option>
                            <option value='ADMIN'>Admin</option>
                          </select>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-sm text-secondary'>
                            {user.emailVerified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-sm text-secondary'>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <div
                            className={`flex justify-end gap-2 transition-opacity ${
                              hoveredRow === user.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                          >
                            <button
                              onClick={() =>
                                setDeletingUser({
                                  id: user.id,
                                  name: user.name,
                                })
                              }
                              disabled={deleteUserMutation.isPending}
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-3 py-1 rounded transition-all disabled:opacity-50'
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='px-6 py-16 text-center'>
                        <div className='flex flex-col items-center justify-center'>
                          <span className='material-symbols-outlined text-4xl text-outline mb-3'>
                            person_search
                          </span>
                          <h3 className='font-headline text-lg font-bold text-on-surface mb-1'>
                            No users found
                          </h3>
                          <p className='text-sm text-secondary'>
                            Try adjusting your search or filter criteria.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div className='p-4 flex items-center justify-between bg-surface-container-low/10'>
                <span className='text-xs text-outline'>
                  Showing{' '}
                  <span className='text-on-surface font-bold'>
                    {paginatedUsers.length}
                  </span>{' '}
                  of {filteredUsers.length} users
                </span>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 hover:bg-surface-container-high transition-all text-on-surface disabled:opacity-50'
                  >
                    <span className='material-symbols-outlined text-sm'>
                      chevron_left
                    </span>
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? 'bg-primary text-on-primary'
                          : 'hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 hover:bg-surface-container-high transition-all text-on-surface disabled:opacity-50'
                  >
                    <span className='material-symbols-outlined text-sm'>
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        <DeleteConfirmModal
          isOpen={!!userToDelete}
          entityName={userToDelete?.name || ''}
          entityType='User'
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDeleteUser}
          isLoading={deleteUserMutation.isPending}
        />
      </DashboardWrapper>
    </AdminGuard>
  );
}
