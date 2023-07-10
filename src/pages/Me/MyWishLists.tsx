import React from 'react';
import { useGetWishLists } from '@/api/myaccount/myaccount-wishlists';
import NoWishList from '@/components/MyAccount/NoWishList';
import BackStep from '@/components/CommonUi/BackStep';
import WishListItem from '@/components/MyAccount/WishListItem';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const MyWishLists = () => {
  const { data: WishLists, isLoading: WishListLoading } = useGetWishLists();

  return (
    <div className='relative flex min-h-screen w-full flex-col bg-gray-200'>
      <div className='absolute left-5 top-5 z-50'>
        <BackStep />
      </div>
      <div className='z-30 w-full py-4 text-center text-xl font-semibold'>
        My WishList({WishLists?.length})
      </div>
      {WishListLoading ? (
        <div className='bg-gray-100 p-4'>
          <div className='flex gap-3 rounded-[10px] bg-white p-4'>
            <SkeletonLoader className='h-20 w-20 rounded-md bg-gray-200' />
            <div className='flex grow flex-col'>
              <div className='flex items-center justify-between'>
                <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
              </div>
              <SkeletonLoader className='mt-2 h-5 w-1/3 rounded-md bg-gray-200' />
              <div className='mt-3 flex items-center justify-between'>
                <SkeletonLoader className='h-4 w-1/2 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='mt-4 flex gap-3 rounded-[10px] bg-white p-4'>
            <SkeletonLoader className='h-20 w-20 rounded-md bg-gray-200' />
            <div className='flex grow flex-col'>
              <div className='flex items-center justify-between'>
                <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
              </div>
              <SkeletonLoader className='mt-2 h-5 w-1/3 rounded-md bg-gray-200' />
              <div className='mt-3 flex items-center justify-between'>
                <SkeletonLoader className='h-4 w-1/2 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='mt-4 rounded-[10px] bg-white'>
            <div className='flex items-center justify-between p-4 pb-0'>
              <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
            </div>
            <div className='p-4'>
              <div className='flex flex-col items-start gap-2'>
                <SkeletonLoader className='h-6 w-2/3 rounded-md bg-gray-200' />
                <SkeletonLoader className='h-6 w-1/3 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>
        </div>
      ) : WishLists?.length! > 0 ? (
        <WishListItem
          wishListLoading={WishListLoading}
          wishListData={WishLists}
        />
      ) : (
        <NoWishList />
      )}
    </div>
  );
};
export default MyWishLists;
