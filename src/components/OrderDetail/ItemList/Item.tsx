import { OrderItem } from '@/types';
import { formatNumber } from '@/utils/number-utils';
import placeholderImage from '@/assets/placeholder.svg';

const Item = ({ item }: { item: OrderItem }) => {
  const {
    url,
    name,
    originalPrice,
    promotePercent,
    promotePrice,
    qty,
    weight,
  } = item;

  return (
    <div className='flex gap-3 border-b p-4 last:border-b-0'>
      <img
        src={url || placeholderImage}
        alt=''
        className='h-20 w-20 rounded-md border'
      />
      <div className='flex w-full flex-col'>
        <span className='text-base font-medium text-gray-900'>{name}</span>
        <span className='mt-0.5 text-sm text-gray-600'>
          {originalPrice} Ks/ pc
        </span>
        {weight ? (
          <span className='text-xs text-gray-600'>
            Weight: {weight.amount} {weight.symbol}
          </span>
        ) : null}
        <div className='mt-3 flex items-center justify-between'>
          <div className='inline-flex items-stretch gap-2'>
            <div className='rounded-[5px] bg-gray-100 px-6 py-1 text-xs'>
              {qty}
            </div>
          </div>
          <div className='flex flex-col items-end'>
            {promotePercent > 0 && (
              <span className='text-sm font-medium text-gray-400 line-through'>
                {formatNumber(originalPrice)} Ks
              </span>
            )}
            <span className='text-base font-semibold text-primary'>
              {formatNumber(
                promotePercent > 0 ? Math.round(promotePrice) : originalPrice
              )}{' '}
              Ks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
