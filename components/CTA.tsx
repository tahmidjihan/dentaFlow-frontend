import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className='py-16 md:py-24 px-4 md:px-8'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='relative bg-primary-container rounded-3xl overflow-hidden'>
          {/* Decorative elements */}
          <div className='absolute top-0 right-0 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl -mr-48 -mt-48' />
          <div className='absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mb-32' />

          <div className='relative z-10 px-8 md:px-16 py-16 md:py-24 text-center'>
            <h2 className='font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-primary-container tracking-tighter mb-6'>
              Book Your Appointment Today
            </h2>
            <p className='font-body text-lg md:text-xl text-on-primary-container/80 max-w-2xl mx-auto mb-10 leading-relaxed'>
              Take the first step towards a healthier, brighter smile. Our
              expert dentists are ready to provide you with exceptional care in
              a comfortable environment.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href='/book'>
                <Button size='lg' variant='secondary' icon='calendar_today'>
                  Schedule Now
                </Button>
              </Link>
              <Link
                href='/contact'
                className='flex items-center gap-2 font-headline font-bold text-on-primary-container hover:opacity-80 transition-opacity group'
              >
                Contact Us
                <span className='material-symbols-outlined transition-transform group-hover:translate-x-1'>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
