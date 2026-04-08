import Link from 'next/link';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Browse Clinics',
    description:
      'Explore our curated network of dental clinics across the country. Each clinic is carefully vetted for quality, hygiene standards, and patient comfort.',
    icon: 'search',
    link: '/clinics',
  },
  {
    number: '02',
    title: 'Book Appointment',
    description:
      'Select your preferred clinic, choose a specialist that matches your needs, and pick a convenient time slot. Our booking process takes less than two minutes.',
    icon: 'calendar_today',
    link: '/book',
  },
  {
    number: '03',
    title: 'Get Treatment',
    description:
      'Arrive at your appointment and receive world-class dental care. From routine check-ups to advanced procedures, our dentists ensure the best outcomes.',
    icon: 'medical_services',
    link: '/doctors',
  },
];

export default function HowItWorks() {
  return (
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='text-center mb-12 md:mb-16'>
        <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
          Simple Process
        </span>
        <h2 className='font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
          How It Works
        </h2>
        <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Getting exceptional dental care is just three steps away
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
        {steps.map((step, index) => (
          <div key={step.number} className='relative group'>
            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div className='hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-outline-variant/30' />
            )}

            <Link href={step.link} className='block'>
              <div className='flex flex-col items-start p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full'>
                {/* Step Number & Icon */}
                <div className='flex items-center gap-4 mb-6'>
                  <span className='font-headline text-4xl font-bold text-primary/20'>
                    {step.number}
                  </span>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <span className='material-symbols-outlined text-primary text-2xl'>
                      {step.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className='font-headline text-xl font-bold text-on-surface mb-3'>
                  {step.title}
                </h3>
                <p className='font-body text-on-surface-variant leading-relaxed flex-1'>
                  {step.description}
                </p>

                {/* Arrow */}
                <div className='flex items-center gap-2 mt-6 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span>Learn more</span>
                  <span className='material-symbols-outlined text-base'>
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
