export default function Partners() {
  return (
    <section className='py-12 md:py-16 px-4 md:px-8 max-w-screen-2xl mx-auto bg-surface-container-low/30'>
      <div className='flex flex-col items-center justify-center py-8'>
        <div className='w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
          <span className='material-symbols-outlined text-2xl text-outline-variant'>
            handshake
          </span>
        </div>
        <h2 className='font-headline text-xl font-bold text-on-surface tracking-tighter mb-2'>
          Our Partnerships
        </h2>
        <p className='text-sm text-on-surface-variant text-center max-w-md'>
          Information about our partnerships and accreditations will be
          displayed here once confirmed.
        </p>
      </div>
    </section>
  );
}
