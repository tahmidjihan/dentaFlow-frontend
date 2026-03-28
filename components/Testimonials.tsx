interface TestimonialProps {
  quote: string;
  name: string;
  profession: string;
}

function Testimonial({ quote, name, profession }: TestimonialProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-[#F0E0CC]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
          >
            star
          </span>
        ))}
      </div>
      <p className="font-headline text-2xl font-light leading-relaxed mb-8 italic">
        &quot;{quote}&quot;
      </p>
      <div className="mt-auto">
        <p className="font-headline font-bold text-lg">{name}</p>
        <p className="font-label text-sm uppercase tracking-widest opacity-60">
          {profession}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-primary text-on-primary py-32 px-8 overflow-hidden relative">
      {/* Decorative circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl"></div>
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-20 text-center">
          Patient Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Testimonial
            quote="The most calming dental experience I've ever had. The interior feels like a spa, and the care is genuinely exceptional."
            name="Elena Rostova"
            profession="Architect"
          />
          <Testimonial
            quote="Transparent pricing and incredible technology. I was able to see a 3D scan of my teeth before we even started."
            name="Marcus Chen"
            profession="Software Engineer"
          />
          <Testimonial
            quote="I've always had dental anxiety, but the team here made me feel completely at ease. Truly modern care."
            name="Sarah Jenkins"
            profession="Yoga Instructor"
          />
        </div>
      </div>
    </section>
  );
}
