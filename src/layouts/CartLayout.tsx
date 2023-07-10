import {
  useGetCartDetail,
  useGetCartDetailBuyNow,
} from '@/api/cart/cart-detail-query';
import useCartStore from '@/stores/cartStore';

import BottomNavigation from '@/components/BottomNavigation';
import { Outlet, useNavigate } from 'react-router-dom';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import IconChevron from '@/components/icon/IconChevron';
import { useEffect } from 'react';
import useQueryParameters from '@/hooks/useQueryParameters';

const CartLayout = () => {
  const navigate = useNavigate();
  const { query } = useQueryParameters();
  const {
    setTotalAmt,
    setNetAmt,
    setProductInfo,
    setDeliveryInfo,
    setDeliveryFee,
    setShopInfo,
    setIsBuyNow,
  } = useCartStore();
  const productId = Number(query.get('productId'));
  const skuId = Number(query.get('skuId'));
  const qty = Number(query.get('qty'));
  const isBuyNow = Boolean(productId && skuId && qty);

  const {
    isLoading: buyNowLoading,
    isError: buyNowError,
    data: buyNowData,
  } = useGetCartDetailBuyNow(
    {
      productId,
      skuId,
      qty,
    },
    { enabled: isBuyNow, refetchOnWindowFocus: false }
  );
  const { isLoading, isError, data } = useGetCartDetail({
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // here onSuccess is making a render problem so we used effect hook
    // check react-query v5 RFCs for further information
    // https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose
    if (isBuyNow) {
      if (!buyNowLoading && !buyNowError) {
        setTotalAmt(buyNowData.totalAmt);
        setNetAmt(buyNowData.netAmt);
        setIsBuyNow(true);
        setProductInfo(buyNowData.productInfo);
        setDeliveryInfo(buyNowData.deliveryInfo);
        setDeliveryFee(buyNowData.deliveryFee);
        setShopInfo(buyNowData.shopInfo);
      }
    } else {
      if (!isLoading && !isError) {
        setTotalAmt(data.totalAmt);
        setNetAmt(data.netAmt);
        setIsBuyNow(false);
        setProductInfo(data.productInfo);
        setDeliveryInfo(data.deliveryInfo);
        setDeliveryFee(data.deliveryFee);
        setShopInfo(data.shopInfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, buyNowLoading, isError, buyNowError, data, buyNowData]);

  const loading = (isBuyNow && buyNowLoading) || (!isBuyNow && isLoading);

  return (
    <>
      {/* {console.log('rendered with', productInfo, data)} */}
      <div className='sticky inset-x-0 top-0 z-40 flex h-12 items-center justify-between bg-white px-4 py-3'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2'
        >
          <IconChevron className='h-5 w-5' />
          <h3 className='text-xl font-semibold'>Cart</h3>
        </button>
      </div>
      {loading ? (
        <div className='bg-gray-100 p-4'>
          <div className='flex gap-3 rounded-[10px] bg-white p-4'>
            <SkeletonLoader className='h-20 w-20 rounded-md bg-gray-200' />
            <div className='flex grow flex-col'>
              <div className='flex items-center justify-between'>
                <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
              </div>
              <SkeletonLoader className='mt-2 h-5 w-1/3 rounded-md bg-gray-200' />
              <div className='mt-3 flex items-center justify-between'>
                <SkeletonLoader className='h-4 w-1/2 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='mt-4 flex gap-3 rounded-[10px] bg-white p-4'>
            <SkeletonLoader className='h-20 w-20 rounded-md bg-gray-200' />
            <div className='flex grow flex-col'>
              <div className='flex items-center justify-between'>
                <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
              </div>
              <SkeletonLoader className='mt-2 h-5 w-1/3 rounded-md bg-gray-200' />
              <div className='mt-3 flex items-center justify-between'>
                <SkeletonLoader className='h-4 w-1/2 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>

          <div className='mt-4 rounded-[10px] bg-white'>
            <div className='flex items-center justify-between p-4 pb-0'>
              <SkeletonLoader className='h-6 w-full rounded-md bg-gray-200' />
            </div>
            <div className='p-4'>
              <div className='flex flex-col items-start gap-2'>
                <SkeletonLoader className='h-6 w-2/3 rounded-md bg-gray-200' />
                <SkeletonLoader className='h-6 w-1/3 rounded-md bg-gray-200' />
              </div>
            </div>
          </div>
        </div>
      ) : isError ? (
        <div>Error.</div>
      ) : (
        <Outlet />
      )}
      <BottomNavigation />
    </>
  );
};

export default CartLayout;
