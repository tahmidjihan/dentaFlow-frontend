import type { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'dentaWave | Modern Dental Care',
  description:
    'Experience clinical excellence within a sanctuary designed for your comfort. We combine advanced technology with a human-centric approach.',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
