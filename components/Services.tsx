import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group bg-surface-container-lowest p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 border border-outline-variant/10 editorial-shadow">
      <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-container transition-colors duration-500">
        <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors">
          {icon}
        </span>
      </div>
      <h3 className="font-headline text-2xl font-bold mb-4">{title}</h3>
      <p className="font-body text-secondary leading-relaxed mb-8">
        {description}
      </p>
      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
        arrow_right_alt
      </span>
    </div>
  );
}

export default function Services() {
  return (
    <section className="bg-surface-container-low py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-background mb-6">
              Curated Services
            </h2>
            <p className="font-body text-secondary text-lg">
              We offer a range of specialized treatments tailored to the unique
              needs of the modern patient.
            </p>
          </div>
          <Link
            href="/services"
            className="font-label text-sm uppercase tracking-widest text-primary font-bold pb-2 border-b border-primary/20"
          >
            View All Services
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="clean_hands"
            title="Cleaning"
            description="Revitalize your oral health with our signature deep cleaning therapy that focuses on longevity and preventative care."
          />
          <ServiceCard
            icon="dentistry"
            title="Implants"
            description="Precision-engineered dental implants that restore both function and aesthetics seamlessly into your natural smile."
          />
          <ServiceCard
            icon="orthopedics"
            title="Braces"
            description="From traditional braces to invisible aligners, we craft the perfect path to a confident, perfectly aligned smile."
          />
        </div>
      </div>
    </section>
  );
}
