import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ClinicCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialty: string;
  image: string;
}

export default function ClinicCard({ id, name, address, phone, specialty, image }: ClinicCardProps) {
  return (
    <div className="group flex flex-col space-y-6">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low">
        <img
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          src={image}
          alt={name}
        />
        <div className="absolute top-4 right-4">
          <Badge variant='success' size='sm'>{specialty}</Badge>
        </div>
      </div>
      <Card variant='outlined' className="space-y-4 p-5">
        <div>
          <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
            {name}
          </h3>
          <div className="flex items-center text-secondary mt-1 space-x-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="font-body text-sm">{address}</span>
          </div>
        </div>
        <div className="flex items-center text-outline-variant space-x-2">
          <span className="material-symbols-outlined text-sm">call</span>
          <span className="font-body text-sm">{phone}</span>
        </div>
        <Link
          href={`/clinics/${id}`}
          className="block w-full py-4 rounded-lg bg-surface-container-lowest border border-outline-variant/20 font-headline font-bold text-sm tracking-tight text-on-surface hover:bg-secondary-container/30 transition-all duration-300 editorial-shadow text-center"
        >
          View Clinic
        </Link>
      </Card>
    </div>
  );
}
