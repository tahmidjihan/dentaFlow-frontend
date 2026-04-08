'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  icon: string;
}

const faqs: FAQ[] = [
  {
    question: 'How often should I visit the dentist for a check-up?',
    answer:
      'We recommend visiting the dentist every six months for routine check-ups and professional cleanings. Regular visits help detect potential issues early, prevent cavities and gum disease, and maintain optimal oral health. If you have specific dental concerns or conditions, your dentist may suggest more frequent visits.',
    icon: 'calendar_today',
  },
  {
    question: 'What should I do in case of a dental emergency?',
    answer:
      'If you experience a knocked-out tooth, severe toothache, broken tooth, or any oral injury, contact us immediately. We offer emergency dental appointments. For a knocked-out tooth, try to place it back in the socket or keep it in milk until you reach the clinic. Rinse your mouth with warm salt water for any oral injuries and apply a cold compress to reduce swelling.',
    icon: 'warning',
  },
  {
    question: 'Are teeth whitening treatments safe?',
    answer:
      'Professional teeth whitening treatments performed by our dentists are completely safe and effective. We use FDA-approved whitening agents that protect your enamel while removing stains. Over-the-counter products can sometimes damage enamel if misused, which is why professional supervision is recommended for the best and safest results.',
    icon: 'brightness_1',
  },
  {
    question: 'How can I prevent cavities and gum disease?',
    answer:
      'Maintain a consistent oral hygiene routine: brush twice daily with fluoride toothpaste, floss at least once a day, and use an antibacterial mouthwash. Limit sugary and acidic foods, stay hydrated, and avoid tobacco products. Regular dental check-ups every six months are essential for professional cleaning and early detection of any issues.',
    icon: 'shield',
  },
  {
    question: 'What are dental implants and are they right for me?',
    answer:
      'Dental implants are titanium posts surgically placed in your jawbone to replace missing tooth roots. They provide a permanent, natural-looking solution for missing teeth. Ideal candidates have good oral health, adequate bone density, and healthy gums. During a consultation, our dentists will evaluate your specific situation and recommend the best treatment option for you.',
    icon: 'construction',
  },
  {
    question: 'Do you accept dental insurance?',
    answer:
      'Yes, we work with most major dental insurance providers. Our administrative team will help you verify your coverage, understand your benefits, and process claims efficiently. We also offer flexible payment plans for treatments not fully covered by insurance, ensuring everyone can access quality dental care.',
    icon: 'verified_user',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto'>
      <div className='text-center mb-12 md:mb-16'>
        <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
          Common Questions
        </span>
        <h2 className='font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
          Frequently Asked Questions
        </h2>
        <p className='font-body text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Find answers to the most common questions about dental care and our
          services
        </p>
      </div>

      <div className='max-w-3xl mx-auto space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden transition-all duration-300'
          >
            <button
              onClick={() => toggleFAQ(index)}
              className='w-full flex items-center justify-between p-6 text-left hover:bg-surface-container-low/50 transition-colors'
            >
              <div className='flex items-center gap-4 flex-1'>
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                  <span className='material-symbols-outlined text-primary text-xl'>
                    {faq.icon}
                  </span>
                </div>
                <h3 className='font-headline font-bold text-on-surface'>
                  {faq.question}
                </h3>
              </div>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180' : ''}`}
              >
                expand_more
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className='px-6 pb-6 pt-0 font-body text-on-surface-variant leading-relaxed'>
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
