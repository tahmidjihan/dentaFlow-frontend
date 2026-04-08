'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='max-w-3xl mx-auto mb-12 text-center'>
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
            Get in Touch
          </span>
          <h1 className='font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
            Contact Us
          </h1>
          <p className='font-body text-lg text-on-surface-variant'>
            Have a question or need assistance? Our team is here to help you.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {/* Contact Information */}
          <div className='lg:col-span-1 space-y-6'>
            <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3'>
                <span className='material-symbols-outlined text-primary'>location_on</span>
              </div>
              <h3 className='font-headline font-bold text-on-surface mb-1'>Address</h3>
              <p className='text-sm text-on-surface-variant'>
                123 Dental Street<br />
                London, EC2A 4BX<br />
                United Kingdom
              </p>
            </div>

            <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3'>
                <span className='material-symbols-outlined text-primary'>phone</span>
              </div>
              <h3 className='font-headline font-bold text-on-surface mb-1'>Phone</h3>
              <p className='text-sm text-on-surface-variant'>
                +44 (0) 20 7946 0958<br />
                Mon-Fri: 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className='p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3'>
                <span className='material-symbols-outlined text-primary'>mail</span>
              </div>
              <h3 className='font-headline font-bold text-on-surface mb-1'>Email</h3>
              <p className='text-sm text-on-surface-variant'>
                info@dentawave.com<br />
                support@dentawave.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <form
              onSubmit={handleSubmit}
              className='p-6 md:p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 space-y-5'
            >
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-on-surface mb-1'>
                  Full Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your full name'
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-on-surface mb-1'>
                  Email Address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='your@email.com'
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                />
              </div>

              <div>
                <label htmlFor='subject' className='block text-sm font-medium text-on-surface mb-1'>
                  Subject
                </label>
                <select
                  id='subject'
                  name='subject'
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                >
                  <option value=''>Select a subject</option>
                  <option value='general'>General Inquiry</option>
                  <option value='booking'>Booking Assistance</option>
                  <option value='billing'>Billing Question</option>
                  <option value='feedback'>Feedback</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-on-surface mb-1'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Tell us how we can help you...'
                  rows={5}
                  className='w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none'
                />
              </div>

              <Button
                type='submit'
                variant='primary'
                size='lg'
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                icon='send'
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
