import { useNavigate } from 'react-router-dom';

// utils
import { formatNumber } from '@/utils/number-utils';

// components
import ImageLoader from '@/utils/ImageLoader';

interface Props {
  productData: {
    id: number;
    name: string;
    imgUrl: string;
    originalPrice: number;
    promotePrice: number;
    promotePercent: number;
  };
}

const ProductCard = ({ productData }: Props) => {
  const navigate = useNavigate();

  let PromotePercent = productData.promotePercent || 0;

  let productPriceSection = (
    <p className='text-md leading-5'>
      {formatNumber(productData.originalPrice)}
      Ks
    </p>
  );

  if (PromotePercent > 0)
    productPriceSection = (
      <>
        <p className='text-sm font-semibold text-primary'>
          {formatNumber(productData.promotePrice)} Ks
        </p>
        <p className='text-xs text-gray-600 line-through'>
          {formatNumber(productData.originalPrice)} Ks
        </p>
      </>
    );

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.id}`)}
      className='flex h-full w-full flex-col rounded-[10px] bg-custom-gray-light p-[14px]'
    >
      <div className='relative w-full rounded-[10px]'>
        {PromotePercent > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[10px] rounded-tl-[10px] bg-primary px-3 text-white'>
              <span className='custom-font-regular text-xs font-bold'>
                {productData.promotePercent}% OFF
              </span>
            </div>
          </>
        )}

        <div className='flex items-center justify-center'>
          <ImageLoader
            alt='product-img'
            src={productData?.imgUrl}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <p className='mt-1 line-clamp-2 text-sm font-normal'>
        {productData.name}
      </p>
      <div className='mt-auto'>{productPriceSection}</div>
    </div>
  );
};

export default ProductCard;
