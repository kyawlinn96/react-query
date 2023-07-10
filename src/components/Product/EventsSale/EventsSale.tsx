import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

// types
import { SearchType } from '@/types';

// components
import SectionHeading from '@/components/CommonUi/SectionHeading';
import CustomSwiper from '@/components/CustomSwiper/CustomSwiper';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';

interface Props {
  offerProducts: {
    promotionTypeId: number;
    promotionName: string;
    productPromotionList: {
      id: number;
      name: string;
      imgUrl: string | null;
      originalPrice: number;
      promotePrice: number;
      promotePercent: number;
    }[];
  }[];
}

const EventsSale = ({ offerProducts }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickMore = () => {
    let propState = {
      searchTypeName: 'Promotions',
      searchType: SearchType.SEARCH_PROMOTION,
    };

    navigate('/resultproducts', { state: propState });
  };

  return (
    <div className='my-4'>
      {offerProducts.map((product) => (
        <React.Fragment key={product?.promotionTypeId}>
          <SectionHeading
            Heading={product.promotionName}
            ViewAll={t('Utils.view-more')}
            onClickViewMore={handleClickMore}
            productLength={product?.productPromotionList.length}
          />
          <div className='my-3'>
            <CustomSwiper
              className='related-products pl-4'
              slidesPerView='auto'
              spaceBetween={10}
            >
              {product?.productPromotionList.slice(0, 6).map((product) => (
                <SwiperSlide className='!h-auto !w-[150px]' key={product?.id}>
                  <ProductCard productData={product} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default EventsSale;
