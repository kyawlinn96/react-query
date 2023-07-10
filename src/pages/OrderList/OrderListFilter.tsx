import { useGetShopNameSuggestionSeller } from '@/api/miscellaneous/shopname-suggestion-query';
import IconCalendarDays from '@/components/icon/IconCalendarDays';
import IconChevron from '@/components/icon/IconChevron';
import IconXMark from '@/components/icon/IconXMark';
import DropDown from '@/components/ui/DropDown';
import { Combobox, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { useEffect, useState, Fragment, useRef } from 'react';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { useInView } from 'react-intersection-observer';
import useQueryParameters from '@/hooks/useQueryParameters';
import { orderListParams } from '@/utils/constants';

const orderStatusList = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Ordered' },
  { id: 2, name: 'Packed' },
  { id: 3, name: 'Delivering' },
  { id: 4, name: 'Delivered' },
  { id: 5, name: 'Canceled' },
];

const OrderListFilter = () => {
  const { query, updateQuery, deleteQuery } = useQueryParameters();
  const shopId = Number(query.get(orderListParams.SHOP_ID)) || 0;
  const orderDate = query.get(orderListParams.ORDER_DATE);
  const orderStatusId = Number(query.get(orderListParams.ORDER_STATUS_ID)) || 0;

  const orderStatus = orderStatusList.find((v) => v.id === orderStatusId);
  const datePickerRef = useRef(null);
  const [selectedShop, setSelectedShop] = useState({
    shopId: shopId,
    shopName: query.get(orderListParams.SHOP_NAME),
    shopImageUrl: '',
  });
  const [shopName, setShopName] = useState('');
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetShopNameSuggestionSeller(shopName, 10);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const shopList = data?.pages?.flatMap((page) => page);

  return (
    <div className='mt-2 px-4'>
      <Combobox
        value={selectedShop}
        onChange={(value) => {
          updateQuery({ [orderListParams.SHOP_ID]: value.shopId });
          setSelectedShop(value);
        }}
      >
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left shadow-sm focus:outline-none sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
              displayValue={(option: any) => option?.shopName}
              placeholder='Select Shop'
              onChange={(e) => setShopName(e.target.value)}
            />
            <Combobox.Button className='absolute inset-0 flex items-center justify-end pr-2'>
              <IconChevron
                className='h-3 w-3 text-gray-400'
                direction='bottom'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {shopList?.length === 0 ? (
                <div className='relative cursor-default select-none px-4 py-2'>
                  Nothing found.
                </div>
              ) : (
                shopList?.map((option) => (
                  <Combobox.Option
                    key={option.shopId}
                    className='relative select-none border-t p-2 pr-4'
                    value={option}
                  >
                    <div className='flex items-center gap-x-2 text-sm font-medium'>
                      <img
                        src={option.shopImageUrl}
                        alt=''
                        className='h-8 w-8 rounded-full'
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          // e.currentTarget.src = defaultImg;
                        }}
                      />
                      <span className='block truncate'>{option.shopName}</span>
                    </div>
                  </Combobox.Option>
                ))
              )}
              <div ref={ref} className='p-4 text-center text-xs'></div>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <div className='mt-2 grid grid-cols-2 gap-2'>
        <DropDown
          value={orderStatus?.name || 'Order Status'}
          options={orderStatusList}
          renderOption={(option) => (
            <div
              key={option.id}
              onClick={() =>
                updateQuery({ [orderListParams.ORDER_STATUS_ID]: option.id })
              }
              className='p-2 text-sm'
            >
              {option.name}
            </div>
          )}
        />
        <div className='flex items-center rounded-[10px] border-2'>
          <DatePicker
            portal
            ref={datePickerRef}
            className='rmdp-mobile'
            format='DD/MM/YYYY'
            placeholder='Order Date'
            highlightToday={false}
            calendarPosition='bottom-start'
            containerClassName='w-full'
            inputClass='w-full cursor-pointer placeholder:text-gray-900 rounded-md p-2 text-sm focus:outline-none'
            value={new Date(orderDate || '')}
            onChange={(date) =>
              updateQuery({
                [orderListParams.ORDER_DATE]: dayjs(date as any).format(
                  'YYYY-MM-DD'
                ),
              })
            }
          />
          {orderDate ? (
            <button
              onClick={() => deleteQuery(orderListParams.ORDER_DATE)}
              className='ml-auto mr-2 text-gray-600'
            >
              <IconXMark className='h-4 w-4' />
            </button>
          ) : (
            <IconCalendarDays
              direction='bottom'
              className='ml-auto mr-2 h-4 w-4 text-gray-600'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderListFilter;
