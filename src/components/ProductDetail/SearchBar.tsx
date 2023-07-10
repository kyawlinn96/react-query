import React from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { SearchType } from '@/types';

// api
import { useGetCartDetail } from '@/api/cart/cart-detail-query';

// icons
import IconBack from '../icon/IconBack';
import IconMagnifyingGlass from '../icon/IconMagnifyingGlass';
import IconShare from '../icon/IconShare';
import IconCart from '../icon/IconCart';
import IconXCircle from '../icon/IconXCircle';

const SearchBar = () => {
  const navigate = useNavigate();

  const { data } = useGetCartDetail();
  const totalCountProductCount = data?.productInfo.reduce(
    (total, product) => total + product.qty,
    0
  );

  const goToProductSearch = () => {
    navigate('/productsearch', {
      state: { searchType: SearchType.SEARCH_BY_NAME },
    });
  };

  return (
    <div className='sticky inset-x-0 top-0 z-[2] flex h-12 items-center gap-x-3 bg-white px-4 py-[10px]'>
      <div onClick={() => navigate(-1)}>
        <IconBack />
      </div>

      <div className='relative flex-grow' onClick={goToProductSearch}>
        <input
          type='text'
          placeholder='Search By Name'
          className='w-full rounded-[10px] bg-gray-100 px-4 py-1 pl-10 caret-black placeholder:text-xs placeholder:leading-[14.52px] focus:outline-none focus:ring-2 focus:ring-primary'
        />
        <div className='center-y-axis absolute left-3 w-5'>
          <IconMagnifyingGlass />
        </div>
      </div>

      <div className='flex items-center gap-x-3'>
        <IconShare />

        <div className='relative' onClick={() => navigate(`/cart`)}>
          <IconCart />

          {totalCountProductCount > 0 && (
            <p className='absolute -right-2 -top-2 rounded-full bg-primary-dark px-1 text-xs text-white'>
              {totalCountProductCount}
            </p>
          )}
        </div>

        {/* <IconXCircle /> */}
      </div>
    </div>
  );
};

export default SearchBar;
