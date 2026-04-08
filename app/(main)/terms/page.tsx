import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='max-w-3xl mx-auto'>
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
            Legal
          </span>
          <h1 className='font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-8'>
            Terms of Service
          </h1>
          <p className='text-sm text-on-surface-variant mb-12'>
            Last updated: April 8, 2026
          </p>

          <div className='space-y-8'>
            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                1. Acceptance of Terms
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                By accessing or using the DentaWave platform, including our
                website, mobile applications, and related services (collectively,
                the &quot;Services&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree to these Terms, you may not use
                the Services.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                2. Description of Services
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                DentaWave provides a platform for discovering, booking, and
                managing dental appointments at affiliated clinics. Our Services
                include clinic and dentist search, online booking, appointment
                management, payment processing, and related features. We act as an
                intermediary between patients and dental care providers.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                3. User Accounts
              </h2>
              <p className='text-on-surface-variant leading-relaxed mb-4'>
                To access certain features of the Services, you must create an
                account. You agree to:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-on-surface-variant'>
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>
                  Maintain and update your account information to keep it accurate
                </li>
                <li>
                  Keep your password secure and not share it with third parties
                </li>
                <li>
                  Accept responsibility for all activities that occur under your
                  account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                4. Appointment Booking and Cancellation
              </h2>
              <p className='text-on-surface-variant leading-relaxed mb-4'>
                When you book an appointment through DentaWave:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-on-surface-variant'>
                <li>
                  You will receive a confirmation email with appointment details
                </li>
                <li>
                  Cancellations must be made at least 24 hours before the
                  scheduled appointment
                </li>
                <li>
                  Late cancellations or no-shows may result in cancellation fees
                  as determined by the individual clinic
                </li>
                <li>
                  A deposit may be required at the time of booking for certain
                  services
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                5. Payments and Refunds
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                All payments are processed securely through our payment provider,
                Stripe. Fees for dental services are set by individual clinics and
                practitioners. DentaWave may charge a service fee for use of the
                platform. Refund policies are determined by the individual clinic
                providing the service. Deposits are generally non-refundable if you
                cancel within 24 hours of your appointment.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                6. User Conduct
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                You agree not to misuse the Services, provide false information,
                attempt to gain unauthorized access to our systems, or use the
                platform for any unlawful purpose. We reserve the right to suspend
                or terminate accounts that violate these Terms.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                7. Disclaimer of Warranties
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                The Services are provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, either express or implied. DentaWave does
                not guarantee the availability, accuracy, or quality of any
                dental services provided by affiliated clinics or practitioners.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                8. Limitation of Liability
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                To the maximum extent permitted by law, DentaWave shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of the Services or your
                interactions with affiliated clinics and practitioners.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                9. Changes to Terms
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                We may modify these Terms at any time. We will notify users of
                material changes by posting the updated Terms on our website. Your
                continued use of the Services after such modifications constitutes
                your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                10. Contact Information
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                For questions about these Terms, please contact us at:
              </p>
              <p className='text-on-surface-variant mt-2'>
                Email: legal@dentawave.com
                <br />
                Phone: +44 (0) 20 7946 0958
                <br />
                Address: 123 Dental Street, London, EC2A 4BX, United Kingdom
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
