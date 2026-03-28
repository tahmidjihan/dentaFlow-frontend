interface PricingRowProps {
  service: string;
  price: string;
}

function PricingRow({ service, price }: PricingRowProps) {
  return (
    <tr className="group hover:bg-surface-container-low transition-colors duration-300">
      <td className="py-8 px-8 font-headline font-bold text-lg border-b border-outline-variant/10">
        {service}
      </td>
      <td className="py-8 px-8 font-body font-medium text-lg text-right border-b border-outline-variant/10">
        {price}
      </td>
    </tr>
  );
}

export default function Pricing() {
  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-headline text-4xl font-bold tracking-tighter mb-6">
            Transparent Pricing
          </h2>
          <p className="font-body text-secondary leading-relaxed mb-10">
            We believe in clarity. No hidden fees, just honest medical care
            focused on your well-being.
          </p>
          <div className="bg-secondary-container/30 p-8 rounded-2xl">
            <p className="font-label text-xs uppercase tracking-widest text-on-secondary-container mb-2">
              Insurance
            </p>
            <p className="font-body text-sm text-on-secondary-container leading-relaxed">
              We accept most major providers. Contact our team to verify your
              specific coverage details.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8 overflow-hidden rounded-3xl editorial-shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="py-6 px-8 font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">
                  Service
                </th>
                <th className="py-6 px-8 font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold text-right">
                  Starting Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface-container-lowest">
              <PricingRow service="Routine Examination" price="$120" />
              <PricingRow service="Professional Hygiene" price="$180" />
              <PricingRow service="Standard Filling" price="$250" />
              <PricingRow service="Crown Reconstruction" price="$950" />
              <PricingRow service="Teeth Whitening" price="$450" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
