import { useNavigate } from 'react-router-dom';

// types
import { ProductItem } from '@/types';
import ImageLoader from '@/utils/ImageLoader';
import PlaceholderImg from '@/assets/placeholder.svg';

interface Props {
  productData: ProductItem;
}

const ShopLandingProductCard = ({ productData }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${productData.productId}`)}
      className='flex w-full flex-col gap-2 rounded-[10px] bg-custom-gray-light p-4'
    >
      <div className='h-36 w-full overflow-hidden rounded-xl'>
        <div className='flex items-center justify-center'>
          {productData?.productImage ? (
            <ImageLoader
              alt='product-img'
              src={productData?.productImage}
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
        <h3 className=' line-clamp-2'>{productData.productName}</h3>
        <p className='font-semibold text-primary'>
          {productData?.productPrice.toLocaleString()} ks
        </p>
      </div>
    </div>
  );
};

export default ShopLandingProductCard;
