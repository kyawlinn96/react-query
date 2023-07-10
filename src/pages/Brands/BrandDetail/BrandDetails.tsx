import React from 'react';
import BrandDetailHook from '@/pages/Brands/BrandDetail/BrandDetailHook';
import BackStep from '@/components/CommonUi/BackStep';
import DescriptionItems from '@/components/Brands/DescriptionItems';
import BrandProductCard from '@/components/Brands/BrandProductCards';
import cn from 'classnames';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import FacebookIcon from '@/assets/facebook.svg';
import MessengerIcon from '@/assets/messenger.png';
import { Link } from 'react-router-dom';
import ImageLoader from '@/utils/ImageLoader';

const BrandDetails = () => {
  const {
    urlData,
    isSuccess,
    loadMoreRef,
    totalProducts,
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = BrandDetailHook();

  let random = true;

  return (
    <div className='relative min-h-screen w-full bg-gray-100'>
      <div className='absolute left-5 top-5 z-30'>
        <BackStep />
      </div>
      {isLoading ? (
        <div className='min-h-screen  w-full bg-white p-5'>
          <div className='h-56 w-full bg-white'>
            <SkeletonLoader className='h-full w-full rounded-xl bg-gray-200 ' />
          </div>
          <div className='z-10 -mt-20 flex h-36  w-full items-center justify-center'>
            <SkeletonLoader className='h-36 w-36 rounded-full  bg-gray-200' />
          </div>
          <div className='my-4 flex h-10 w-full items-center justify-center'>
            <SkeletonLoader className='h-8 w-1/2 rounded-xl bg-gray-200' />
          </div>
          <div className='flex flex-col  gap-2'>
            <SkeletonLoader className='h-4 w-full rounded-xl bg-gray-200' />

            <div className='flex gap-2'>
              <SkeletonLoader className='h-4 w-full rounded-xl bg-gray-200' />
              <SkeletonLoader className='h-4 w-full rounded-xl bg-gray-200' />
            </div>
            <div className='flex gap-2'>
              <SkeletonLoader className='h-4 w-full rounded-xl bg-gray-200' />
              <SkeletonLoader className='h-4 w-full rounded-xl bg-gray-200' />
            </div>
            <SkeletonLoader className='h-4 w-1/2 rounded-xl bg-gray-200' />
          </div>
          <SkeletonLoader className='my-4 h-8 w-1/3 rounded-xl bg-gray-200' />
          <div className='grid grid-flow-row grid-cols-2 gap-2 p-2'>
            <div className='flex h-52 flex-col gap-2 rounded-xl bg-gray-200 p-2'>
              <SkeletonLoader className='h-32 rounded-xl bg-white/80' />
              <SkeletonLoader className='h-5  rounded-xl bg-white/80' />
              <SkeletonLoader className='h-5  rounded-xl bg-white/80' />
            </div>
            <div className='flex h-52 flex-col gap-2 rounded-xl bg-gray-200 p-2'>
              <SkeletonLoader className='h-32 rounded-xl bg-white/80' />
              <SkeletonLoader className='h-5  rounded-xl bg-white/80' />
              <SkeletonLoader className='h-5  rounded-xl bg-white/80' />
            </div>
          </div>
        </div>
      ) : (
        <>
          <ImageLoader
            src={data?.pages[0]?.url}
            alt={data?.pages[0]?.brandName}
            className='z-10 h-52 w-full object-cover'
          />

          <div className=' -mt-16 flex h-32 w-full items-center justify-center'>
            <img
              src={data?.pages[0]?.brandLogo}
              alt={data?.pages[0]?.brandName}
              className='z-40 h-32 w-32 rounded-full border-2 border-gray-200 object-cover'
            />
          </div>
          <h1 className='my-4 text-center font-semibold'>
            {data?.pages[0]?.brandName}
          </h1>

          <DescriptionItems description={data?.pages[0]?.description!} />
          {data?.pages[0]?.faceBookUrl && (
            <Link to={data?.pages[0]?.faceBookUrl} target='_blank'>
              <div className='mx-4 my-2 flex items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-base font-semibold shadow-md'>
                <img src={FacebookIcon} alt='facebook_icon' className='w-8' />
                <p className=''>Go to offical Facebook Page</p>
              </div>
            </Link>
          )}
          {data?.pages[0]?.messengerUrl && (
            <Link to={data?.pages[0]?.messengerUrl} target='_blank'>
              <div className='mx-4 my-2 flex items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-base font-semibold shadow-md'>
                <img src={MessengerIcon} alt='facebook_icon' className='w-8' />
                <p className=''>Send message in Messenger</p>
              </div>
            </Link>
          )}

          {data?.pages[0]?.products?.length > 0 ? (
            <>
              <h3 className='mt-3 px-4 text-xl font-semibold'>Products</h3>
              <div className='grid grid-flow-row grid-cols-2 gap-2 p-4'>
                {data?.pages[0]?.products.map((product) => (
                  <BrandProductCard
                    productData={product}
                    key={product?.productId}
                  />
                ))}
              </div>
              <div
                ref={loadMoreRef}
                className={cn(!hasNextPage ? 'hidden' : 'block')}
              >
                <p className='text-md text-center text-gray-400'>
                  {isFetchingNextPage ? 'Loading more...' : ''}
                </p>
              </div>
              {isLoading && (
                <div className='text-md  mt-4 p-4 text-center text-gray-400'>
                  Loading...
                </div>
              )}

              {!hasNextPage && !isLoading && (
                <div className='text-md w-full rounded-md p-4 text-center text-gray-400'>
                  No More Result!
                </div>
              )}
            </>
          ) : (
            <div className='text-md w-full p-4 font-semibold  text-gray-400'>
              No Available Products Yet...
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default BrandDetails;
