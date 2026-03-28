import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';
import Footer from '@/components/ui/Footer';
import Navbar from '../../components/Navbar';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DentaFlow | Modern Dental Care',
  description:
    'Experience clinical excellence within a sanctuary designed for your comfort. We combine advanced technology with a human-centric approach.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
          rel='stylesheet'
        />
      </head>
      <body
        className='min-h-full bg-surface text-on-surface antialiased'
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
