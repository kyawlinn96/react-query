import PhoneIcon from '@/assets/phone.png';
import BranchIcon from '@/assets/shop.png';
import { removeMyanmarSuffix } from '@/utils/removeMyanmarSuffix';
import Loading from '@/components/CommonUi/Loading';
import EnvalopIcon from '@/assets/envalope.png';
import { useLocation } from 'react-router-dom';
import LocationIcon from '@/assets/loca_red.svg';

import { useGetBranchesByShopId } from '@/api/shop-landing/branches-by-shop-query';

import { useRef } from 'react';
import useIntersectionObserver from '@/utils/useIntersectionObserver';
import cn from 'classnames';
import BackStep from '@/components/CommonUi/BackStep';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const ShopAddress = () => {
  const location = useLocation();
  const urlData = location.state;
  const loadMoreRef = useRef(null);

  const {
    totalBranches,
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetBranchesByShopId(Number(urlData?.shopId), 10);
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // don't give me a string, give me array idiots
  const formatPhoneNumber = (phoneNumberArray: string) => {
    const formatToArray = phoneNumberArray.split(',');
    return (
      <div className=''>
        {formatToArray.map((phone, index) => (
          <span key={index} className='inline-block'>
            {phone}
            {formatToArray.length - 1 !== index ? ', ' : ''}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className=' flex flex-col'>
      <div className='relative my-2 px-5 py-2 pl-14 text-left text-xl font-semibold'>
        Shop Locations
        <div className='center-y-axis absolute left-3'>
          <BackStep />
        </div>
      </div>
      {isLoading ? (
        <div className='flex flex-col gap-y-5 p-4'>
          <div className='flex h-28 w-full gap-3 rounded-xl bg-gray-100 p-4'>
            <SkeletonLoader className='h-full w-24 rounded-xl bg-white' />
            <div className='flex grow flex-col gap-y-3'>
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-1/2 rounded-xl bg-white' />
            </div>
          </div>
          <div className='flex h-28 w-full gap-3 rounded-xl bg-gray-100 p-4'>
            <SkeletonLoader className='h-full w-24 rounded-xl bg-white' />
            <div className='flex grow flex-col gap-y-3'>
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-1/2 rounded-xl bg-white' />
            </div>
          </div>
          <div className='flex h-28 w-full gap-3 rounded-xl bg-gray-100 p-4'>
            <SkeletonLoader className='h-full w-24 rounded-xl bg-white' />
            <div className='flex grow flex-col gap-y-3'>
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-1/2 rounded-xl bg-white' />
            </div>
          </div>
          <div className='flex h-28 w-full gap-3 rounded-xl bg-gray-100 p-4'>
            <SkeletonLoader className='h-full w-24 rounded-xl bg-white' />
            <div className='flex grow flex-col gap-y-3'>
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-1/2 rounded-xl bg-white' />
            </div>
          </div>
          <div className='flex h-28 w-full gap-3 rounded-xl bg-gray-100 p-4'>
            <SkeletonLoader className='h-full w-24 rounded-xl bg-white' />
            <div className='flex grow flex-col gap-y-3'>
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
              <SkeletonLoader className='h-5 w-1/2 rounded-xl bg-white' />
            </div>
          </div>
        </div>
      ) : (
        <div className=' min-h-[80vh] bg-gray-100 p-4'>
          <div className='flex items-center justify-start gap-2 rounded-md bg-white p-2'>
            <div className='w-14 rounded-md bg-gray-400 object-contain'>
              <img
                src={urlData.shopImageUrl}
                alt='shoplogo'
                className='h-full w-full'
              />
            </div>
            <div className='flex flex-col'>
              <p className='text-base font-medium text-black'>
                {urlData?.shopName}
              </p>
              <p className='text-sm text-black'>{urlData?.shopType}</p>
            </div>
          </div>
          <div className='mb-10 mt-4 flex flex-col gap-4'>
            {totalBranches?.map((branch) => (
              <div
                className='flex gap-4 rounded-md bg-white p-4'
                key={branch.id}
              >
                <img src={BranchIcon} alt='branch' className='h-5 w-5' />

                <div className='flex flex-col gap-3'>
                  <p className='text-md font-semibold text-black'>
                    {branch.name}
                  </p>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-start justify-start gap-3'>
                      <img
                        src={LocationIcon}
                        alt='loca'
                        className='mt-1 h-4 w-4'
                      />

                      <p className='text-base text-black'>
                        {removeMyanmarSuffix(branch.address)},{' '}
                        {removeMyanmarSuffix(branch.townShipName)},{' '}
                        {removeMyanmarSuffix(branch.cityName)}
                      </p>
                    </div>
                    <div className='flex items-center justify-start gap-3'>
                      <img src={PhoneIcon} alt='loca' className='h-4 w-4' />

                      <p className='text-base text-black'>
                        {branch.mobileNumber.split(',').join(', ')}
                      </p>
                    </div>
                    {branch?.email !== null && (
                      <div className='flex items-center justify-start gap-3'>
                        <img src={EnvalopIcon} alt='loca' className='h-4 w-4' />

                        <p className='text-base text-black'>{branch?.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              <div className='text-md rounded-md p-4 text-center text-gray-400'>
                No More Branches!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAddress;
