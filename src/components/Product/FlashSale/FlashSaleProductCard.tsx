import StarRatingIcon from '@/assets/flash/star.png';
import PlaceHolderIcon from '@/assets/svgcomponents/PlaceHolderIcon';
import { product } from '@/types';
import { formatNumber } from '@/utils/number-utils';
import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../CommonUi/ProgressBar';

type productProps = {
  productData: product;
};

const FlashSaleProductCard: React.FC<productProps> = ({ productData }) => {
  let PromotePercent = productData.promotePercent || 0;
  let productPriceSection = (
    <p className='text-md font-bold leading-5'>
      {formatNumber(productData.originalPrice! || productData?.price!)}
      Ks
    </p>
  );

  if (PromotePercent > 0)
    productPriceSection = (
      <>
        <p className='text-color-primary text-base font-semibold'>
          {formatNumber(PromotePercent)} Ks
        </p>
        <p className=' text-color-black-light text-sm line-through'>
          {formatNumber(productData.originalPrice! || productData?.price!)} Ks
        </p>
      </>
    );
  return (
    <Link to={`/productdetail/${productData?.productId}`}>
      <div className='flex w-full flex-col gap-2 rounded-md bg-gray-100 p-2'>
        <div className='standard-rounded relative w-full overflow-hidden'>
          {PromotePercent > 0 && (
            <>
              <div className='absolute top-0 z-20 rounded-br-md rounded-tl-md bg-primary px-3 text-white'>
                <span className=' text-sm'>
                  {productData.promotePercent}% OFF
                </span>
              </div>
            </>
          )}
          {productData?.isGetOne && (
            <>
              <div className='absolute top-0 z-20 rounded-br-md rounded-tl-md bg-primary px-3 text-white'>
                <span className=' text-sm'>Buy 1 Get 1</span>
              </div>
            </>
          )}

          {productData?.url ? (
            <div className='h-32 w-32 object-contain'>
              <img
                src={productData?.url}
                alt='productimage'
                className='h-full w-full'
              />
            </div>
          ) : (
            <PlaceHolderIcon width={128} height={128} />
          )}
        </div>
        <div>
          <h3 className=' line-clamp-2 text-base'>{productData.name}</h3>
          <div className='font-semibold'>{productPriceSection}</div>
          <div className='my-2 flex items-center justify-start gap-1 text-sm'>
            <p>{productData?.rating}</p>
            <img src={StarRatingIcon} alt='start' className='w-3' />
            <p>{productData?.ratingCount} ratings</p>
          </div>
          <ProgressBar totalQuantity={5} leftQuantity={4} />
        </div>
      </div>
    </Link>
  );
};

export default FlashSaleProductCard;
