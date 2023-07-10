import { useGetOrderHistory } from '@/api/order/order-history-query';
import BottomNavigation from '@/components/BottomNavigation';
import OrderListItem from '@/components/OrderListItem';
import IconAdjustment from '@/components/icon/IconAdjustment';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import IconXMark from '@/components/icon/IconXMark';
import TextField from '@/components/ui/TextField';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from './Loading';
import OrderListFilter from './OrderListFilter';
import useQueryParameters from '@/hooks/useQueryParameters';
import { orderListParams } from '@/utils/constants';

const OrderList = () => {
  const { query, updateQuery, deleteQueries } = useQueryParameters();

  const shopId = Number(query.get(orderListParams.SHOP_ID)) || 0;
  const orderDate = query.get(orderListParams.ORDER_DATE);
  const orderID = query.get(orderListParams.ORDER_ID);
  const orderStatusId = Number(query.get(orderListParams.ORDER_STATUS_ID)) || 0;

  const {
    isLoading,
    data,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetOrderHistory({
    userId: 3617870,
    orderStatusId,
    orderDate,
    shopId,
    voucherNo: orderID,
    pageSize: 10,
  });

  const [showFilter, setShowFilter] = useState(
    Boolean(shopId || orderDate || orderID || orderStatusId)
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleFilter = () => {
    if (showFilter) {
      deleteQueries();
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  const orderList = useMemo(
    () => data?.pages.flatMap((page) => page),
    [data?.pages]
  );
  const totalCount = orderList?.[0]?.totalCount;

  // if (shopNameListError) return <div>Loading</div>;

  return (
    <>
      <div className='sticky inset-x-0 top-0 z-10 bg-white pb-2'>
        <div className='flex items-center justify-between px-4 py-3'>
          <h3 className='text-xl font-semibold'>My Orders</h3>
        </div>
        <div className='flex items-center gap-2 px-4'>
          <TextField
            type='number'
            fullWidth
            startAdornment={<IconMagnifyingGlass className='text-black' />}
            placeholder='Search by Order ID'
            value={orderID || ''}
            onChange={(e) =>
              updateQuery({ [orderListParams.ORDER_ID]: e.target.value })
            }
          />
          <div
            onClick={handleFilter}
            className={cn(
              'rounded-[10px] border-2 p-2',
              showFilter ? 'border-primary bg-primary' : 'border-gray-200'
            )}
          >
            {showFilter ? (
              <IconXMark className='text-white' />
            ) : (
              <IconAdjustment className='text-primary' />
            )}
          </div>
        </div>
        {showFilter && <OrderListFilter />}
      </div>

      <div className='p-4 pt-0'>
        <div className='flex flex-col text-sm'>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className='p-4 text-center'>No results found.</div>
          ) : (
            <>
              {orderList && orderList.length > 0 ? (
                <>
                  <div className='py-1 text-[15px]'>
                    Total of {totalCount} Orders
                  </div>
                  <div className='mt-2 space-y-2'>
                    {orderList?.map((list) => (
                      <OrderListItem key={list.orderId} item={list} />
                    ))}
                    {hasNextPage && (
                      <div
                        ref={ref}
                        className='flex items-center justify-center text-sm'
                      >
                        Loading
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className='p-4 text-center'>No results found.</div>
              )}
            </>
          )}
        </div>
      </div>
      <div className='my-20'></div>
      <BottomNavigation />
    </>
  );
};

export default OrderList;
