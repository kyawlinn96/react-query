import React from 'react';
import { SwiperSlide } from 'swiper/react';

// components
import CustomSwiper from '../CustomSwiper/CustomSwiper';

interface Props {
  bannerList: {
    id: number;
    name: string;
    url: string;
    bannerLinkId: number;
    isWeb: number;
    brandId: null;
    seqNo: number;
    width: string;
    height: string;
    categoryId: number;
    categoryName: null;
    categoryImgUrl: null;
    productId: number;
    productName: null;
    searchKeyword: null;
    recommendedId: null;
  }[];
}

const BannerSlider = ({ bannerList }: Props) => {
  return (
    <>
      {bannerList?.length > 0 && (
        <div className='mobile-slider my-3 w-full bg-white'>
          <CustomSwiper
            slidesPerView='auto'
            navigation={false}
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {bannerList?.map((data) => (
              <SwiperSlide key={data.id}>
                <img
                  src={data?.url}
                  alt='mobile banner'
                  className='h-[130px] w-full rounded-[10px] object-fill'
                />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      )}
    </>
  );
};

export default BannerSlider;
