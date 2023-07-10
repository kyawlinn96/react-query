import React from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import { goToSpecificPathNameWithData } from '@/utils/goToSpecificPathNameWithData';

// types
import { SearchType } from '@/types';

// components
import SectionHeading from '@/components/CommonUi/SectionHeading';
import ImageLoader from '@/utils/ImageLoader';
import { useTranslation } from 'react-i18next';

interface Props {
  newArrivalProducts: {
    id: number;
    name: string;
    imgUrl: string;
  }[];
}

const NewArrival = ({ newArrivalProducts }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickMore = () => {
    let propsState = {
      searchTypeName: 'New Arrivals',
      searchType: SearchType.SEARCH_LATEST,
    };
    goToSpecificPathNameWithData(navigate, '/resultproducts', propsState);
  };

  return (
    <div className='product-section'>
      {/* ----- heading ----- */}
      <SectionHeading
        Heading={t('Home.new-arrival')}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={handleClickMore}
        productLength={newArrivalProducts?.length}
      />

      {/* ----- new arrival ----- */}
      <div className='ml-4 mt-3 flex flex-wrap rounded-[10px] bg-gray-100'>
        {newArrivalProducts?.slice(0, 6).map((product) => (
          <div
            onClick={() => navigate(`/productdetail/${product?.id}`)}
            key={product?.id}
            className='latest-product relative flex w-1/2 flex-col gap-1 p-[10px]'
          >
            <ImageLoader
              alt='product-img'
              src={product?.imgUrl}
              className='h-full w-full rounded-[5px] object-cover'
            />
            <div className='flex flex-col justify-between gap-1'>
              <p className='line-clamp-2 h-[32px] text-xs leading-4'>
                {product.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
