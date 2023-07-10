import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Loading = () => {
  return (
    <div>
      <SkeletonLoader className='mt-8 h-[100vw] w-full rounded-md bg-gray-300' />
      <div className='space-y-4 bg-white p-4'>
        <SkeletonLoader className='h-4 w-1/3 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-8 w-1/2 rounded-md bg-gray-300' />
        <SkeletonLoader className='h-4 w-2/3 rounded-md bg-gray-300' />
      </div>
    </div>
  );
};
export default Loading;
