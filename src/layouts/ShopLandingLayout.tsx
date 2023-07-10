import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

// types
import { SearchType } from '@/types';

// api
import { useGetShopDetailByShopId } from '@/api/shop-landing/detail-by-shop-query';
import { useGetCategoryByShopId } from '@/api/shop-landing/category-by-shop-query';
import { useGetProductSearchHistory } from '@/api/products/product-search-history-query';

// components
import BottomNavigation from '@/components/BottomNavigation';
import AnimateInputBox from '@/components/CommonUi/AnimateInputBox';
import BackStep from '@/components/CommonUi/BackStep';
import ScrollToTopButton from '@/components/CommonUi/ScrollToTopButton';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// icons
import IconCart from '@/components/icon/IconCart';
import upButton from '@/assets/floating.svg';
import IconChevron from '@/components/icon/IconChevron';

const ShopLandingLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: shopDetail,
    isLoading: shopDetailLoading,
    error: shopDetailError,
  } = useGetShopDetailByShopId(Number(id));

  useGetCategoryByShopId(Number(id));

  const {
    data: shopSearchHistory,
    isLoading: productSearchHistoryLoading,
    error: searchHistroyError,
  } = useGetProductSearchHistory(10, Number(id));

  const goToSearch = () => {
    navigate('/productsearch', {
      state: { shopData: shopDetail, searchType: SearchType.SEARCH_BY_NAME },
    });
  };

  const mainLoading = productSearchHistoryLoading || shopDetailLoading;
  const mainError = shopDetailError || searchHistroyError;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='sticky inset-0 top-0 z-50 flex items-center justify-between bg-white'>
        <div className='relative flex w-full items-center justify-between gap-4 px-4 py-2'>
          <button onClick={handleGoBack}>
            <IconChevron className='h-5 w-5' />
          </button>
          <AnimateInputBox
            histories={shopSearchHistory?.searchHistories!}
            goToSearch={goToSearch}
          />
          <div onClick={() => navigate(`/cart?shopId=${id}`)}>
            <IconCart />
          </div>
        </div>
      </div>
      {mainLoading ? (
        <div className='bg-gray-100 p-4'>
          <div className='relative flex h-52 animate-pulse gap-3 rounded-xl bg-gray-200 p-4'>
            <div className='center-x-axis  absolute bottom-5 flex h-28 w-9/12 animate-pulse rounded-xl bg-white p-4'>
              <div className='h-full w-5/12 rounded-xl bg-gray-200' />
              <div className='flex w-7/12 flex-col gap-4 px-4'>
                <div className='h-4 w-full animate-pulse rounded-xl bg-gray-200' />
                <div className='h-4 w-full animate-pulse rounded-xl bg-gray-200' />
                <div className='h-4 w-full animate-pulse rounded-xl bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='mt-4 flex gap-3 rounded-[10px] bg-white p-4'>
            <div className='h-10 w-20 animate-pulse rounded-xl bg-gray-200' />
            <div className='h-10 w-20 animate-pulse rounded-xl bg-gray-200' />
            <div className='h-10 w-20 animate-pulse rounded-xl bg-gray-200' />
            <div className='h-10 w-20 animate-pulse rounded-xl bg-gray-200' />
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
      ) : mainError ? (
        <div>Error.</div>
      ) : (
        <>
          <Outlet />
          <ScrollToTopButton />
          <div className='my-20'></div>
        </>
      )}

      <BottomNavigation />
    </>
  );
};

export default ShopLandingLayout;
