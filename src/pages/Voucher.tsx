import { useGetVoucher } from '@/api/order/voucher-query';
import IconChevron from '@/components/icon/IconChevron';
import Loading from '@/components/ui/Loading';
import { commonDateFormat } from '@/utils/date-utils';
import { formatNumber } from '@/utils/number-utils';
import cn from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Divider = () => {
  return (
    <div className='relative w-full pb-4'>
      <p className='absolute left-0 top-1/2 w-full -translate-y-1/2 border border-dashed border-gray-600'></p>
    </div>
  );
};

interface ItemDetailProps {
  title: string;
  data: any;
  lineThrough?: boolean;
}
const ItemDetail = ({ title, data, lineThrough }: ItemDetailProps) => {
  return (
    <div className='flex items-center justify-between'>
      <span>{title}</span>

      <span className={cn({ 'line-through': lineThrough })}>{data}</span>
    </div>
  );
};

const Voucher = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { isLoading, data, isError } = useGetVoucher(Number(id));
  const weightFee =
    (data?.weightFeeInfo && data?.weightFeeInfo.finalWeightFee) || 0;

  if (isLoading) return <Loading open={true} />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className='sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-4 py-3 text-gray-800 shadow-sm'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2'
        >
          <IconChevron className='h-5 w-5' />
          <h3 className='text-xl font-semibold'>Voucher</h3>
        </button>
      </div>
      <div className='bg-gray-100 px-4 py-2'>
        <div className='mx-auto flex max-w-sm items-center justify-center'>
          <div className='fake-receipt max-w-sm bg-white p-4 text-xs text-black text-opacity-90'>
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <span className='text-base'>{data.shopName}</span>

                <div className='leading-5'>
                  {data.address ? data.address.split(',').join(', ') : ''}
                </div>
                <div>{data.phoneNo}</div>
              </div>
              <div className='flex flex-col space-y-2'>
                <div>Order ID: {data.voucherNo}</div>
                <div>
                  Cashier:{' '}
                  {data.shopName === 'Future Mall'
                    ? 'Future Mall Admin'
                    : data.cashier}
                </div>
                <div>Date: {commonDateFormat(data.orderDate)}</div>
              </div>

              <div className='flex gap-2'>
                <span>Qty</span>
                <Divider />
                <span>Ks</span>
              </div>

              {Array.isArray(data.itemList) &&
                data.itemList.length > 0 &&
                data.itemList.map((item, index) => (
                  <div key={item.productId} className='w-full'>
                    <div className='flow-root'>
                      <div className='flex'>
                        <span className='min-w-[2rem]'>{item.qty}</span>
                        <span className='w-full'>
                          {item.name}{' '}
                          {item.sku !== 'Default' && `(${item.sku})`}
                          {item.weight &&
                            `(Weight: ${item.weight.amount} ${item.weight.symbol})`}
                        </span>
                        <span className='min-w-[4rem] text-right'>
                          {formatNumber(item.originalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              <Divider />

              {data.weightFeeInfo.totalWeightInKg > 0 && (
                <ItemDetail
                  title='Total weight'
                  data={
                    <>
                      (
                      {Number.isSafeInteger(data.weightFeeInfo.totalWeightInKg)
                        ? data.weightFeeInfo.totalWeightInKg
                        : data.weightFeeInfo.totalWeightInKg.toFixed(2)}{' '}
                      {data.weightFeeInfo.symbol})&nbsp;
                      {data.weightFeeInfo.finalWeightFee > 0 && (
                        <span>
                          {formatNumber(data.weightFeeInfo.finalWeightFee)}
                        </span>
                      )}
                    </>
                  }
                />
              )}

              <div className='flex flex-col space-y-2'>
                <ItemDetail
                  title='Sub total'
                  data={formatNumber(data.totalAmount)}
                />

                <ItemDetail
                  title='Discount'
                  data={
                    data.discount > 0 ? (
                      <>- {formatNumber(data.discount)}</>
                    ) : (
                      '-'
                    )
                  }
                />

                <ItemDetail
                  title='Delivery Fee'
                  data={formatNumber(data.deliveryAmount - weightFee)}
                />

                {data.handlingFee > 0 && (
                  <ItemDetail
                    title='Handling Fee'
                    data={formatNumber(data.handlingFee)}
                  />
                )}

                {data.tax > 0 && (
                  <ItemDetail title='Tax' data={formatNumber(data.tax)} />
                )}
              </div>

              <Divider />

              {data.discount > 0 ? (
                <div className='flex items-center justify-between'>
                  <span className='text-lg'>Total</span>

                  <span>
                    {/* <span className='line-through'>
                      {formatNumber(data.totalAmount)}
                    </span> */}

                    <span className='text-lg'>
                      &nbsp;{formatNumber(data.netAmount)}
                    </span>
                  </span>
                </div>
              ) : (
                <div className='flex items-center justify-between'>
                  <span className='text-lg '>Total</span>

                  <span className='text-lg'>
                    {formatNumber(data.netAmount)}
                  </span>
                </div>
              )}

              <Divider />

              <div className='flex flex-col space-y-2'>
                <div>Ordered by: {data.buyerName}</div>
                <div>Address: {data.buyerAddress}</div>
                <div>Phone Number: {data.buyerPhoneNo}</div>
              </div>

              <div className='text-center'>
                <img
                  src={data.qrCode}
                  alt='QR Code'
                  className='d-block mx-auto w-1/4'
                />
                <div className='font-weight-bold py-4 text-center'>
                  Thank you. Please visit again
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voucher;
