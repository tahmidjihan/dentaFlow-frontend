'use client';

import Link from 'next/link';
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
      {/* Top Navigation Bar */}
      <nav className='fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm shadow-on-surface/5'>
        <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
          <Link href="/" className='text-2xl font-bold tracking-tighter text-on-surface font-headline'>
            DentaWave
          </Link>
          <div className='hidden md:flex gap-8 items-center'>
            <Link
              href='/'
              className="font-headline tracking-tight text-sm font-medium text-secondary hover:text-on-surface transition-colors"
            >
              Home
            </Link>
            <Link
              href='/clinics'
              className="font-headline tracking-tight text-sm font-medium text-secondary hover:text-on-surface transition-colors"
            >
              Clinics
            </Link>
            <Link
              href='/dashboard'
              className="font-headline tracking-tight text-sm font-medium text-primary font-semibold border-b-2 border-primary pb-1"
            >
              Dashboard
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <Button size='sm' variant='primary'>
              Book Appointment
            </Button>
            <div className='w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20 flex items-center justify-center'>
              <span className='material-symbols-outlined text-on-surface-variant'>
                person
              </span>
            </div>
          </div>
        </div>
      </nav>

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
                  <TableCell>
                    {getStatusBadge(appointment.status)}
                  </TableCell>
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

        {/* Featured Section (Bento Bottom) */}
        <section className='mt-24 grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='relative overflow-hidden group'>
            <div className='w-full aspect-video bg-surface-container-high flex items-center justify-center'>
              <span className='material-symbols-outlined text-6xl text-outline/30'>
                local_hospital
              </span>
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent p-8 flex flex-col justify-end'>
              <h3 className='font-headline text-2xl font-bold text-on-background mb-2'>
                Explore Our Clinic
              </h3>
              <p className='text-secondary text-sm mb-4'>
                Experience the Clinical Sanctuary in the heart of the city.
              </p>
              <Link
                href='/clinics'
                className='text-xs font-label font-bold uppercase tracking-widest text-primary flex items-center gap-2'
              >
                View Virtual Tour
                <span className='material-symbols-outlined text-sm'>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-center space-y-6'>
            <p className='font-label text-xs uppercase tracking-widest text-primary font-bold'>
              Health Tips
            </p>
            <h3 className='font-headline text-3xl font-extrabold tracking-tight'>
              The intersection of biology and design.
            </h3>
            <p className='text-secondary leading-relaxed'>
              Our doctors believe that a calm environment leads to better health
              outcomes. Explore our curated patient resources to prepare for your
              next visit.
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div className='p-4 bg-surface-container-low'>
                <p className='font-headline font-bold text-lg'>01</p>
                <p className='text-xs text-secondary'>Pre-Op Guide</p>
              </div>
              <div className='p-4 bg-surface-container-low'>
                <p className='font-headline font-bold text-lg'>02</p>
                <p className='text-xs text-secondary'>Aftercare Plan</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='w-full py-12 px-8 mt-auto bg-surface border-t border-on-surface/10'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto'>
          <div className='flex flex-col gap-2'>
            <span className='font-headline font-bold text-on-surface'>
              DentaWave
            </span>
            <p className='font-body text-xs uppercase tracking-widest text-secondary/50'>
              © 2026 DentaWave. All rights reserved.
            </p>
          </div>
          <div className='flex gap-8'>
            <Link
              href='/privacy'
              className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-all underline decoration-primary/30 underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-all underline decoration-primary/30 underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href='/contact'
              className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-all underline decoration-primary/30 underline-offset-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
