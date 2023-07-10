import { useNavigate } from 'react-router-dom';

// types
import { ProductInfo } from '@/types';

// components
import ImageLoader from '@/utils/ImageLoader';

interface Props {
  productData: ProductInfo;
}
const ProductCard = ({ productData }: Props) => {
  const navigate = useNavigate();

  let productPriceSection = (
    <p className='font-semibold text-primary'>
      {productData?.originalPrice.toLocaleString()} Ks
    </p>
  );

  if (productData?.promotePercent > 0)
    productPriceSection = (
      <>
        <p className='font-semibold text-primary'>
          {productData.promotePrice.toLocaleString()} Ks
        </p>
        <p className='text-sm font-light text-gray-600 line-through'>
          {productData.originalPrice.toLocaleString()} Ks
        </p>
      </>
    );

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.id}`)}
      className='flex w-full flex-col rounded-[10px] bg-custom-gray-light p-4'
    >
      <div className='relative h-36 w-full overflow-hidden rounded-[10px]'>
        {productData?.promotePercent > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-[10px] rounded-tl-[10px] bg-primary px-3 text-white'>
              <span className=' text-sm'>
                {productData.promotePercent}% OFF
              </span>
            </div>
          </>
        )}

        <div className='flex items-center justify-center'>
          <ImageLoader
            alt='product-img'
            src={productData?.url}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <div className='mt-1'>
        <p className='line-clamp-2'>{productData?.name}</p>
        <p>{productPriceSection}</p>
      </div>
    </div>
  );
};
export default ProductCard;
