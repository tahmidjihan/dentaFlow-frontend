'use client';

import { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminGuard from '@/components/AdminGuard';
import Button from '@/components/ui/Button';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useUsers, useUpdateUser, useDeleteUser } from '@/lib/hooks/use-users';
import { useToast } from '@/components/ui/Toast';
import type { Role } from '@/types/database';

export default function UsersPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: usersData, isLoading, error } = useUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const { success, error: showError, ToastContainer } = useToast();

  const users = (usersData as any[]) || [];

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
                  Manage user accounts, roles, and permissions across the
                  platform.
                </p>
              </div>
            </div>
          </header>

          {/* Users Table Container */}
          <section className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
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
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <tr
                        key={user.id}
                        className='hover:bg-surface-container-low/20 transition-colors group'
                        onMouseEnter={() => setHoveredRow(user.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className='px-8 py-6'>
                          <div className='flex items-center gap-3'>
                            {user.image ? (
                              <img
                                className='w-10 h-10 rounded-full object-cover'
                                src={user.image}
                                alt={user.name}
                              />
                            ) : (
                              <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container'>
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
                        <td className='px-8 py-6'>
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value as Role)
                            }
                            className='px-3 py-1 rounded-lg bg-surface-container-low border border-outline-variant/30 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer'
                          >
                            <option value='USER'>User</option>
                            <option value='DOCTOR'>Doctor</option>
                            <option value='ADMIN'>Admin</option>
                          </select>
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm text-secondary'>
                            {user.emailVerified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm text-secondary'>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </td>
                        <td className='px-8 py-6'>
                          <span className='text-sm text-outline'>
                            {user.updatedAt
                              ? new Date(user.updatedAt).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </td>
                        <td className='px-8 py-6 text-right'>
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
                              className='bg-error/10 hover:bg-error hover:text-white text-error text-[11px] font-bold px-4 py-1.5 rounded transition-all disabled:opacity-50'
                            >
                              {deleteUserMutation.isPending
                                ? 'Deleting...'
                                : 'Delete'}
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
                            There are no users in the system.
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
                Showing{' '}
                <span className='text-on-surface font-bold'>
                  {users.length}
                </span>{' '}
                {users.length === 1 ? 'user' : 'users'}
              </span>
              <div className='flex items-center gap-2'>
                <button
                  className='w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-surface-container-high transition-all text-outline disabled:opacity-50'
                  disabled
                >
                  <span className='material-symbols-outlined'>
                    chevron_left
                  </span>
                </button>
                <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm shadow-primary/20'>
                  1
                </button>
                <button
                  className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface font-bold text-xs transition-all disabled:opacity-50'
                  disabled
                >
                  <span className='material-symbols-outlined'>
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Delete Confirmation Modal */}
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
