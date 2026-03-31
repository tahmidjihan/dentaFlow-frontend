import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import Card from '@/components/ui/Card';

interface PricingRowProps {
  service: string;
  price: string;
}

function PricingRow({ service, price }: PricingRowProps) {
  return (
    <TableRow hoverable>
      <TableCell className='font-headline font-bold text-lg border-b border-outline-variant/10'>
        {service}
      </TableCell>
      <TableCell
        align='right'
        className='font-body font-medium text-lg border-b border-outline-variant/10'
      >
        {price}
      </TableCell>
    </TableRow>
  );
}

export default function Pricing() {
  return (
    <section className='py-32 px-8 max-w-screen-2xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
        <div className='lg:col-span-4'>
          <h2 className='font-headline text-4xl font-bold tracking-tighter mb-6'>
            Transparent Pricing
          </h2>
          <p className='font-body text-secondary leading-relaxed mb-10'>
            We believe in clarity. No hidden fees, just honest medical care
            focused on your well-being.
          </p>
          <Card
            variant='outlined'
            className='p-8 rounded-2xl bg-secondary-container/30'
          >
            <p className='font-label text-xs uppercase tracking-widest text-on-secondary-container mb-2'>
              Insurance
            </p>
            <p className='font-body text-sm text-on-secondary-container leading-relaxed'>
              We accept most major providers. Contact our team to verify your
              specific coverage details.
            </p>
          </Card>
        </div>
        <div className='lg:col-span-8 overflow-hidden rounded-3xl editorial-shadow'>
          <Card variant='elevated' className='rounded-3xl'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='py-6 px-8'>Service</TableHead>
                  <TableHead align='right' className='py-6 px-8'>
                    Starting Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <PricingRow service='Routine Examination' price='$50' />
                <PricingRow service='Surgeries' price='$50' />
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  );
}
