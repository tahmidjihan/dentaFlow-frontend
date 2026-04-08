'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import FeaturedClinics from '@/components/FeaturedClinics';
import FeaturedDoctors from '@/components/FeaturedDoctors';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Partners from '@/components/Partners';
import Newsletter from '@/components/Newsletter';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className='pt-24 overflow-x-hidden'>
        <Hero />
        <Stats />
        <HowItWorks />
        <Services />
        <FeaturedClinics />
        <FeaturedDoctors />
        <Pricing />
        <Testimonials />
        <Partners />
        <FAQ />
        <Newsletter />
        <CTA />
      </main>
    </>
  );
}
