import React from 'react';
import { SwiperSlide } from 'swiper/react';

// api
import { useGetProfile } from '@/api/profile/recent-view-query';

// components
import CustomSwiper from '@/components/CustomSwiper/CustomSwiper';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';

const RecentView = () => {
  const { data, isLoading, isError } = useGetProfile(6);

  return (
    <div className='mt-4 px-4'>
      <p className='mb-2 text-base font-semibold'>Recent Viewed</p>

      <CustomSwiper
        className='related-products'
        slidesPerView='auto'
        spaceBetween={10}
      >
        {data?.recentProductList?.slice(0, 6)?.map((product) => (
          <SwiperSlide className='h-auto !w-[150px]' key={product?.id}>
            <ProductCard productData={product} />
          </SwiperSlide>
        ))}
      </CustomSwiper>
    </div>
  );
};

export default RecentView;
