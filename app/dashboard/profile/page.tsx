'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/hooks/use-auth';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user, isLoading } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Profile updated successfully!');
    setIsEditing(false);
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return { label: 'Administrator', color: 'bg-error/10 text-error' };
      case 'DOCTOR':
        return { label: 'Doctor', color: 'bg-primary/10 text-primary' };
      default:
        return { label: 'Patient', color: 'bg-secondary/10 text-secondary' };
    }
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className='min-h-screen bg-surface py-12 px-4 md:px-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tighter mb-2'>
            My Profile
          </h1>
          <p className='text-on-surface-variant'>
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden'>
          {/* Profile Header */}
          <div className='p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-outline-variant/10'>
            <div className='flex items-center gap-6'>
              <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline text-3xl font-bold'>
                {(user.name || 'U').slice(0, 2).toUpperCase()}
              </div>
              <div className='flex-1'>
                <h2 className='font-headline text-xl md:text-2xl font-bold text-on-surface'>
                  {user.name}
                </h2>
                <p className='text-on-surface-variant'>{user.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className='p-6 md:p-8 space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='font-headline text-lg font-bold text-on-surface'>
                Personal Information
              </h3>
              {!isEditing ? (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                  icon='edit'
                >
                  Edit
                </Button>
              ) : (
                <div className='flex gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name || '',
                        email: user.email || '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={handleSave}
                    loading={isSaving}
                    icon='save'
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-on-surface mb-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-on-surface mb-1'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                />
              </div>
            </div>

            {/* Account Information (Read-only) */}
            <div className='pt-6 border-t border-outline-variant/10'>
              <h3 className='font-headline text-lg font-bold text-on-surface mb-4'>
                Account Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 bg-surface-container-low rounded-lg'>
                  <p className='text-xs text-on-surface-variant uppercase tracking-wider mb-1'>
                    Account Type
                  </p>
                  <p className='font-semibold text-on-surface'>
                    {roleBadge.label}
                  </p>
                </div>
                <div className='p-4 bg-surface-container-low rounded-lg'>
                  <p className='text-xs text-on-surface-variant uppercase tracking-wider mb-1'>
                    Member Since
                  </p>
                  <p className='font-semibold text-on-surface'>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
