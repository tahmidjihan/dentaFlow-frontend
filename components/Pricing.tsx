import Card from '@/components/ui/Card';

export default function Pricing() {
  return (
    <section className='py-32 px-8 max-w-screen-2xl mx-auto'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='font-headline text-4xl font-bold tracking-tighter mb-6'>
            Transparent Pricing
          </h2>
          <p className='font-body text-secondary leading-relaxed'>
            We believe in clarity. No hidden fees, just honest medical care
            focused on your well-being.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
          <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
            <span className='material-symbols-outlined text-3xl text-primary'>
              payments
            </span>
          </div>
          <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
            Personalized quotes available
          </h3>
          <p className='text-sm text-on-surface-variant text-center max-w-md mb-6'>
            Contact us for a personalized quote. We work with all major
            insurance providers to ensure you get the best possible care at a
            price that works for you.
          </p>
          <Card
            variant='outlined'
            className='p-6 rounded-2xl bg-secondary-container/30 max-w-sm'
          >
            <p className='font-label text-xs uppercase tracking-widest text-on-secondary-container mb-2'>
              Insurance
            </p>
            <p className='font-body text-sm text-on-secondary-container leading-relaxed'>
              We accept most major providers. Contact our team to verify your
              specific coverage details.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
