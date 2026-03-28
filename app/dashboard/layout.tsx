import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '../globals.css';
import Sidebar from '../../components/sidebar';
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Admin Panel | DentaFlow',
  description: 'Admin panel for managing appointments, clinics, and users',
};

export default function DoctorLayout({
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
      <body className='min-h-full bg-background text-on-surface antialiased'>
        <div className='min-h-screen flex'>
          {/* Sidebar Navigation */}
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
