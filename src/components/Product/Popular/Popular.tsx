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
  popularProducts: {
    id: number;
    name: string;
    imgUrl: string;
  }[];
}

const Popular = ({ popularProducts }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickMore = () => {
    let propsState = {
      searchTypeName: 'Popular Products',
      searchType: SearchType.SEARCH_POPULAR_PRODUCTS,
    };
    goToSpecificPathNameWithData(navigate, '/resultproducts', propsState);
  };

  return (
    <div className='product-section'>
      <SectionHeading
        Heading={t('Home.popular-now')}
        ViewAll={t('Utils.view-more')}
        onClickViewMore={handleClickMore}
        productLength={popularProducts.length}
      />

      <div className='mr-4 mt-3 flex flex-wrap rounded-[10px] bg-gray-100'>
        {popularProducts?.slice(0, 6).map((product) => (
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
              <p className='line-clamp-2 h-[32px] text-xs leading-[15px]'>
                {product.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
