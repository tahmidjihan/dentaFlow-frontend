import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='pt-24 overflow-x-hidden'>
        <Hero />
        <Services />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
