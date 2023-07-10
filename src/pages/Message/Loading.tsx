import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Loading = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, idx) => idx + 1).map((e) => (
        <div key={e} className='flex gap-4 bg-white p-4'>
          <SkeletonLoader className='h-14 w-14 shrink-0 rounded-full bg-gray-200' />
          <div className='flex w-full flex-col gap-2'>
            <SkeletonLoader className='h-4 w-2/3 rounded-sm bg-gray-200' />
            <SkeletonLoader className='h-8 w-full rounded-sm bg-gray-200' />
            <SkeletonLoader className='h-4 w-1/2 rounded-sm bg-gray-200' />
          </div>
        </div>
      ))}
    </>
  );
};
export default Loading;
