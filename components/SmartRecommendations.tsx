'use client';

import Link from 'next/link';
import { useClinics } from '@/lib/hooks/use-clinics';
import { useDoctors } from '@/lib/hooks/use-doctors';

interface SmartRecommendationsProps {
  userId?: string;
  maxItems?: number;
}

// Simulated past appointments data
const simulatedPastAppointments = {
  specialties: ['General Dentistry', 'Orthodontics'],
  locations: ['London', 'Manchester'],
};

export default function SmartRecommendations({
  maxItems = 4,
}: SmartRecommendationsProps) {
  const { data: clinics = [] } = useClinics();
  const { data: doctors = [] } = useDoctors();

  // Simple heuristic: recommend clinics/doctors matching past appointment specialties
  const recommendedClinics = Array.isArray(clinics)
    ? clinics
        .filter((c: any) => {
          return (
            simulatedPastAppointments.locations.some((loc) =>
              c.location?.toLowerCase().includes(loc.toLowerCase()),
            )
          );
        })
        .slice(0, Math.ceil(maxItems / 2))
    : [];

  const recommendedDoctors = Array.isArray(doctors)
    ? doctors
        .filter((d: any) => {
          return simulatedPastAppointments.specialties.includes(d.specialty);
        })
        .slice(0, Math.floor(maxItems / 2))
    : [];

  const getAvatarColor = (name: string): string => {
    const colors = [
      'bg-primary text-on-primary',
      'bg-secondary-container text-on-secondary-container',
      'bg-tertiary-container text-on-tertiary',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const totalRecommendations = recommendedClinics.length + recommendedDoctors.length;

  if (totalRecommendations === 0) return null;

  return (
    <section className='py-12 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='material-symbols-outlined text-primary'>psychology</span>
            <span className='font-label text-primary tracking-[0.1em] uppercase text-xs font-semibold'>
              Recommended for You
            </span>
          </div>
          <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tighter'>
            Based on Your History
          </h2>
          <p className='text-on-surface-variant text-sm mt-1'>
            Clinics and doctors we think you will love
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {recommendedClinics.map((clinic: any) => (
          <Link key={clinic.id} href={`/clinics/${clinic.id}`} className='block group'>
            <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full'>
              <div className='p-6'>
                <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
                  <span className='material-symbols-outlined text-primary text-2xl'>
                    business
                  </span>
                </div>
                <h3 className='font-headline font-bold text-on-surface group-hover:text-primary transition-colors mb-1'>
                  {clinic.name}
                </h3>
                <p className='text-sm text-on-surface-variant'>
                  {clinic.location}
                </p>
                <div className='flex items-center gap-1 mt-3 text-xs text-primary'>
                  <span className='material-symbols-outlined text-sm'>
                    arrow_forward
                  </span>
                  View Details
                </div>
              </div>
            </div>
          </Link>
        ))}

        {recommendedDoctors.map((doctor: any) => (
          <Link key={doctor.id} href={`/doctors`} className='block group'>
            <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full'>
              <div className='p-6'>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-headline text-sm font-bold mb-4 ${getAvatarColor(doctor.name || 'Doctor')}`}
                >
                  {getInitials(doctor.name || 'D')}
                </div>
                <h3 className='font-headline font-bold text-on-surface group-hover:text-primary transition-colors mb-1'>
                  {doctor.name}
                </h3>
                <p className='text-sm text-primary font-semibold'>
                  {doctor.specialty}
                </p>
                <div className='flex items-center gap-1 mt-3 text-xs text-primary'>
                  <span className='material-symbols-outlined text-sm'>
                    arrow_forward
                  </span>
                  View Profile
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
