// import DummyBg from "@/assets/category/shopbg.png";
import phoneIcon from '@/assets/phone.png';
import ForwardArrow from '@/assets/category/arrow.svg';
import Location from '@/assets/category/location.svg';

import { removeMyanmarSuffix } from '@/utils/removeMyanmarSuffix';

import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ShopDetailByShopResponse } from '@/types';

interface ShopLandingInfoProps {
  shopData: ShopDetailByShopResponse;
}

const ShopLandingInfo: React.FC<ShopLandingInfoProps> = ({ shopData }) => {
  const navigate = useNavigate();
  const goToShopLocation = (shop: ShopDetailByShopResponse) => {
    navigate('/shops/address', { state: shop });
  };

  return (
    <>
      <div className='relative h-auto w-full'>
        <div className='h-56 w-full overflow-hidden object-cover'>
          <img
            loading='lazy'
            src={shopData?.backGroundImgUrl}
            alt='shop bg'
            className='h-full w-full  object-cover'
          />
        </div>

        <div className='center-x-axis absolute bottom-5 flex w-10/12 flex-col overflow-hidden rounded-md  bg-black/30  backdrop-blur-md'>
          <div className='flex w-full items-center justify-start gap-3 p-3'>
            <div className='h-14 w-14 overflow-hidden rounded-md bg-white object-contain'>
              <img
                src={shopData?.shopImageUrl}
                alt='shop logo'
                className='h-full w-full'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-md font-medium leading-4 text-white'>
                {shopData?.shopName}
              </p>
              <p className='text-[12px]  text-white'>{shopData?.shopType}</p>
            </div>
          </div>
          <div
            className='flex border-t border-[#595959] py-1 text-white'
            onClick={() => goToShopLocation(shopData)}
          >
            <div className='flex w-1/2 items-center justify-start gap-1.5 border-r border-[#595959] px-2 py-2'>
              <img
                src={Location}
                alt='location'
                className=' h-auto w-4 object-contain'
              />
              <p className=' text-[13px] font-medium leading-4'>
                <span className='inline-block'>
                  {removeMyanmarSuffix(
                    removeMyanmarSuffix(shopData?.townshipName)
                  )}
                  ,{' '}
                </span>
                <span className='inline-block'>
                  {removeMyanmarSuffix(shopData?.cityName)}
                </span>
              </p>
            </div>
            <div className='flex w-1/2 justify-between p-2'>
              <div className='flex items-center gap-1.5'>
                <img
                  src={phoneIcon}
                  alt='phone'
                  className=' h-auto w-4 object-contain'
                />
                <p className='text-[13px] font-medium'>{shopData?.phoneNo}</p>
              </div>
              <img src={ForwardArrow} alt='forward' className='mr-2 w-3.5' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopLandingInfo;
