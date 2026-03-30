import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { notFound } from 'next/navigation';
import { getClinicById } from '@/lib/APICalls/clinics.api';
import { getDoctors } from '@/lib/APICalls/doctors.api';
import type { Clinic } from '@/types/database';
import type { User } from '@/types/database';

interface ClinicPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { id } = await params;

  let clinic: Clinic | null = null;
  let practitioners: User[] = [];

  try {
    const [clinicData, doctorsData] = await Promise.all([
      getClinicById(id),
      getDoctors(),
    ]);
    clinic = clinicData as Clinic;
    // Filter doctors by clinic ID
    practitioners = (doctorsData as User[]).filter((doctor) => doctor.clinicId === id);
  } catch (error) {
    console.error('Failed to fetch clinic:', error);
  }

  if (!clinic) {
    notFound();
  }

  return (
    <>
      <main className='pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen'>
        <div className='flex flex-col lg:flex-row gap-16 lg:gap-24'>
          {/* Left Side: Clinic Details (Editorial Layout) */}
          <div className='lg:w-5/12 space-y-12'>
            <header className='space-y-6'>
              <span className='text-primary font-label uppercase tracking-widest text-xs font-semibold'>
                {clinic.status === 'open' ? 'Open' : 'Closed'}
              </span>
              <h1 className='text-5xl lg:text-6xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface'>
                {clinic.name}
              </h1>
              <p className='text-secondary text-lg max-w-md font-light leading-relaxed'>
                {clinic.location}
              </p>
            </header>

            <div className='grid grid-cols-1 gap-10'>
              {/* Contact Information */}
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    location_on
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Location
                    </p>
                    <p className='text-secondary font-light'>
                      {clinic.location}
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    mail
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Email
                    </p>
                    <p className='text-secondary font-light'>{clinic.email}</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <span className='material-symbols-outlined text-primary mt-1'>
                    call
                  </span>
                  <div className='space-y-1'>
                    <p className='text-on-surface font-headline font-bold text-lg'>
                      Phone
                    </p>
                    <p className='text-secondary font-light'>{clinic.phone}</p>
                  </div>
                </div>
              </div>

              {/* Visual Anchor */}
              <div className='relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm bg-surface-container-low flex items-center justify-center'>
                <div className='text-center space-y-2'>
                  <span className='material-symbols-outlined text-6xl text-primary opacity-50'>
                    business
                  </span>
                  <p className='text-secondary font-light'>
                    Clinic image coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form (Surface Stacking Logic) */}
          <div className='lg:w-7/12'>
            <div className='bg-surface-container-low p-10 lg:p-16 rounded-xl relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/10 rounded-full blur-3xl -mr-32 -mt-32'></div>
              <div className='relative z-10'>
                <h2 className='text-3xl font-headline font-bold tracking-tight mb-8 text-on-surface'>
                  Secure Your Session
                </h2>
                <BookingForm
                  practitioners={practitioners.map((p) => ({
                    id: p.id,
                    name: p.name,
                    specialty: 'Practitioner',
                  }))}
                  deposit={50}
                />

                {/* Trust Markers */}
                <div className='mt-12 flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700'>
                  <span className='text-[10px] font-label uppercase tracking-[0.2em] font-bold text-on-surface-variant'>
                    Secure checkout via Stripe
                  </span>
                  <div className='flex gap-4'>
                    <span className='material-symbols-outlined text-sm'>
                      lock
                    </span>
                    <span className='material-symbols-outlined text-sm'>
                      verified_user
                    </span>
                    <span className='material-symbols-outlined text-sm'>
                      shield
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Context / Map Placeholder */}
            <div className='mt-8 rounded-xl overflow-hidden bg-surface-container-low h-48 relative flex items-center justify-center'>
              <div className='text-center space-y-2'>
                <span className='material-symbols-outlined text-4xl text-primary opacity-50'>
                  map
                </span>
                <p className='text-secondary font-light text-sm'>
                  Map view coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
