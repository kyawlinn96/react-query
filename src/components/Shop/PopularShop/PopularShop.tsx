import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';

// components
import SectionHeading from '../../CommonUi/SectionHeading';
import CustomSwiper from '../../CustomSwiper/CustomSwiper';
import ImageLoader from '@/utils/ImageLoader';
import { useTranslation } from 'react-i18next';

interface Props {
  popularShops: {
    shopId: number;
    shopName: string;
    imageUrl: string;
    isFollowed: boolean;
    popularPercent: number;
    products: {
      productId: number;
      productImg: string;
      createdDate: string;
    }[];
  }[];
}

const PopularShop = ({ popularShops }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToShopLists = () => {
    navigate('/shops');
  };

  return (
    <div className='my-2 mt-4 flex flex-col py-2'>
      <SectionHeading
        Heading={`🛒 ${t('Home.popular-shop')}`}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={goToShopLists}
        productLength={popularShops.length}
      />
      <div className='mt-3 flex flex-col gap-3 px-4 md:hidden'>
        {popularShops?.slice(0, 5)?.map((shop) => (
          <div
            className='flex w-full flex-col rounded-[10px] bg-custom-gray-light p-3'
            key={shop?.shopId}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-center gap-2'>
                <div className='w-11'>
                  <img
                    src={shop?.imageUrl}
                    alt='shop logo'
                    className='h-10 w-10 rounded-full object-contain'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium leading-[17px] text-gray-800'>
                    {shop?.shopName}
                  </p>
                </div>
              </div>
              <Link
                to={`/shops/${shop?.shopId}`}
                className='rounded-md bg-primary-light px-4 py-1 font-medium text-primary'
              >
                <p className='text-xs font-medium text-primary'>
                  {t('Utils.visit')}
                </p>
              </Link>
            </div>

            <div className='my-3 w-full border-t border-dashed border-[#D9D9D9]' />

            <div className='shop-products'>
              <CustomSwiper slidesPerView='auto' spaceBetween={5}>
                {shop?.products.slice(0, 10).map((product) => (
                  <SwiperSlide className='!w-16' key={product?.productId}>
                    <div
                      className='flex items-center justify-center rounded-md bg-white'
                      onClick={() =>
                        navigate(`/productdetail/${product.productId}`)
                      }
                    >
                      <ImageLoader
                        alt='product-img'
                        src={product?.productImg}
                        className='h-[60px] w-[60px] rounded-md object-cover'
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularShop;
