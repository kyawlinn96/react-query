import React from 'react';
import SectionHeading from '../CommonUi/SectionHeading';
import CustomSwiper from '../CustomSwiper/CustomSwiper';
import { SwiperSlide } from 'swiper/react';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  mainCategoryList: {
    id: number;
    name: string;
    url: string;
    statusCode: number;
    message: null;
    ref: null;
  }[];
}

const Category = ({ mainCategoryList }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToByCategory = () => {
    navigate(`/categories?categoryId=${0}`);
  };

  return (
    <div className='container py-2 md:hidden'>
      {/* ----- heading ----- */}
      <SectionHeading
        Heading={t('Home.categories')}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={goToByCategory}
        productLength={mainCategoryList.length}
      />

      {/* ----- categories ----- */}
      <div className='mobile-cate mb-2'>
        <CustomSwiper
          slidesPerView={2}
          grid={{
            rows: 2,
          }}
          className='pl-4'
        >
          {mainCategoryList.slice(0, 6).map((category) => (
            <SwiperSlide key={category?.id}>
              <CategoryCard categoryData={category} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </div>
  );
};

export default Category;
