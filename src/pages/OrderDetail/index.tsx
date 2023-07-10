import { useGetOrderDetail } from '@/api/order/order-detail-query';

import DeliveryService from '@/components/Cart/DeliveryService';
import ShopInfo from '@/components/Cart/ShopInfo';
import Amount from '@/components/OrderDetail/Amount';
import ItemList from '@/components/OrderDetail/ItemList';
import OrderDeliveryInfo from '@/components/OrderDetail/OrderDeliveryInfo';
import OrderStatus from '@/components/OrderDetail/OrderStatus';
import PaymentRecord from '@/components/OrderDetail/PaymentRecord';
import IconChevron from '@/components/icon/IconChevron';
import Button from '@/components/ui/Button';

import messageIcon from '@/assets/order_message.svg';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number(orderId)) {
      navigate('/orders', { replace: true });
    }
  }, [orderId]);

  const { isLoading, data, isError } = useGetOrderDetail(Number(orderId) || 0);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error.</div>;

  return (
    <>
      <div className='bg-gray-100'>
        <div className='fixed inset-x-0 top-0 h-52 bg-primary'></div>
        <div className='sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-primary px-4 py-3 text-white'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2'
          >
            <IconChevron className='h-5 w-5' />
            <h3 className='text-xl font-semibold'>Order Details</h3>
          </button>
        </div>
        <div className='relative px-4 py-2'>
          <OrderStatus
            voucherNo={data.voucherNo}
            orderDate={data.orderDate}
            orderStatus={data.orderStatus}
            orderCancelStatus={data.orderCancelStatus}
          />

          <ItemList products={data?.orderItem} shopList={data?.shopInfo} />

          {data.shopInfo.length === 1 ? (
            <ShopInfo info={data.shopInfo[0]} />
          ) : null}

          <OrderDeliveryInfo info={data.deliveryInfo} />

          <DeliveryService />

          <PaymentRecord date={data.paymentInfo[0].createdDate} />

          <Amount data={data} />

          <Button
            onClick={() => navigate(`/voucher?id=${orderId}`)}
            fullWidth
            className='my-4 !text-base'
          >
            Get Voucher
          </Button>
        </div>
      </div>

      <button
        onClick={() => navigate('messages')}
        className='fixed bottom-4 right-4'
      >
        <img src={messageIcon} alt='' className='h-14 w-14' />
      </button>
    </>
  );
};

export default OrderDetail;
