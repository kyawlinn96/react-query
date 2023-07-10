import React from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import { formatNumber } from '@/utils/number-utils';

// components
import ImageLoader from '@/utils/ImageLoader';

interface Props {
  productData: {
    id: number;
    name: string;
    url: string;
    originalPrice: number;
    promotePrice: number;
    orderCount: number;
    isFav: boolean;
    isGetOne: boolean;
  };
}

const ProductCard = ({ productData }: Props) => {
  const navigate = useNavigate();

  // price
  let productPriceSection = (
    <p className='font-semibold text-white'>
      {formatNumber(productData.originalPrice!)} Ks
    </p>
  );

  // promotion price
  if (productData.promotePrice! > 0)
    productPriceSection = (
      <>
        <p className='font-semibold text-white'>
          {formatNumber(productData.promotePrice ?? 0)} Ks
        </p>
        <p className='text-sm font-light text-white line-through'>
          {formatNumber(productData.originalPrice!)} Ks
        </p>
      </>
    );

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.id}`)}
      className='product-card--base'
    >
      <div className='relative mx-auto h-auto w-full'>
        <div className='relative overflow-hidden'>
          <div className='flex items-center justify-center'>
            <ImageLoader
              alt='product-img'
              src={productData?.url}
              className='h-full w-full rounded-[10px] object-cover'
            />
          </div>
          <div className='center-x-axis custom-font-regular absolute bottom-3 w-3/5 rounded-md bg-[#00000050] px-1 py-1 text-center text-base text-white backdrop-blur'>
            {productData?.orderCount} Sold
          </div>
        </div>
        <div className='mt-1 text-center'>{productPriceSection}</div>
      </div>
    </div>
  );
};

export default ProductCard;
