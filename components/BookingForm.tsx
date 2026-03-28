'use client';

interface BookingFormProps {
  practitioners: Array<{
    id: string;
    name: string;
    specialty: string;
  }>;
  deposit: number;
}

export default function BookingForm({ practitioners, deposit }: BookingFormProps) {
  return (
    <form className='space-y-8' onSubmit={(e) => e.preventDefault()}>
      {/* Doctor Selection */}
      <div className='space-y-3'>
        <label className='text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold'>
          Select Practitioner
        </label>
        <div className='relative'>
          <select className='w-full bg-surface-container-lowest border-none py-4 px-6 rounded-lg text-on-surface font-body appearance-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer'>
            <option value=''>Choose a specialist...</option>
            {practitioners.map((practitioner) => (
              <option key={practitioner.id} value={practitioner.id}>
                {practitioner.name} — {practitioner.specialty}
              </option>
            ))}
          </select>
          <span className='material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none'>
            expand_more
          </span>
        </div>
      </div>

      {/* Date Picker */}
      <div className='space-y-3'>
        <label className='text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold'>
          Preferred Date
        </label>
        <input
          className='w-full bg-surface-container-lowest border-none py-4 px-6 rounded-lg text-on-surface font-body focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer'
          type='date'
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Summary / Deposit Note */}
      <div className='bg-surface-container-highest/30 p-6 rounded-lg space-y-4'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-secondary'>Consultation Deposit</span>
          <span className='text-on-surface font-bold'>
            £{deposit.toFixed(2)}
          </span>
        </div>
        <p className='text-xs text-secondary leading-relaxed italic'>
          A non-refundable deposit is required to secure your appointment. This
          amount will be deducted from your final treatment total.
        </p>
      </div>

      {/* Action Button */}
      <div className='pt-4'>
        <button className='group relative w-full bg-primary-container text-on-primary py-5 px-8 rounded-lg font-headline font-bold text-lg tracking-tight transition-all hover:opacity-90 active:scale-[0.98] overflow-hidden'>
          <span>Confirm & Pay Deposit (£{deposit.toFixed(2)})</span>
        </button>
      </div>
    </form>
  );
}
