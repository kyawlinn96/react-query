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
    <p className='text-md leading-5 text-primary'>
      {formatNumber(productData.originalPrice)}
      Ks
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
      className='flex h-full w-full flex-col rounded-[10px] bg-custom-gray-light p-4'
    >
      <div className='relative w-full overflow-hidden rounded-[10px]'>
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
            className='object-cover'
          />
        </div>
      </div>
      <p className='mt-1 line-clamp-2'>{productData.name}</p>
      <p className='mt-auto font-semibold'>{productPriceSection}</p>
    </div>
  );
};

export default ProductCard;
