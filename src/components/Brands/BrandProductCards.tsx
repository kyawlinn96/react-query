import { BrandOfProductItems, ProductInfo } from '@/types';
import DummyIcon from '@/assets/dummy2.png';
import { useNavigate } from 'react-router-dom';

const BrandProductCard = ({
  productData,
}: {
  productData: BrandOfProductItems;
}) => {
  const navigate = useNavigate();

  let productPriceSection = (
    <p className='font-semibold text-primary'>
      {productData?.originalPrice.toLocaleString()} kyats
    </p>
  );

  if (productData?.promotePercent > 0)
    productPriceSection = (
      <>
        <p className='font-semibold text-primary'>
          {productData.promotePrice.toLocaleString()} kyats
        </p>
        <p className='text-sm font-light text-gray-600 line-through'>
          {productData.originalPrice.toLocaleString()} kyats
        </p>
      </>
    );

  console.log('data', productData);

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData?.productId}`)}
      className='flex w-full flex-col rounded-md bg-white p-2 shadow'
    >
      <div className='relative h-36 w-full overflow-hidden rounded-xl'>
        {productData?.promotePercent > 0 && (
          <>
            <div className='absolute top-0 z-20 rounded-br-md rounded-tl-md bg-primary px-3 text-white'>
              <span className=' text-sm'>
                {productData.promotePercent}% OFF
              </span>
            </div>
          </>
        )}

        <img
          src={productData?.url ? productData?.url : DummyIcon}
          alt='productimage'
          className='mx-auto h-full w-full object-contain '
          loading='lazy'
        />
      </div>
      <div className='mt-1'>
        <p className='line-clamp-2'>{productData?.name}</p>
        <p>{productPriceSection}</p>
      </div>
    </div>
  );
};
export default BrandProductCard;
