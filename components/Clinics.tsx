import ClinicCard from "./ClinicCard";

const clinics = [
  {
    name: "The Chelsea Mews",
    address: "24 King's Road, London",
    phone: "+44 20 7946 0123",
    specialty: "Primary Care",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
  },
  {
    name: "Mayfair Wellness",
    address: "12 Berkeley Square, London",
    phone: "+44 20 7946 0888",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  },
  {
    name: "Harley Studio",
    address: "102 Harley Street, London",
    phone: "+44 20 7946 0444",
    specialty: "Dental Excellence",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Notting Hill Haven",
    address: "88 Portobello Road, London",
    phone: "+44 20 7946 0999",
    specialty: "Holistic Health",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "South Kensington Suite",
    address: "42 Exhibition Road, London",
    phone: "+44 20 7946 0222",
    specialty: "Specialist Care",
    image: "https://images.unsplash.com/photo-1516574167959-90b74f79ed59?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Clinics() {
  return (
    <div className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full">
      {/* Header Section */}
      <header className="mb-20 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tighter mb-6 leading-[1.1]">
          Find a sanctuary <br />
          <span className="text-primary italic font-light">near you.</span>
        </h1>
        <p className="font-body text-lg text-secondary leading-relaxed mb-12">
          Discover our curated network of clinical spaces designed for your
          wellbeing. Each location offers a unique blend of medical excellence
          and serene intentionality.
        </p>
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            className="w-full bg-surface-container-low border-none rounded-xl py-5 pl-14 pr-6 text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/30 transition-all font-body text-md shadow-sm"
            placeholder="Search by city, clinic name, or specialty..."
            type="text"
          />
          <div className="absolute inset-y-2 right-2">
            <button className="bg-on-surface text-surface h-full px-6 rounded-lg font-headline font-semibold text-sm hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Clinic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.name} {...clinic} />
        ))}

        {/* Map Placeholder */}
        <div className="group relative flex flex-col justify-center items-center rounded-xl bg-secondary-container/20 p-8 border border-primary/10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(#55624c_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">
                map
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface">
              Explore Map View
            </h3>
            <p className="font-body text-sm text-secondary max-w-[200px]">
              Visualize all our sanctuaries across the city on an interactive
              map.
            </p>
            <button className="font-label text-xs uppercase tracking-widest font-bold text-primary hover:underline underline-offset-8 transition-all">
              Launch Map Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
