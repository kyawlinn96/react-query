import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Loading = () => {
  return (
    <div className='overflow-x-hidden bg-white p-4'>
      <div className='flex items-center justify-between gap-2'>
        {Array.from({ length: 5 }, (_, idx) => idx + 1).map((e) => (
          <div key={e} className='w-14'>
            <SkeletonLoader
              key={e}
              className='h-14 w-full rounded-md bg-gray-300'
            />
            <SkeletonLoader
              key={e}
              className='mt-2 h-4 w-full rounded-sm bg-gray-300'
            />
          </div>
        ))}
      </div>
      <SkeletonLoader className='mt-4 h-32 w-full rounded-[10px] bg-gray-300' />
      <div className='mt-4 flex items-center justify-between'>
        <SkeletonLoader className='h-4 w-20 rounded-sm bg-gray-300' />
        <SkeletonLoader className='h-4 w-16 rounded-sm bg-gray-300' />
      </div>

      <div className='mt-4 flex gap-2'>
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
      </div>
      <div className='mt-2 flex gap-2'>
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-14 w-36 shrink-0 rounded-md bg-gray-300' />
      </div>

      <div className='mt-8 flex items-center justify-between'>
        <SkeletonLoader className='h-4 w-16 rounded-sm bg-gray-300' />
        <SkeletonLoader className='h-4 w-20 rounded-sm bg-gray-300' />
      </div>
      <div className='mb-16 mt-4 flex items-center gap-4'>
        <SkeletonLoader className='h-52 w-36 flex-shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-52 w-36 flex-shrink-0 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-52 w-36 flex-shrink-0 rounded-md bg-gray-300' />
      </div>
    </div>
  );
};
export default Loading;
