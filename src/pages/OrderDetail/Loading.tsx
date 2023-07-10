import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Loading = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='sticky inset-x-0 top-0 z-10 flex h-5 items-center justify-between px-4 py-3 text-white'></div>

      <div className='rounded-[10px] bg-white p-4'>
        <SkeletonLoader className='mx-auto my-2 h-6 w-2/3 rounded-md bg-gray-200' />
        <div className='flex justify-between px-8 py-4 text-sm'>
          <SkeletonLoader className='h-12 w-12 rounded-full bg-gray-200' />
          <SkeletonLoader className='h-12 w-12 rounded-full bg-gray-200' />
          <SkeletonLoader className='h-12 w-12 rounded-full bg-gray-200' />
          <SkeletonLoader className='h-12 w-12 rounded-full bg-gray-200' />
        </div>
      </div>

      <div className='mt-4 flex gap-3 rounded-[10px] bg-white p-4'>
        <SkeletonLoader className='h-20 w-20 shrink-0 rounded-md bg-gray-200' />
        <div className='flex w-full flex-col'>
          <SkeletonLoader className='h-6 w-1/2 rounded-sm bg-gray-200' />
          <SkeletonLoader className='mt-2 h-6 w-1/3 rounded-sm bg-gray-200' />
          <SkeletonLoader className='mt-2 h-4 w-2/3 rounded-sm bg-gray-200' />
        </div>
      </div>
      <div className='mt-4 flex gap-3 rounded-[10px] bg-white p-4'>
        <SkeletonLoader className='h-20 w-20 shrink-0 rounded-md bg-gray-200' />
        <div className='flex w-full flex-col'>
          <SkeletonLoader className='h-6 w-1/2 rounded-sm bg-gray-200' />
          <SkeletonLoader className='mt-2 h-6 w-1/3 rounded-sm bg-gray-200' />
          <SkeletonLoader className='mt-2 h-4 w-2/3 rounded-sm bg-gray-200' />
        </div>
      </div>

      <div className='mt-4 rounded-[10px] bg-white'>
        <div className='p-4'>
          <SkeletonLoader className='h-6 w-2/5 rounded-sm bg-gray-200' />
        </div>
        <div className='flex items-center justify-between p-4 pt-0'>
          <div className='flex w-full items-center gap-4'>
            <SkeletonLoader className='h-12 w-12 rounded-full bg-gray-200' />
            <SkeletonLoader className='h-5 w-1/2 rounded-sm bg-gray-200' />
          </div>
        </div>
      </div>

      <div className='mt-4 rounded-[10px] bg-white'>
        <div className='p-4'>
          <SkeletonLoader className='h-6 w-1/4 rounded-sm bg-gray-200' />
        </div>
        <div className='flex items-start gap-4 p-4 pt-0'>
          <SkeletonLoader className='h-12 w-12 shrink-0 rounded-full bg-gray-200' />
          <div className='flex w-full flex-col space-y-2 text-sm'>
            <SkeletonLoader className='h-5 w-1/2 rounded-sm bg-gray-200' />
            <SkeletonLoader className='h-4 w-2/3 rounded-sm bg-gray-200' />
            <SkeletonLoader className='h-5 w-2/5 rounded-sm bg-gray-200' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
