import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { shallow } from 'zustand/shallow';

// utils
import useIntersectionObserver from '@/utils/useIntersectionObserver';

// api
import { useGetBrandByShopId } from '@/api/shop-landing/brand-by-shop-query';

// stores
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';

// components
import Loading from '@/components/CommonUi/Loading';
import DummyLogo from '@/assets/dummy.jpg';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import ImageLoader from '@/utils/ImageLoader';

const ShopLandingBrand = () => {
  const navigate = useNavigate();
  const loadMoreRef = useRef(null);
  const { id } = useParams();
  const { shopDetail } = useShopLandingStore(
    (state) => ({
      shopDetail: state.shopDetail,
    }),
    shallow
  );

  const {
    totalBrands,
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetBrandByShopId(Number(id), 10);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const goToBrandDetail = (brand: any) => {
    const propsState = {
      shopData: shopDetail,
      brandData: brand,
    };
    navigate(`/brands/${brand?.brandId}`, { state: propsState });
  };

  /*if (isLoading) {
        return <Loading width={50} height={50} loadingColor='#CF202D'/>;
    }*/

  return (
    <div>
      {data?.pages[0]?.totalItem !== 0 && (
        <h1 className='my-4 px-4 text-xl font-semibold'>
          {data?.pages[0].totalItem} Brands
        </h1>
      )}
      <div className='flex flex-col  overflow-auto px-4 py-2'>
        {isLoading ? (
          <div className='flex min-h-[50vh] w-full flex-col gap-y-3 bg-white'>
            <div className='flex w-full items-center gap-x-3 bg-gray-100 p-4'>
              <SkeletonLoader className='h-20 w-20 rounded-full bg-white' />
              <div className='flex grow flex-col gap-y-2'>
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-1/2  rounded-xl bg-white' />
              </div>
            </div>
            <div className='flex w-full items-center gap-x-3 bg-gray-100 p-4'>
              <SkeletonLoader className='h-20 w-20 rounded-full bg-white' />
              <div className='flex grow flex-col gap-y-2'>
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-1/2  rounded-xl bg-white' />
              </div>
            </div>
            <div className='flex w-full items-center gap-x-3 bg-gray-100 p-4'>
              <SkeletonLoader className='h-20 w-20 rounded-full bg-white' />
              <div className='flex grow flex-col gap-y-2'>
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-full  rounded-xl bg-white' />
                <SkeletonLoader className='h-5 w-1/2  rounded-xl bg-white' />
              </div>
            </div>
          </div>
        ) : (
          <>
            {isSuccess && totalBrands?.length! > 0 ? (
              <>
                <div className='flex flex-col gap-4'>
                  {totalBrands?.map((brand, i) => (
                    <div
                      className='flex items-center gap-3  hover:bg-primary-light'
                      key={brand.brandId}
                      onClick={() => goToBrandDetail(brand)}
                    >
                      <ImageLoader
                        alt='brand-logo'
                        src={brand?.logoUrl}
                        className='h-14 w-14 rounded-full border-2 border-primary bg-transparent object-cover p-1 '
                      />

                      <p className='text-md font-semibold'>{brand.brandName}</p>
                    </div>
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

                {!hasNextPage && !isLoading && (
                  <div className='text-md rounded-md p-4 text-center text-gray-400'>
                    No More Results
                  </div>
                )}
              </>
            ) : (
              <div className='flex min-h-[50vh] w-full items-center justify-center py-2 text-center text-base text-gray-400'>
                No Brand Yet
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopLandingBrand;
