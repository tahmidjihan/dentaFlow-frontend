import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[870px] flex items-center px-8 max-w-screen-2xl mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-7 z-10">
          <span className="font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-6 block">
            Wellness Redefined
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-bold text-on-background tracking-tighter leading-[0.95] mb-8">
            Modern Dental <br /> Care for <br />{" "}
            <span className="italic font-light">Modern Lives.</span>
          </h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
            Experience clinical excellence within a sanctuary designed for your
            comfort. We combine advanced technology with a human-centric
            approach.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button size="lg" variant="primary">
              Book Now
            </Button>
            <Link
              href="/philosophy"
              className="flex items-center gap-3 font-headline font-bold text-on-background group"
            >
              Our Philosophy
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden editorial-shadow">
            <img
              className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
              alt="Minimalist aesthetic dental clinic interior with soft natural light"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 bg-secondary-container p-8 rounded-2xl hidden md:block">
            <p className="font-headline text-on-secondary-container font-bold text-4xl leading-tight">
              98%
            </p>
            <p className="font-label text-on-secondary-container/70 text-xs uppercase tracking-widest mt-1">
              Patient Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
