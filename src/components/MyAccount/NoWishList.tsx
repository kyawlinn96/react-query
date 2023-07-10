import React from 'react';
import NoWishListIcon from '@/assets/nowishlists.svg';
import { useNavigate } from 'react-router-dom';
const NoWishList = () => {
  const navigate = useNavigate();
  return (
    <div className='absolute z-20 flex min-h-[80vh] w-full items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <img src={NoWishListIcon} alt='' className='w-36' />
        <span className='px-2 text-xl font-semibold'>
          You currently have no WishLists!
        </span>
        <div
          className='mt-2 flex h-14 w-full cursor-pointer items-center justify-center rounded-xl  bg-primary-dark font-medium text-white'
          onClick={() => navigate('/')}
        >
          Explore Now
        </div>
      </div>
    </div>
  );
};
export default NoWishList;
