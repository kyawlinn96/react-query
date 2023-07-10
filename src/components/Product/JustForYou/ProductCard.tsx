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
    <p className='font-semibold text-primary'>
      {formatNumber(productData.originalPrice)} Ks
    </p>
  );

  if (PromotePercent > 0)
    productPriceSection = (
      <>
        <p className='font-semibold text-primary'>
          {formatNumber(productData.promotePrice)} Ks
        </p>
        <p className='text-sm font-light text-gray-600 line-through'>
          {formatNumber(productData.originalPrice)} Ks
        </p>
      </>
    );

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.id}`)}
      className='flex w-full flex-col gap-2 rounded-[10px] bg-custom-gray-light p-4'
    >
      <div className='relative rounded-[10px]'>
        {PromotePercent > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[10px] rounded-tl-[10px] bg-primary px-3 text-white'>
              <span className='custom-font-regular text-xs'>
                {productData.promotePercent}% OFF
              </span>
            </div>
          </>
        )}

        <div className='flex items-center justify-center'>
          <ImageLoader
            alt='product-img'
            src={productData?.imgUrl}
            className='h-full w-full rounded-[10px] object-cover'
          />
        </div>
      </div>
      <div className='mt-1'>
        <p className='line-clamp-2'>{productData.name}</p>
        <p>{productPriceSection}</p>
      </div>
    </div>
  );
};

export default ProductCard;
