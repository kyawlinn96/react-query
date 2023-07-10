import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

// api
import { useGetShopList } from '@/api/shoplist/shoplist-query';

// hook
import useDebounce from '@/hooks/useDebounce';

// components
import ShopCard from '@/components/ShopList/ShopCard';
import Loading from './Loading';

// icons
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import IconDoubleCheck from '@/components/icon/IconDoubleCheck';
import IconChevronBack from '@/components/icon/IconChevronBack';
import IconXCircle from '@/components/icon/IconXCircle';

const ShopList = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearch = useDebounce(searchTerm, 500);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetShopList(debounceSearch, false, 10);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const shopListData = (data?.pages || []).flatMap((page) => page.shops);

  if (isError) return null;

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* ----- search box ----- */}
      <div className='sticky top-0 z-10 bg-[#FFFFFF] px-4 py-3'>
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <IconChevronBack onClick={() => navigate(-1)} />
            <p className='text-[20px] font-semibold'>Shop List</p>
          </div>
          <IconXCircle />
        </div>
        <div className='flex items-center gap-x-3'>
          <div className='flex h-[36px] w-[100%] items-center justify-between rounded-md border border-[#EEEEEE] px-4 py-2'>
            <div className='cursor-pointer'>
              <IconMagnifyingGlass />
            </div>
            <input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='ml-3 w-[100%] bg-transparent placeholder:text-sm focus:outline-none'
            />
          </div>
          <div
            className='rounded-md border border-[#EEEEEE] px-3 py-2'
            onClick={() => navigate('followed')}
          >
            <IconDoubleCheck className='text-primary' />
          </div>
        </div>
      </div>

      <div className='px-4 py-3'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p className='mb-3 text-gray-600'>{shopListData.length} Shops</p>

            {shopListData?.map((data) => (
              <ShopCard shopList={data} key={data.shopId} />
            ))}

            <div ref={ref} className='py-3 text-center'>
              {hasNextPage
                ? isFetchingNextPage
                  ? 'Loading more...'
                  : 'Load more'
                : 'No more results'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopList;
