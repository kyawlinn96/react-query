import React, { useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// constants
import { sortLists } from '@/constant';

// types
import { ProductItem, SearchType, SortType } from '@/types';

// api
import { useGetShopProductByShopId } from '@/api/shop-landing/product-by-shop-query';

// stores
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';

// components
import Button from '@/components/CommonUi/Button';

import ShopLandingProductCard from './ShopLandingProductCard';

// assets
import ForwardArrow from '@/assets/category/arrow_2.svg';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import DefaultIcon from '@/assets/sort.svg';
import LowToHighPriceIcon from '@/assets/low_to_hight.svg';
import HighToLowPriceIcon from '@/assets/high_to_low.svg';
import LatestIcon from '@/assets/latest_item.svg';
import PopularIcon from '@/assets/bestselling.svg';
import UserOutsideClick from '@/utils/useOuterClick';
import cn from 'classnames';

const sortingOptions = [
  {
    title: 'Default',
    value: 1,
    image: DefaultIcon,
  },
  {
    title: 'Low To High',
    value: 2,
    image: LowToHighPriceIcon,
  },
  {
    title: 'High To Low',
    value: 3,
    image: HighToLowPriceIcon,
  },
  {
    title: 'Latest Item',
    value: 4,
    image: LatestIcon,
  },
  {
    title: 'Best Selling',
    value: 5,
    image: PopularIcon,
  },
];

const ShopLandingProducts = () => {
  const navigate = useNavigate();
  const optionBoxRef = useRef(null);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openOption, setOpenOption] = useState(false);
  const [currSortOption, setCurrSortOption] = useState(sortingOptions[0]);
  UserOutsideClick(optionBoxRef, () => setOpenOption(false));
  console.log(searchParams, 'info');

  const { shopDetail } = useShopLandingStore(
    (state) => ({
      shopDetail: state.shopDetail,
    }),
    shallow
  );
  const { data, isLoading } = useGetShopProductByShopId(
    Number(id),
    Number(searchParams.get('filter')) || 1,
    10
  );

  const viewMoreHandler = () => {
    const state = {
      shopData: shopDetail,
      searchType: SearchType.SEARCH_ALL_PRODUCTS,
    };
    navigate('/resultproducts', { state });
  };

  const handleOptionChange = (data: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', data.value);
    setSearchParams(params);
    setCurrSortOption(data);
    setOpenOption(false);
  };

  return (
    <div className='flex flex-col px-4'>
      {data?.pages[0].totalItem! > 0 && (
        <div className='relative my-3  flex items-center justify-between px-2'>
          <h2 className='text-xl font-semibold'>
            {data?.pages[0].totalItem} Products
          </h2>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => setOpenOption(true)}
          >
            <p className='text-sm font-medium text-gray-500'>
              {currSortOption?.title}
            </p>
            <img src={currSortOption?.image} alt='icon' className='w-3' />
          </div>
          {openOption && (
            <div
              className='absolute right-4 top-6 z-50 flex flex-col space-y-2 rounded-xl bg-white py-2  shadow-md'
              ref={optionBoxRef}
            >
              {sortingOptions.map((option, index) => (
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2',
                    currSortOption?.value === option.value && 'bg-amber-100'
                  )}
                  key={index}
                  onClick={() => handleOptionChange(option)}
                >
                  <img src={option.image} alt='option_img' className='w-3' />
                  <p className='text-sm font-medium text-black '>
                    {option.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isLoading ? (
        <div className='grid min-h-[50vh] w-full grid-flow-row grid-cols-2 gap-2 bg-white p-5'>
          <div className='flex h-56 flex-col gap-y-2 rounded-xl bg-gray-100 p-2'>
            <SkeletonLoader className='h-36 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
          </div>
          <div className='flex h-56 flex-col gap-y-2 rounded-xl bg-gray-100 p-2'>
            <SkeletonLoader className='h-36 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
            <SkeletonLoader className='h-5 w-full rounded-xl bg-white' />
          </div>
        </div>
      ) : (
        <>
          {data?.pages[0]?.totalItem! > 0 ? (
            <div className='grid grid-cols-2 gap-2 '>
              {data?.pages[0].products
                ?.slice(0, 10)
                .map((product: ProductItem) => (
                  <React.Fragment key={product.productId}>
                    <ShopLandingProductCard productData={product} />
                  </React.Fragment>
                ))}
            </div>
          ) : (
            <div className='flex h-[50vh] w-full items-center justify-center'>
              <p className='text-md text-center font-medium text-gray-400'>
                No Product Yet
              </p>
            </div>
          )}
        </>
      )}
      {data?.pages[0]?.totalItem! >= 10 && (
        <Button
          loadingColor='#2060FF'
          isLoading={false}
          iconBack={ForwardArrow}
          action={viewMoreHandler}
          title='View More'
          classProps='flex items-center justify-center gap-2 py-2 my-3 rounded-md bg-gray-100 '
        />
      )}
    </div>
  );
};

export default ShopLandingProducts;
