import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';
import Footer from '@/components/ui/Footer';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
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
