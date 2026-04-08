import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='max-w-3xl mx-auto mb-12 text-center'>
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
            Dental Health Resources
          </span>
          <h1 className='font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
            Our Blog
          </h1>
          <p className='font-body text-lg text-on-surface-variant'>
            Expert advice, latest research, and practical tips for maintaining
            optimal dental health.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
          <div className='w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4'>
            <span className='material-symbols-outlined text-3xl text-outline-variant'>
              article
            </span>
          </div>
          <h3 className='font-headline text-lg font-bold text-on-surface mb-2'>
            Our blog is coming soon
          </h3>
          <p className='text-sm text-on-surface-variant text-center max-w-md'>
            Follow us on social media for dental health tips, clinic updates,
            and the latest in oral care.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
