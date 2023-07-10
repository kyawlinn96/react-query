import { commonDateFormat } from '@/utils/date-utils';
import IconOrderStep1 from '../icon/IconOrderStep1';
import IconOrderStep2 from '../icon/IconOrderStep2';
import IconOrderStep3 from '../icon/IconOrderStep3';
import IconOrderStep4 from '../icon/IconOrderStep4';
import OrderStep from './OrderStep';

interface Props {
  voucherNo: string;
  orderDate: string;
  orderStatus: {
    id: number;
    name: string;
  };
  orderCancelStatus: {
    id: number;
    name: string;
  };
}

const OrderStatus = ({
  voucherNo,
  orderDate,
  orderStatus,
  orderCancelStatus,
}: Props) => {
  const isDeleted = orderStatus.id === 5;

  return (
    <div className='rounded-[10px] bg-white'>
      <div className='px-4 pt-4 text-center text-lg font-bold'>
        <span>#{voucherNo}</span>
      </div>
      <div className='mt-2 text-center text-sm text-gray-800'>
        <span>Order placed on {commonDateFormat(orderDate)}</span>
      </div>
      <div className='flex justify-center px-8 py-4 text-sm'>
        <div className='flex flex-1 flex-col items-center text-primary'>
          <IconOrderStep1 />
          <span>Ordered</span>
        </div>
        <OrderStep
          text='Packed'
          stepId={2}
          isDeleted={isDeleted}
          orderStatusId={orderStatus.id}
          cancelStatusId={orderCancelStatus.id}
          IconComponent={IconOrderStep2}
        />
        <OrderStep
          text='Delivering'
          stepId={3}
          isDeleted={isDeleted}
          orderStatusId={orderStatus.id}
          cancelStatusId={orderCancelStatus.id}
          IconComponent={IconOrderStep3}
        />
        <OrderStep
          text='Delivered'
          stepId={4}
          isDeleted={isDeleted}
          orderStatusId={orderStatus.id}
          cancelStatusId={orderCancelStatus.id}
          IconComponent={IconOrderStep4}
        />
      </div>
    </div>
  );
};

export default OrderStatus;
