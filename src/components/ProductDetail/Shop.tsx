import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  shop: {
    shopId: number;
    shopImageUrl: string;
    shopName: string;
  };
}

const Shop = ({ shop }: Props) => {
  return (
    <div className='px-4 py-3'>
      <p className='text text-gray-800'>Sell by</p>
      <div className='mt-3 flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <img
            src={shop?.shopImageUrl}
            alt='dummy-img'
            className='w-10 rounded-full'
          />
          <p>{shop?.shopName}</p>
        </div>
        <Link
          to={`/shops/${shop?.shopId}`}
          className='rounded-[5px] border bg-[#FAE9EA] px-3 text-sm text-[#CF202D]'
        >
          Visit
        </Link>
      </div>
    </div>
  );
};

export default Shop;
