import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Founder & Lead Dentist',
      bio: 'With over 20 years of experience in general and cosmetic dentistry, Dr. Mitchell founded DentaWave with a vision of making exceptional dental care accessible to everyone.',
      icon: 'woman',
    },
    {
      name: 'Dr. James Richardson',
      role: 'Orthodontic Specialist',
      bio: 'A certified orthodontist specializing in Invisalign and traditional braces, Dr. Richardson has transformed thousands of smiles across the country.',
      icon: 'man',
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Pediatric Dentist',
      bio: 'Dr. Chen creates a welcoming environment for young patients, combining gentle care with modern techniques to make dental visits enjoyable for children.',
      icon: 'woman',
    },
    {
      name: 'Dr. Michael Thompson',
      role: 'Oral Surgeon',
      bio: 'Specializing in complex dental procedures including implants and wisdom tooth extraction, Dr. Thompson ensures the highest standards of surgical care.',
      icon: 'man',
    },
  ];

  const values = [
    {
      title: 'Patient-Centered Care',
      description: 'Every treatment plan is tailored to your unique needs, preferences, and comfort.',
      icon: 'favorite',
    },
    {
      title: 'Clinical Excellence',
      description: 'We stay at the forefront of dental technology and techniques to deliver the best outcomes.',
      icon: 'verified',
    },
    {
      title: 'Accessibility',
      description: 'Quality dental care should be available to everyone, which is why we work with all major insurance providers.',
      icon: 'public',
    },
    {
      title: 'Continuous Innovation',
      description: 'We invest in the latest equipment and training to offer cutting-edge dental solutions.',
      icon: 'lightbulb',
    },
  ];

  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen'>
        {/* Hero Section */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto mb-16 md:mb-24'>
          <div className='max-w-3xl'>
            <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
              About DentaWave
            </span>
            <h1 className='font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-6 leading-[1.1]'>
              Transforming Dental Care{' '}
              <span className='text-primary italic font-light'>One Smile at a Time</span>
            </h1>
            <p className='font-body text-lg text-on-surface-variant leading-relaxed max-w-2xl'>
              Founded in 2020, DentaWave has grown from a single clinic into a
              nationwide network of premium dental facilities. Our mission is to
              combine clinical excellence with a patient-first approach, making
              every visit a comfortable and empowering experience.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto mb-16 md:mb-24'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { value: '15+', label: 'Clinics', icon: 'business' },
              { value: '50+', label: 'Dentists', icon: 'medical_services' },
              { value: '10,000+', label: 'Patients', icon: 'group' },
              { value: '98%', label: 'Satisfaction', icon: 'sentiment_satisfied' },
            ].map((stat) => (
              <div
                key={stat.label}
                className='flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'
              >
                <span className='material-symbols-outlined text-primary text-3xl mb-3'>
                  {stat.icon}
                </span>
                <p className='font-headline text-2xl md:text-3xl font-bold text-on-surface'>
                  {stat.value}
                </p>
                <p className='text-sm text-on-surface-variant'>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto mb-16 md:mb-24'>
          <div className='text-center mb-12'>
            <h2 className='font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tighter mb-4'>
              Our Values
            </h2>
            <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
              The principles that guide everything we do
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {values.map((value) => (
              <div
                key={value.title}
                className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-md transition-shadow'
              >
                <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
                  <span className='material-symbols-outlined text-primary text-2xl'>
                    {value.icon}
                  </span>
                </div>
                <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
                  {value.title}
                </h3>
                <p className='text-sm text-on-surface-variant leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto mb-16 md:mb-24'>
          <div className='text-center mb-12'>
            <h2 className='font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tighter mb-4'>
              Meet Our Leadership
            </h2>
            <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
              The experienced professionals driving our mission forward
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-md transition-shadow'
              >
                <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto'>
                  <span className='material-symbols-outlined text-primary text-4xl'>
                    {member.icon}
                  </span>
                </div>
                <h3 className='font-headline text-lg font-bold text-on-surface text-center mb-1'>
                  {member.name}
                </h3>
                <p className='text-sm text-primary font-semibold text-center mb-3'>
                  {member.role}
                </p>
                <p className='text-sm text-on-surface-variant leading-relaxed text-center'>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto'>
          <div className='bg-primary-container/20 rounded-3xl p-8 md:p-12 text-center'>
            <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4'>
              Ready to Experience the DentaWave Difference?
            </h2>
            <p className='text-on-surface-variant mb-8 max-w-xl mx-auto'>
              Book your appointment today and discover what exceptional dental
              care feels like.
            </p>
            <Link href='/book'>
              <Button size='lg' variant='primary' icon='calendar_today'>
                Book Appointment
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
