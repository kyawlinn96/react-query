import { OrderDetailResponse } from '@/types';
import PriceDetail from '../Cart/PriceDetail';
import {
  getDeliveryFee,
  getSubTotal,
  getTotal,
  getTotalDiscount,
} from './utils';

const Amount = ({ data }: { data: OrderDetailResponse }) => {
  const subTotal = getSubTotal(data.orderItem);
  const deliveryFee = getDeliveryFee(data.weight, data.deliveryFee);
  const discount = getTotalDiscount(data.orderItem);
  const total = getTotal(data.orderItem, data.deliveryFee);

  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 py-3'>
        <span className='text-base font-semibold'>Amount</span>
      </div>
      <div className='flex flex-col gap-2 px-4 py-2 text-sm'>
        <PriceDetail
          name='Est Delivery Time'
          price={`${data.deliveryInfo.deliveryService.fromEstDeliveryDay} - ${data.deliveryInfo.deliveryService.toEstDeliveryDay} days`}
        />
        <PriceDetail name='Sub Total' price={subTotal} />
        {data.weight ? (
          <PriceDetail
            name='Weight'
            price={
              <>
                {data.weight.totalWeight} Kg{' '}
                {data.weight.finalWeightFee
                  ? `(+${data.weight.finalWeightFee} Ks)`
                  : null}
              </>
            }
          />
        ) : null}
        <PriceDetail name='Delivery Fee' price={deliveryFee} />
        <PriceDetail name='Discount' price={discount} isDiscount />
        <PriceDetail name='Total' price={total} isTotal />
      </div>
    </div>
  );
};

export default Amount;
