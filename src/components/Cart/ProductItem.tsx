import { useUpdateProductCart } from '@/api/cart/product-qty-mutation';
import useCartStore from '@/stores/cartStore';
import { CartItem } from '@/types';
import { formatNumber } from '@/utils/number-utils';
import cn from 'classnames';
import IconTrash from '../icon/IconTrash';

const ProductItem = ({ data }: { data: CartItem }) => {
  const { addQty, removeQty, setShowRemoveProductModal, isBuyNow } =
    useCartStore();
  const { mutate } = useUpdateProductCart();
  const {
    productId,
    productUrl,
    name,
    price,
    promotePercent,
    promotePrice,
    qty,
    skuId,
    variation,
    weight,
    isShopAvailable,
  } = data;

  const updateQty = (add?: boolean) => {
    if (add) {
      addQty(productId);
      mutate({
        productCarts: [
          {
            productId,
            qty: qty + 1,
            skuId,
          },
        ],
      });
    } else {
      removeQty(productId);
      mutate({
        productCarts: [
          {
            productId,
            qty: qty - 1,
            skuId,
          },
        ],
      });
    }
  };

  return (
    <div
      className={cn('flex gap-3 border-b p-4 last:border-b-0', {
        'opacity-50': !isShopAvailable,
      })}
    >
      <img src={productUrl} alt='' className='h-20 w-20 rounded-md border' />
      <div className='flex w-full flex-col'>
        <div className='flex items-center justify-between'>
          <span className='line-clamp-2 text-base font-medium text-gray-900'>
            {name}
          </span>
          {!isBuyNow && (
            <button
              onClick={() => setShowRemoveProductModal(data)}
              className='rounded-md p-1 active:bg-gray-200'
            >
              <IconTrash />
            </button>
          )}
        </div>
        <span className='text-sm text-gray-800'>{price} Ks/ pc</span>
        {variation && variation !== 'Default' && (
          <span className='text-xs text-gray-600'>
            Product options: {variation}
          </span>
        )}
        {weight && (
          <span className='text-xs text-gray-600'>
            Weight: {weight.amount} {weight.symbol}
          </span>
        )}
        <div className='mt-3 flex items-center justify-between'>
          <div className='inline-flex items-stretch gap-2'>
            <button
              onClick={() => updateQty()}
              disabled={qty <= 1}
              className='disabled:opacity-50'
            >
              <img src='/img/icons/minus-fill.svg' alt='' />
            </button>{' '}
            <div className='rounded-[5px] border-2 border-gray-200 px-6 text-xs'>
              {qty}
            </div>{' '}
            <button onClick={() => updateQty(true)}>
              <img src='/img/icons/plus-fill.svg' alt='' />
            </button>
          </div>
          <div className='flex flex-col items-end'>
            {promotePercent > 0 && (
              <span className='text-sm font-medium text-gray-400 line-through'>
                {formatNumber(price)} Ks
              </span>
            )}
            <span className='text-base font-bold text-primary'>
              {formatNumber(promotePercent > 0 ? promotePrice : price)} Ks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
