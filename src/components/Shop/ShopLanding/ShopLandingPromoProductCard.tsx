import { useNavigate } from 'react-router-dom';

// types
import { PromoProductProps } from '@/types';
import ImageLoader from '@/utils/ImageLoader';
import PlaceholderImg from '@/assets/placeholder.svg';

interface ShoplandingProductCardProps {
  productData: PromoProductProps;
}

const ShopLandingPromoProductCard = ({
  productData,
}: ShoplandingProductCardProps) => {
  const navigate = useNavigate();

  let productPriceSection = (
    <p className='font-semibold text-primary'>
      {productData?.normalPrice.toLocaleString()} Ks
    </p>
  );

  if (productData.promotionPercent > 0)
    productPriceSection = (
      <>
        <p className='font-semibold text-primary'>
          {productData.promotionPrice.toLocaleString()} Ks
        </p>
        <p className='text-sm font-light text-gray-600 line-through'>
          {productData.normalPrice.toLocaleString()} Ks
        </p>
      </>
    );

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData.productId}`)}
      className='flex w-full flex-col gap-2 rounded-xl bg-custom-gray-light p-4'
    >
      <div className='relative h-36 w-full overflow-hidden rounded-xl'>
        {productData.promotionPercent > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[10px] rounded-tl-[10px] bg-primary px-3 text-white'>
              <span className=' text-sm'>
                {productData.promotionPercent}% OFF
              </span>
            </div>
          </>
        )}

        <div className='flex w-full items-center justify-center'>
          {productData?.imageUrl ? (
            <ImageLoader
              alt='product-img'
              src={productData?.imageUrl}
              className='h-full w-full object-cover'
            />
          ) : (
            <img
              src={PlaceholderImg}
              alt='placeholder-icon'
              className='h-full w-full'
            />
          )}
        </div>
      </div>
      <div className='mt-1'>
        <p className='line-clamp-2'>{productData.productName}</p>
        <p>{productPriceSection}</p>
      </div>
    </div>
  );
};

export default ShopLandingPromoProductCard;
