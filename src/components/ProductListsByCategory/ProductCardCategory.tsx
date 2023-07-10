import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import ImageLoader from '@/utils/ImageLoader';

interface Props {
  productData: {
    productId: number;
    productTypeId: number;
    url: string;
    name: string;
    promotePercent: number;
    isGetOne: boolean;
    createdDate: string;
  };
}

const ProductCardCategory = ({ productData }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.productId}`)}
      className='bg-custom-grey-light flex w-full flex-col gap-2 rounded-[10px] p-2'
    >
      <div className='relative rounded-[5px]'>
        {productData.promotePercent! > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[8px] rounded-tl-[8px] bg-primary px-2 text-white'>
              <span className='text-xs font-medium'>
                {productData.promotePercent}% OFF
              </span>
            </div>
          </>
        )}

        {productData?.isGetOne && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[8px] rounded-tl-[8px] bg-primary-dark px-3 text-white'>
              <span className='text-sm font-medium'>Buy 1 Get 1</span>
            </div>
          </>
        )}

        <img
          src={productData?.url}
          alt='productimage'
          className='mx-auto w-[80px] rounded-[5px] object-cover'
        />
      </div>
      <div>
        <h3 className='line-clamp-2 text-sm font-medium'>{productData.name}</h3>
      </div>
    </div>
  );
};

export default ProductCardCategory;
