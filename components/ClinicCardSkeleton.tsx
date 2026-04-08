export default function ClinicCardSkeleton() {
  return (
    <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden animate-pulse'>
      {/* Image placeholder */}
      <div className='w-full h-48 bg-surface-container-high' />

      {/* Content */}
      <div className='p-6 space-y-4'>
        {/* Title */}
        <div className='space-y-2'>
          <div className='h-6 bg-surface-container-high rounded w-3/4' />
          <div className='h-4 bg-surface-container-high rounded w-1/2' />
        </div>

        {/* Location */}
        <div className='flex items-start gap-2'>
          <div className='w-5 h-5 bg-surface-container-high rounded flex-shrink-0' />
          <div className='h-4 bg-surface-container-high rounded flex-1' />
        </div>

        {/* Phone */}
        <div className='flex items-center gap-2'>
          <div className='w-5 h-5 bg-surface-container-high rounded flex-shrink-0' />
          <div className='h-4 bg-surface-container-high rounded w-1/3' />
        </div>
      </div>
    </div>
  );
}
