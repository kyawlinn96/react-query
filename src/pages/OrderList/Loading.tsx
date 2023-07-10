import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Loading = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, idx) => idx + 1).map((e) => (
        <div key={e} className='mt-2 flex gap-4 rounded-[10px] bg-gray-100 p-4'>
          <SkeletonLoader className='h-20 w-20 rounded-md bg-gray-300' />
          <div className='flex grow flex-col justify-between'>
            <SkeletonLoader className='h-4 w-full rounded-md bg-gray-300' />
            <SkeletonLoader className='h-4 w-1/2 rounded-md bg-gray-300' />
            <SkeletonLoader className='h-3 w-2/3 rounded-md bg-gray-300' />
          </div>
        </div>
      ))}
    </>
  );
};
export default Loading;
