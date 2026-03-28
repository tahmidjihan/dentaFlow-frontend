import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import clinics from '@/data/clinics.json';
import { notFound } from 'next/navigation';

interface ClinicPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return clinics.map((clinic) => ({
    id: clinic.id,
  }));
}

export default async function ClinicPage({ params }: ClinicPageProps) {
  const { id } = await params;
  const clinic = clinics.find((c) => c.id === id);

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
                {clinic.tagline}
              </span>
              <h1 className='text-5xl lg:text-6xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface'>
                {clinic.name}
              </h1>
              <p className='text-secondary text-lg max-w-md font-light leading-relaxed'>
                {clinic.description}
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
                      {clinic.address.street}
                      <br />
                      {clinic.address.city}, {clinic.address.postcode}
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
                    <p className='text-secondary font-light'>
                      {clinic.contact.email}
                    </p>
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
                    <p className='text-secondary font-light'>
                      {clinic.contact.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Anchor */}
              <div className='relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm'>
                <img
                  alt={`${clinic.name} reception area`}
                  className='object-cover w-full h-full'
                  src={clinic.images.reception}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-background/40 to-transparent'></div>
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
                  practitioners={clinic.practitioners}
                  deposit={clinic.deposit}
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
            <div className='mt-8 rounded-xl overflow-hidden bg-surface-container-low h-48 relative'>
              <div className='absolute inset-0 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-crosshair'>
                <img
                  alt='Map location'
                  className='w-full h-full object-cover'
                  src={clinic.images.map}
                />
              </div>
              <div className='absolute bottom-4 left-4 bg-surface px-4 py-2 rounded shadow-sm text-xs font-label font-bold text-primary'>
                VIEW ON GOOGLE MAPS
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
