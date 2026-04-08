export default function DoctorCardSkeleton() {
  return (
    <div className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden animate-pulse'>
      <div className='p-6 space-y-4'>
        {/* Avatar */}
        <div className='w-16 h-16 rounded-full bg-surface-container-high' />

        {/* Name */}
        <div className='space-y-2'>
          <div className='h-6 bg-surface-container-high rounded w-3/4' />
          <div className='h-4 bg-surface-container-high rounded w-1/2' />
          <div className='h-4 bg-surface-container-high rounded w-1/3' />
        </div>

        {/* Meta */}
        <div className='flex gap-4'>
          <div className='h-4 bg-surface-container-high rounded w-16' />
          <div className='h-4 bg-surface-container-high rounded w-16' />
        </div>
      </div>
    </div>
  );
}
