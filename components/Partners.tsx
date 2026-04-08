const partners = [
  { name: 'British Dental Association', icon: 'verified' },
  { name: 'Royal College of Surgeons', icon: 'medical_services' },
  { name: 'NHS Approved', icon: 'shield' },
  { name: 'Care Quality Commission', icon: 'stars' },
  { name: 'Invisalign Certified', icon: 'emoji_events' },
  { name: 'ISO 9001 Certified', icon: 'assignment_turned_in' },
];

export default function Partners() {
  return (
    <section className='py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto bg-surface-container-low/30'>
      <div className='text-center mb-10'>
        <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-3 block'>
          Trusted Partnerships
        </span>
        <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tighter'>
          Recognized by Leading Organizations
        </h2>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8'>
        {partners.map((partner) => (
          <div
            key={partner.name}
            className='flex flex-col items-center justify-center p-4 md:p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:shadow-md transition-shadow'
          >
            <span className='material-symbols-outlined text-primary text-3xl mb-3'>
              {partner.icon}
            </span>
            <p className='text-xs md:text-sm text-on-surface-variant text-center font-medium'>
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
