'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { ClinicExtended } from '@/types/database';

// Props for dashboard clinic management
interface DashboardClinicCardProps {
  clinic: ClinicExtended;
  membershipStatus?: 'OWNER' | 'MEMBER' | 'AVAILABLE';
  onJoin?: (clinicId: string) => void;
  onLeave?: (clinicId: string) => void;
  onDelete?: (clinicId: string) => void;
  isLoading?: boolean;
  mode?: 'dashboard';
}

// Props for public clinic listing
interface PublicClinicCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialty: string;
  image: string;
  mode: 'public';
}

type ClinicCardProps = DashboardClinicCardProps | PublicClinicCardProps;

export default function ClinicCard(props: ClinicCardProps) {
  // Public mode rendering
  if ('mode' in props && props.mode === 'public') {
    const { id, name, address, phone, specialty, image } = props;

    return (
      <a href={`/clinics/${id}`} className='block group'>
        <Card
          variant='elevated'
          className='overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
        >
          {/* Image */}

          {/* Content */}
          <CardContent className='space-y-3'>
            <div>
              <h3 className='font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors'>
                {name}
              </h3>
              <p className='text-body-small text-primary mt-1 font-semibold'>
                {specialty}
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <span className='material-symbols-outlined text-on-surface-variant text-sm mt-0.5'>
                location_on
              </span>
              <p className='text-body-small text-on-surface-variant'>
                {address}
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                phone
              </span>
              <p className='text-body-small text-on-surface-variant'>{phone}</p>
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }

  // Dashboard mode rendering
  const {
    clinic,
    membershipStatus = 'AVAILABLE',
    onJoin,
    onLeave,
    onDelete,
    isLoading = false,
  } = props as DashboardClinicCardProps;

  const getBadgeConfig = () => {
    switch (membershipStatus) {
      case 'OWNER':
        return { variant: 'warning' as const, label: 'Owner', icon: 'star' };
      case 'MEMBER':
        return {
          variant: 'success' as const,
          label: 'Member',
          icon: 'check_circle',
        };
      default:
        return {
          variant: 'info' as const,
          label: 'Available',
          icon: 'add_circle',
        };
    }
  };

  const badgeConfig = getBadgeConfig();
  const isActionDisabled = isLoading;

  const handleJoin = () => {
    if (onJoin && !isActionDisabled) {
      onJoin(clinic.id);
    }
  };

  const handleLeave = () => {
    if (onLeave && !isActionDisabled) {
      onLeave(clinic.id);
    }
  };

  const handleDelete = () => {
    if (onDelete && !isActionDisabled) {
      onDelete(clinic.id);
    }
  };

  return (
    <Card
      variant='elevated'
      className='flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    >
      <CardContent className='flex-1 pb-4'>
        {/* Header with status badge */}
        <div className='flex items-start justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
              <span className='material-symbols-outlined text-primary text-2xl'>
                business
              </span>
            </div>
            <div>
              <h3 className='font-headline font-bold text-lg text-on-surface leading-tight'>
                {clinic.name}
              </h3>
              <p className='text-body-small text-on-surface-variant mt-0.5'>
                {clinic.specialty}
              </p>
            </div>
          </div>
          <Badge
            variant={badgeConfig.variant}
            size='sm'
            icon={badgeConfig.icon}
          >
            {badgeConfig.label}
          </Badge>
        </div>

        {/* Description */}
        {clinic.description && (
          <p className='text-body-medium text-on-surface-variant mb-4 line-clamp-2'>
            {clinic.description}
          </p>
        )}

        {/* Location */}
        <div className='flex items-start gap-2 mb-3'>
          <span className='material-symbols-outlined text-on-surface-variant text-sm mt-0.5'>
            location_on
          </span>
          <div className='text-body-small text-on-surface-variant'>
            <p>{clinic.address}</p>
            {clinic.addressLine2 && <p>{clinic.addressLine2}</p>}
            <p>
              {clinic.city}, {clinic.state && `${clinic.state} `}
              {clinic.postalCode}
            </p>
            <p>{clinic.country}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className='space-y-1 mb-4'>
          {clinic.phone && (
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                phone
              </span>
              <p className='text-body-small text-on-surface-variant'>
                {clinic.phone}
              </p>
            </div>
          )}
          {clinic.email && (
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-on-surface-variant text-sm'>
                mail
              </span>
              <p className='text-body-small text-on-surface-variant'>
                {clinic.email}
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className='flex items-center gap-4 pt-3 border-t border-outline-variant/10'>
          <div className='flex items-center gap-1.5'>
            <span className='material-symbols-outlined text-on-surface-variant text-sm'>
              group
            </span>
            <span className='text-body-small text-on-surface-variant'>
              {clinic.doctorCount}{' '}
              {clinic.doctorCount === 1 ? 'Doctor' : 'Doctors'}
            </span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='material-symbols-outlined text-on-surface-variant text-sm'>
              {clinic.status === 'open' ? 'check_circle' : 'cancel'}
            </span>
            <span className='text-body-small text-on-surface-variant capitalize'>
              {clinic.status}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className='pt-4'>
        {membershipStatus === 'AVAILABLE' && (
          <Button
            onClick={handleJoin}
            disabled={isActionDisabled}
            icon='add'
            className='w-full'
          >
            {isLoading ? 'Joining...' : 'Join Clinic'}
          </Button>
        )}

        {membershipStatus === 'MEMBER' && (
          <Button
            onClick={handleLeave}
            disabled={isActionDisabled}
            variant='outline'
            icon='logout'
            className='w-full'
          >
            {isLoading ? 'Leaving...' : 'Leave Clinic'}
          </Button>
        )}

        {membershipStatus === 'OWNER' && (
          <div className='flex gap-2 w-full'>
            <Button
              variant='secondary'
              icon='settings'
              className='flex-1'
              disabled={isActionDisabled}
            >
              Manage
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isActionDisabled}
              variant='outline'
              icon='delete'
              className='flex-1 text-error'
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
