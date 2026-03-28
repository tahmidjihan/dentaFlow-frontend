'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';

interface Appointment {
  id: string;
  service: string;
  category: string;
  doctor: {
    name: string;
    initials: string;
  };
  date: string;
  status: 'paid' | 'pending' | 'completed';
  amount?: string;
}

interface StatCard {
  value: string;
  label: string;
  icon: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export default function Dashboard() {
  const stats: StatCard[] = [
    {
      value: '02',
      label: 'Upcoming Visits',
      icon: 'event_available',
      variant: 'default',
    },
    {
      value: 'Root Canal',
      label: 'Last Procedure',
      icon: 'medical_information',
      variant: 'secondary',
    },
    {
      value: '$120.00',
      label: 'Outstanding Balance',
      icon: 'account_balance_wallet',
      variant: 'primary',
    },
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      service: 'Root Canal',
      category: 'Major Restorative',
      doctor: { name: 'Dr. Smith', initials: 'DS' },
      date: 'Mar 30, 2024',
      status: 'paid',
    },
    {
      id: '2',
      service: 'Cleaning',
      category: 'Preventative Care',
      doctor: { name: 'Dr. Doe', initials: 'DD' },
      date: 'Apr 05, 2024',
      status: 'pending',
      amount: '$120.00',
    },
  ];

  const getStatStyles = (variant: string = 'default') => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-container text-on-primary-container';
      case 'secondary':
        return 'bg-surface-container-low';
      default:
        return 'bg-surface-container-lowest shadow-sm shadow-on-background/5 border border-outline-variant/10';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant='success'>Paid</Badge>;
      case 'pending':
        return <Badge variant='warning'>Pending</Badge>;
      case 'completed':
        return <Badge variant='info'>Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <main className='pt-32 pb-20 px-8 max-w-screen-2xl mx-auto min-h-screen'>
        {/* Header Section */}
        <header className='mb-16'>
          <p className='font-label text-xs uppercase tracking-widest text-secondary mb-3'>
            Welcome back
          </p>
          <h1 className='font-headline text-5xl font-extrabold tracking-tighter text-on-background max-w-2xl'>
            Your Health, <span className='text-primary'>Simplified.</span>
          </h1>
        </header>

        {/* Stats Grid (Bento Style) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-48 ${getStatStyles(stat.variant)}`}
            >
              <span
                className={`material-symbols-outlined text-3xl ${stat.variant === 'primary' ? '' : stat.variant === 'secondary' ? 'text-secondary' : 'text-primary'}`}
                style={
                  stat.variant === 'primary'
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                {stat.icon}
              </span>
              <div>
                <p className='text-4xl font-headline font-bold text-on-background'>
                  {stat.value}
                </p>
                <p className='font-label text-xs uppercase tracking-widest text-secondary'>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className='space-y-12'>
          <div className='flex justify-between items-end'>
            <h2 className='font-headline text-2xl font-bold tracking-tight text-on-background'>
              Appointment History
            </h2>
            <div className='flex gap-4'>
              <button className='flex items-center gap-2 text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-colors'>
                <span className='material-symbols-outlined text-sm'>
                  filter_list
                </span>
                Filter
              </button>
              <button className='flex items-center gap-2 text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-colors'>
                <span className='material-symbols-outlined text-sm'>
                  download
                </span>
                Export
              </button>
            </div>
          </div>

          {/* Custom Table Component */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align='right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} hoverable>
                  <TableCell>
                    <p className='font-headline font-semibold text-on-background'>
                      {appointment.service}
                    </p>
                    <p className='text-xs text-secondary'>
                      {appointment.category}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${appointment.status === 'paid' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-secondary-container text-on-secondary-container'}`}
                      >
                        {appointment.doctor.initials}
                      </div>
                      <p className='text-sm font-medium text-on-background'>
                        {appointment.doctor.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className='text-sm text-secondary'>
                    {appointment.date}
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell align='right'>
                    {appointment.status === 'paid' ? (
                      <button className='text-xs font-label uppercase tracking-widest text-primary font-bold hover:underline decoration-primary/30 underline-offset-4'>
                        View Receipt
                      </button>
                    ) : (
                      <Button size='sm' variant='outline'>
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
