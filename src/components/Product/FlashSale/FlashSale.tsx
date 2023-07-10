import { flashSale } from '@/dummy/Dummy';
import moment from 'moment';
import React from 'react';
import CountdownTimer from '../../CommonUi/CountDownTimer';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../../CustomSwiper/CustomSwiper';
import FlashSaleProductCard from './FlashSaleProductCard';

const FlashSale = () => {
  return (
    <div className='my-8 p-2'>
      <div className=' relative flex h-auto w-full flex-col rounded-md bg-primary'>
        <div className='relative flex h-48 w-full'>
          <img
            src={flashSale?.mainUrl}
            alt='flash bg'
            className='h-full w-full object-right'
          />
          <div className='absolute left-4 top-10 flex w-1/2 flex-col'>
            <p className='text-base font-semibold leading-4 text-white'>
              {flashSale?.shopName}
            </p>
            <p className='text-lg font-bold text-white'>
              {flashSale?.description}
            </p>
            <div className=' mt-1 text-base text-white'>
              {`${moment(flashSale?.startDate).format('DD MMM')} - ${moment(
                flashSale?.endDate
              ).format('DD MMM')}`}
            </div>
          </div>

          {/* Count down timer */}
          <div className='absolute bottom-0 flex h-[70px] w-full items-center gap-2 bg-[#A61A24] p-2'>
            <div className='block w-4/12 items-center justify-center'>
              <p className='text-sm font-bold text-white'>Flash Sale Ends in</p>
            </div>
            <div className='w-8/12'>
              <CountdownTimer endDate={flashSale?.endDate} />
            </div>
          </div>
        </div>
        <div className='flash-sale-product px-3'>
          <CustomSwiper slidesPerView='auto' spaceBetween={10}>
            {flashSale?.flashSaleProduct.map((product) => (
              <SwiperSlide className='my-4 !w-36' key={product?.productId}>
                <FlashSaleProductCard productData={product} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
