import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

// utils
import { goToSpecificPathNameWithData } from '@/utils/goToSpecificPathNameWithData';

// types
import { SearchType } from '@/types';
import { promotions } from '@/dummy/Dummy';

// components
import CustomSwiper from '../../CustomSwiper/CustomSwiper';
import SectionHeading from '../../CommonUi/SectionHeading';
import ProductCard from './ProductCardBestSelling';
import { useTranslation } from 'react-i18next';

interface Props {
  bestSellingProducts: {
    id: number;
    name: string;
    url: string;
    originalPrice: number;
    promotePrice: number;
    orderCount: number;
    isFav: boolean;
    isGetOne: boolean;
  }[];
}

const BestSelling = ({ bestSellingProducts }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickMore = () => {
    let propsState = {
      searchTypeName: 'Best Selling',
      searchType: SearchType.SEARCH_BEST_SELLING,
    };
    goToSpecificPathNameWithData(navigate, '/resultproducts', propsState);
  };

  return (
    <div className=''>
      {/* ----- heading ----- */}
      <SectionHeading
        Heading={`🔥 ${t('Home.best-selling')}`}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={handleClickMore}
        productLength={promotions.length}
      />

      {/* ----- best selling ----- */}
      <div className='mt-3'>
        <CustomSwiper slidesPerView='auto' spaceBetween={10} className='pl-4'>
          {bestSellingProducts?.slice(0, 6).map((product) => (
            <SwiperSlide className='!h-auto !w-[150px]' key={product?.id}>
              <ProductCard productData={product} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </div>
  );
};

export default BestSelling;
