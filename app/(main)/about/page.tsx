import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const values = [
    {
      title: 'Patient-Centered Care',
      description:
        'Every treatment plan is tailored to your unique needs, preferences, and comfort.',
      icon: 'favorite',
    },
    {
      title: 'Clinical Excellence',
      description:
        'We stay at the forefront of dental technology and techniques to deliver the best outcomes.',
      icon: 'verified',
    },
    {
      title: 'Accessibility',
      description:
        'Quality dental care should be available to everyone, which is why we work with all major insurance providers.',
      icon: 'public',
    },
    {
      title: 'Continuous Innovation',
      description:
        'We invest in the latest equipment and training to offer cutting-edge dental solutions.',
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
              About DentaFlow
            </span>
            <h1 className='font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-6 leading-[1.1]'>
              Transforming Dental Care{' '}
              <span className='text-primary italic font-light'>
                One Smile at a Time
              </span>
            </h1>
            <p className='font-body text-lg text-on-surface-variant leading-relaxed max-w-2xl'>
              DentaFlow is a modern dental care platform designed to make
              exceptional dental care accessible to everyone. Our mission is to
              combine clinical excellence with a patient-first approach, making
              every visit a comfortable and empowering experience.
            </p>
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

        {/* Team placeholder */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto mb-16 md:mb-24'>
          <div className='text-center mb-12'>
            <h2 className='font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tighter mb-4'>
              Meet Our Leadership
            </h2>
            <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
              The experienced professionals driving our mission forward
            </p>
          </div>

          <div className='flex flex-col items-center justify-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
            <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-3xl text-outline-variant'>
                groups
              </span>
            </div>
            <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
              Our team information will be updated soon
            </h3>
            <p className='text-sm text-on-surface-variant text-center max-w-md'>
              We are preparing profiles of our leadership team and clinical
              staff. Check back soon to learn more about the professionals
              behind DentaFlow.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className='px-4 md:px-8 max-w-screen-2xl mx-auto'>
          <div className='bg-primary-container/20 rounded-3xl p-8 md:p-12 text-center'>
            <h2 className='font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4'>
              Ready to Experience the DentaFlow Difference?
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
