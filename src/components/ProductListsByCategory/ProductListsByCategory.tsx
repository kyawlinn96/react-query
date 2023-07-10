import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

// types
import { SearchType } from '@/types';

// components
import Button from '../CommonUi/Button';
import CustomSwiper from '../CustomSwiper/CustomSwiper';
import ProductCardCategory from './ProductCardCategory';

// assets
import ForwardArrowIcon from '@/assets/category/arrow.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  productList: {
    id: number;
    name: string;
    url: string;
    backgroundUrl: string;
    mainCategoryId: number;
    productListBuyers: {
      productId: number;
      productTypeId: number;
      url: string;
      name: string;
      promotePercent: number;
      isGetOne: boolean;
      createdDate: string;
    }[];
  }[];
}

const ProductListsByCategory = ({ productList }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleViewMore = (product: any) => {
    let propsState = {
      searchType: SearchType.SEARCH_BY_CATEGORY,
      categoryId: product?.id,
      categoryData: product,
    };
    navigate('/resultproducts', { state: propsState });
  };

  return (
    <div className='relative mt-6 flex flex-col gap-y-6'>
      {productList?.slice(0, 4)?.map((product) => (
        <div className='flex flex-col px-4' key={product.id}>
          <div className='relative flex flex-col rounded-[10px] bg-custom-gray-light'>
            <div className='h-28 w-full object-contain'>
              <img
                src={product?.backgroundUrl}
                alt='mobile bg'
                className='h-full w-full rounded-t-[10px] object-cover brightness-75'
              />
            </div>
            <Button
              action={() => handleViewMore(product)}
              iconBack={ForwardArrowIcon}
              title={t('Utils.view-more')}
              classProps='py-2 absolute right-5 top-5 text-sm flex items-center gap-2 text-white px-3 backdrop-blur-md bg-[#00000050] rounded-md'
              loadingColor='#FFF'
            />
            <div className='flex items-center justify-start gap-2 px-2'>
              <div className='z-10 -mt-7 flex h-14 w-14 items-center justify-center rounded-md bg-white'>
                <img
                  src={product?.url}
                  alt='cate'
                  className='h-8 w-8 object-contain'
                />
              </div>
              <div className='text-md my-2 font-semibold'>{product?.name}</div>
            </div>
            <div className='p-2'>
              <CustomSwiper slidesPerView='auto' navigation={false}>
                {product?.productListBuyers?.slice(0, 6).map((product) => (
                  <SwiperSlide className='flex !w-28' key={product.productId}>
                    <ProductCardCategory productData={product} />
                    <div className='mx-1 w-1 border-r border-dashed border-[#D9D9D9]'></div>
                  </SwiperSlide>
                ))}
              </CustomSwiper>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListsByCategory;
