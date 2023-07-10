import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import cn from 'classnames';

// api
import { useUpdateWishList } from '@/api/myaccount/myaccount-update-whishlists';

// components
import IconWishlist from '../icon/IconWishlist';
import { toaster } from '@/components/ui/Toast';
import { ProductDetailResponse } from '@/api/product-detail/product-detail-query';

interface Props {
  product: ProductDetailResponse;
}

const ProductInfo = ({ product }: Props) => {
  const {
    name,
    originalPrice,
    promotePercent,
    promotePrice,
    isBestSelling,
    soldQty,
    isFav,
  } = product;
  const { productId } = useParams();

  const updateWishList = useUpdateWishList();

  const handleWishList = () => {
    const postData = {
      productId: Number(productId),
      isFav: !isFav,
    };

    updateWishList.mutate(postData, {
      onSuccess() {
        if (!isFav) {
          toaster.show('Successfully added to wishlists.');
        } else {
          toaster.show('Successfully removed from wishlists.');
        }
      },
      onError() {
        toaster.show('Fail to update wishlists');
      },
    });
  };

  return (
    <div className='px-4 pb-3'>
      {isBestSelling && <p>🔥 Best Selling</p>}

      <div className='flex items-center gap-x-2'>
        <p className='text-2xl font-[700] text-primary'>
          {promotePercent > 0
            ? promotePrice.toLocaleString()
            : originalPrice.toLocaleString()}{' '}
          Ks
        </p>
        {promotePercent > 0 && (
          <p className='rounded-[5px] border-2 border-primary bg-primary-light px-3 text-sm text-primary'>
            {promotePercent}% Off
          </p>
        )}
        {promotePercent > 0 && (
          <p className='text-gray-400 line-through'>{originalPrice} Ks</p>
        )}
      </div>

      <p className='mt-2 text-lg font-medium'>{name}</p>

      <div className='mt-2 flex items-center gap-x-3'>
        {soldQty > 0 && <p className='font-light'>{soldQty} Sold</p>}
        {soldQty > 0 && <p>|</p>}
        <div
          className='flex cursor-pointer items-center gap-x-2'
          onClick={handleWishList}
        >
          <IconWishlist
            className={cn('w-4', isFav ? 'fill-red-500' : 'fill-gray-500')}
          />
          <p
            className={cn(
              'text-sm font-medium',
              isFav ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {isFav ? 'Favourite' : 'Add to wishlist'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
