import { CartItem } from '@/types';
import PriceDetail from './PriceDetail';
import { getSubTotal, getTotal, getTotalDiscount } from './utils';

interface Props {
  products: CartItem[];
  deliveryFee: number;
}

const MakePayment = ({ products, deliveryFee }: Props) => {
  const subTotal = getSubTotal(products);
  const discount = getTotalDiscount(products);
  const total = getTotal(products, deliveryFee);

  return (
    <div className='mt-2 rounded-[10px] bg-white'>
      <div className='flex items-center justify-between border-b p-4 pb-2'>
        <span className='text-base font-semibold'>To Make Payment</span>
      </div>
      <div className='flex flex-col gap-2 px-4 py-2 text-sm'>
        <PriceDetail name='Est Delivery Time' price='3-5 days' />
        <PriceDetail name='Sub Total' price={subTotal} />
        <PriceDetail name='Delivery Fee' price={deliveryFee} />
        <PriceDetail name='Discount' price={discount} isDiscount />
        <PriceDetail name='Total' price={total} isTotal />
      </div>
    </div>
  );
};

export default MakePayment;
