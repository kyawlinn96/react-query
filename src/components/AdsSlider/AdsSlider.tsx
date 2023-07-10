import React from 'react';
import { SwiperSlide } from 'swiper/react';

// components
import CustomSwiper from '../CustomSwiper/CustomSwiper';

interface Props {
  adsList: {
    id: number;
    name: string;
    url: string;
    bannerLinkId: number;
    isWeb: number;
    brandId: null;
    seqNo: number;
    width: string;
    height: string;
    categoryId: null;
    categoryName: null;
    categoryImgUrl: null;
    productId: null;
    productName: null;
    searchKeyword: null;
    recommendedId: null;
  }[];
}

const AdsSlider = ({ adsList }: Props) => {
  return (
    <>
      {adsList?.length > 0 && (
        <div className='ads-slider my-2 w-full bg-white'>
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
            {adsList.map((ads) => (
              <React.Fragment key={ads.id}>
                <SwiperSlide className='!w-11/12'>
                  <img
                    width={358}
                    height={130}
                    src={ads.url}
                    className='w-full rounded-[10px]'
                    alt='ADSlider'
                  />
                </SwiperSlide>
              </React.Fragment>
            ))}
          </CustomSwiper>
        </div>
      )}
    </>
  );
};

export default AdsSlider;
