import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import Masonry from 'react-masonry-css';

// types
import { PromoProductProps, SearchType } from '@/types';

// api
import { useGetPromotionByShopId } from '@/api/shop-landing/promotion-by-shop-query';

// stores
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';

// components
import Button from '@/components/CommonUi/Button';
import ShopLandingPromoProductCard from './ShopLandingPromoProductCard';

// assets
import ForwardArrow from '@/assets/category/arrow_2.svg';

const ShopLandingPromotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const shopDetail = useShopLandingStore((state) => state.shopDetail, shallow);

  const { data: promoProductsData } = useGetPromotionByShopId(Number(id), 10);

  const viewMoreHandler = () => {
    const state = {
      shopId: id,
      searchType: SearchType.SEARCH_PROMOTION,
      shopData: shopDetail,
    };
    navigate('/resultproducts', { state });
  };

  return (
    <div className='flex flex-col px-4'>
      {promoProductsData?.pages[0]?.totalItem! > 0 ? (
        <>
          <h1 className='my-3 px-2 text-xl font-semibold'>
            Promotion Products
          </h1>
          <Masonry
            breakpointCols={{ default: 2 }}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
          >
            {promoProductsData?.pages[0]?.promoProducts
              ?.slice(0, 10)
              .map((product: PromoProductProps) => (
                <React.Fragment key={product.productId}>
                  <ShopLandingPromoProductCard productData={product} />
                </React.Fragment>
              ))}
          </Masonry>
        </>
      ) : (
        <div className='flex h-[50vh] w-full items-center justify-center'>
          <p className='text-md text-center font-medium text-gray-400'>
            No Product Yet
          </p>
        </div>
      )}
      {promoProductsData?.pages[0]?.totalItem! >= 10 && (
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

export default ShopLandingPromotion;
