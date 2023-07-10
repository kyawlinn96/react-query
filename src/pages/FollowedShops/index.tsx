import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';

// api
import { useGetShopList } from '@/api/shoplist/shoplist-query';

// components
import IconChevronBack from '@/components/icon/IconChevronBack';
import IconXCircle from '@/components/icon/IconXCircle';
import Loading from './Loading';

// asset
import FollowTik from '@/assets/follow_tik_white.svg';

const FollowedShops = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useGetShopList('', true, 10);
  const followedShops = (data?.pages || []).flatMap((page) => page.shops);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('fetching next page');
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) return <div>Error.</div>;

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='mb-2 flex items-center justify-between bg-white px-4 py-3'>
        <div className='flex items-center gap-x-2'>
          <IconChevronBack onClick={() => navigate(-1)} />
          <p className='text-[20px] font-semibold'>Follow Shops</p>
        </div>
        <IconXCircle />
      </div>

      <div className='px-4 pb-3'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p className='mb-3 text-gray-600'>{followedShops.length} Shops</p>

            {followedShops?.map((shop) => (
              <div ref={ref} className='mt-3 rounded-[10px] bg-[#FFFFFF]'>
                <div className='flex items-center justify-between px-4 py-3'>
                  <div className='flex items-center gap-x-3'>
                    <div className='w-11'>
                      <img
                        src={shop.imageUrl}
                        alt={shop.shopName}
                        className='h-full w-full rounded-full object-contain'
                      />
                    </div>

                    <p className='line-clamp-2 text-lg font-medium'>
                      {shop.shopName}
                    </p>
                  </div>

                  {shop.isFollowed === true && (
                    <div
                      className='flex items-center gap-x-1 rounded-md bg-primary px-3 py-1'
                      onClick={() => navigate(`/shops/${shop.shopId}`)}
                    >
                      <img src={FollowTik} alt='follow-check' />
                      <p className='text-sm text-white'>Followed</p>
                    </div>
                  )}
                </div>

                <div className='w-[100%] border-t border-dashed border-[#D9D9D9]' />

                <Swiper
                  className='mySwiper px-4 py-3'
                  spaceBetween={10}
                  slidesPerView={'auto'}
                >
                  {shop?.products?.slice(0, 6).map((product) => (
                    <SwiperSlide
                      key={product.productId}
                      className='!w-16 rounded-md bg-[#F7F7F7]'
                      style={{ width: 'auto' }}
                    >
                      <img
                        src={product.productImg}
                        onClick={() =>
                          navigate(`/productdetail/${product?.productId}`)
                        }
                        alt='product'
                        className='h-full w-full rounded-sm object-contain'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
            <div ref={ref}>
              {hasNextPage ? (
                isFetchingNextPage ? (
                  'Loading more...'
                ) : (
                  'Load more'
                )
              ) : (
                <p className='my-3 text-center text-gray-600'>
                  No more results
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FollowedShops;
