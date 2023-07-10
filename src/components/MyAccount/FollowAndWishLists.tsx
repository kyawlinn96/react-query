import React from 'react';
import WishListIcon from '@/assets/wishlists.svg';
import FollowShopIcon from '@/assets/followshop.svg';
import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';
import { useNavigate } from 'react-router-dom';

const FollowAndWishLists = () => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-flow-row grid-cols-2 gap-2 bg-primary px-4 pb-5 pt-2'>
      <h1 className='col-span-2 py-3 text-2xl font-semibold leading-4 text-white'>
        My Profile
      </h1>
      <div
        className='flex h-16 w-full cursor-pointer items-center justify-between gap-1 rounded-xl bg-white p-4 hover:bg-white/60'
        onClick={() => navigate('wishlists')}
      >
        <img src={WishListIcon} alt='wishlists' className='w-6' />
        <span className='w-[14ch] text-center text-sm font-semibold leading-5'>
          My Wish Lists
        </span>
        <ForwardArrow className='w-3.5 fill-gray-500' />
      </div>
      <div
        className='flex h-16 w-full cursor-pointer items-center justify-between rounded-xl bg-white p-4'
        onClick={() => navigate('/shops/followed')}
      >
        <img src={FollowShopIcon} alt='wishlists' className='w-6' />
        <span className='w-[10ch] text-left text-sm font-semibold leading-5'>
          Followed Shops
        </span>
        <ForwardArrow className='w-3.5 fill-gray-500' />
      </div>
    </div>
  );
};
export default FollowAndWishLists;
