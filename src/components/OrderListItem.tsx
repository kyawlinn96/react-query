import { OrderHistoryResponse } from '@/types';
import { commonDateFormat } from '@/utils/date-utils';
import { formatNumber } from '@/utils/number-utils';
import { useNavigate } from 'react-router-dom';
import IconTrash from './icon/IconTrash';
import placeholderImage from '@/assets/placeholder.svg';

interface Props {
  item: OrderHistoryResponse;
}

const OrderListItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const orderStatus: { [key: number]: string } = {
    1: 'Ordered',
    2: 'Packed',
    3: 'Delivering',
    4: 'Delivered',
    5: 'Deleted',
  };

  return (
    <div
      onClick={() => navigate(`${item.orderId}`)}
      key={item.orderId}
      className='rounded-[10px] bg-primary'
    >
      {item.orderStatusId === 5 && (
        <div className='flex items-center justify-center gap-2 rounded-t-[10px] bg-primary py-1 text-xs text-white'>
          <IconTrash className='h-3 w-3' />
          This order has been deleted.
        </div>
      )}
      <div className='flex gap-2 rounded-[10px] bg-gray-100 p-4'>
        <div className='h-20 w-20 shrink-0 rounded-md bg-white'>
          <img
            src={item.productUrl || placeholderImage}
            className='h-20 w-20 rounded-md'
            alt=''
          />
        </div>
        <div className='flex w-full flex-col justify-between'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-medium'>#{item.voucherNo}</span>
            <span className='text-xs text-gray-600'>
              {commonDateFormat(item.createdDate)}
            </span>
          </div>
          <div className='flex w-fit items-center gap-1 rounded-[3px] bg-white pr-2 font-medium text-gray-600'>
            <img src='/img/icons/order-ordered.svg' alt='' />
            <span className='text-xs'>{orderStatus[item.orderStatusId]}</span>
          </div>
          <div className='flex items-center justify-end text-gray-600'>
            <span className='text-xs'>{item.totalCount} items, total</span>
            &nbsp;
            <span className='text-sm font-semibold text-primary'>
              {formatNumber(item.price)} Ks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
