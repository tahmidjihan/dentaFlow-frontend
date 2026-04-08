import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='max-w-3xl mx-auto'>
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
            Legal
          </span>
          <h1 className='font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-8'>
            Privacy Policy
          </h1>
          <p className='text-sm text-on-surface-variant mb-12'>
            Last updated: April 8, 2026
          </p>

          <div className='space-y-8'>
            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                1. Introduction
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                DentaWave (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                platform, including our website, mobile applications, and related
                services. Please read this policy carefully to understand our
                practices regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                2. Information We Collect
              </h2>
              <p className='text-on-surface-variant leading-relaxed mb-4'>
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-on-surface-variant'>
                <li>
                  <strong>Account Information:</strong> Name, email address, phone
                  number, and date of birth when you create an account.
                </li>
                <li>
                  <strong>Health Information:</strong> Dental history, medical
                  conditions, and treatment preferences necessary for providing
                  dental care services.
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details and
                  billing address processed securely through our payment provider,
                  Stripe.
                </li>
                <li>
                  <strong>Appointment Data:</strong> Dates, times, and details of
                  your dental appointments and treatments.
                </li>
                <li>
                  <strong>Communications:</strong> Messages, feedback, and
                  correspondence you send to us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                3. How We Use Your Information
              </h2>
              <p className='text-on-surface-variant leading-relaxed mb-4'>
                We use the information we collect to:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-on-surface-variant'>
                <li>Provide, maintain, and improve our dental care services</li>
                <li>Schedule and manage your appointments</li>
                <li>Process payments and send billing information</li>
                <li>
                  Communicate with you about services, updates, and promotional
                  offers (with your consent)
                </li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>
                  Comply with legal obligations and regulatory requirements
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                4. Data Security
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                We implement industry-standard security measures to protect your
                personal information, including encryption, secure socket layer
                (SSL) technology, and restricted access to personal data. Your
                health information is stored in compliance with healthcare data
                protection regulations. However, no method of transmission over
                the Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                5. Data Sharing and Disclosure
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                We do not sell your personal information. We may share your data
                with your treating dentists, healthcare providers involved in your
                care, payment processors, and as required by law. All third-party
                service providers are bound by confidentiality agreements and data
                processing agreements.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                6. Your Rights
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                You have the right to access, correct, or delete your personal
                information. You may also request a copy of your data, restrict
                processing, or object to certain uses of your data. To exercise
                these rights, please contact us at privacy@dentawave.com.
              </p>
            </section>

            <section>
              <h2 className='font-headline text-2xl font-bold text-on-surface mb-4'>
                7. Contact Us
              </h2>
              <p className='text-on-surface-variant leading-relaxed'>
                If you have any questions about this Privacy Policy, please contact
                us at:
              </p>
              <p className='text-on-surface-variant mt-2'>
                Email: privacy@dentawave.com
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
