import { useShopListsStore } from '@/stores/ShopListsStore/useShopListStore';
import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import cn from 'classnames';
import DownChevron from '@/assets/down_black.svg';
import PlaceholderImg from '@/assets/placeholder.svg';
import DummyLogo from '@/assets/dummy.jpg';
import { useProductSearchStore } from '@/stores/ResultProduct/productSearchStore';
import { useNavigate } from 'react-router-dom';
import { SearchType, SortType } from '@/types';
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';
import { shallow } from 'zustand/shallow';
import ImageLoader from '@/utils/ImageLoader';

const ShopLandingCategory = () => {
  const navigate = useNavigate();
  const { shopDetail } = useShopLandingStore(
    (state) => ({
      shopDetail: state.shopDetail,
    }),
    shallow
  );

  const ShopCategory = useProductSearchStore(
    (state) => state.productSearchCategoryByShop
  );

  const [currId, setCurrId] = useState(
    ShopCategory?.mainCategory !== null ? ShopCategory?.mainCategory[0]?.id : 0
  );

  let currCateData = ShopCategory?.mainCategory?.find(
    (cate) => cate.id === currId
  );

  const withSubCategoryOne = (category: any) => {
    const propsState = {
      mainCategory: currCateData,
      subCategoryData: category,
      searchType: SearchType.SEARCH_SUB_CATEGORY,
      shopData: shopDetail,
      sortType: SortType?.DEFAULT,
    };
    navigate('/viewbycategory', { state: propsState });
  };

  const withSubNestCategory = (subNestCat: number) => {
    console.log(subNestCat);
  };
  const searchByCategory = () => {
    const propsState = {
      searchType: SearchType.SEARCH_BY_CATEGORY,
      categoryId: currCateData?.productCategoryId,
      categoryData: currCateData,
      shopData: shopDetail,
    };
    navigate('/resultproducts', { state: propsState });
  };

  return (
    <>
      <div className=' my-3 px-4  text-xl font-semibold text-black'>
        {ShopCategory?.mainCategory?.length} Main Categories
      </div>
      <div className='flex'>
        <div className='flex w-3/12  flex-col gap-2 bg-[#F7F7F7]'>
          {ShopCategory?.mainCategory?.map((category) => (
            <div
              key={category.id}
              className={cn(
                'flex  w-full cursor-pointer flex-col items-center justify-center gap-2  py-2',
                category?.id === currId && 'bg-primary-dark text-white'
              )}
              onClick={() => setCurrId(category?.id)}
            >
              {category?.url ? (
                <ImageLoader
                  alt='curr-cat-logo'
                  src={category?.url}
                  className='h-12 w-12 rounded-md object-cover'
                />
              ) : (
                <img
                  src={PlaceholderImg}
                  alt='placeholder'
                  className='w-12 object-cover'
                />
              )}
              <p className='text-center text-sm'>{category?.name}</p>
            </div>
          ))}
        </div>
        <div className='flex w-9/12 flex-col gap-1 '>
          <div className='flex   w-full items-center justify-center bg-transparent'>
            <ImageLoader
              alt='cat-bg'
              className='h-36 w-full object-cover'
              src={currCateData?.backgroundUrl!}
            />
          </div>
          <div className='px-4'>
            <div
              className='text-md my-1 w-full rounded-xl bg-primary-dark py-3 text-center font-medium text-white'
              onClick={searchByCategory}
            >
              View All Products
            </div>
          </div>
          <div className=' p-2 text-base  text-[#1E1E1E]'>Sub Category</div>
          <div className=''>
            {currCateData?.subCategory1?.map((subcat, index) => (
              <Disclosure key={subcat.id}>
                <Disclosure.Button className='w-full'>
                  <div
                    key={subcat?.id}
                    className={`flex p-2 ${
                      index === 0 &&
                      'border-custom-gray-light-2 border-t-2 border-dashed'
                    } border-custom-gray-light-2 cursor-pointer items-center justify-between border-b-2 border-dashed`}
                  >
                    <div
                      className='flex grow items-center gap-2'
                      onClick={(event) => {
                        event.stopPropagation();
                        withSubCategoryOne(subcat);
                      }}
                    >
                      <div className='flex items-center justify-center'>
                        {subcat?.url ? (
                          <ImageLoader
                            alt='curr-cat-logo'
                            src={subcat?.url}
                            className='w-12 rounded-md  object-cover'
                          />
                        ) : (
                          <img
                            src={PlaceholderImg}
                            alt='placeholder'
                            className='w-12 object-cover'
                          />
                        )}
                      </div>
                      <p className='w-[15ch] break-words text-left text-sm font-medium'>
                        {subcat?.name}
                      </p>
                    </div>
                    {subcat.subCategory2.length > 0 && (
                      <img src={DownChevron} alt='down' className='mx-3 w-3 ' />
                    )}
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel>
                  {subcat?.subCategory2?.map((subcat2) => (
                    <div
                      className='ml-5 flex items-center justify-start gap-2 border-b-2 border-gray-200 p-2'
                      key={subcat2?.id}
                      onClick={() => withSubNestCategory(subcat2?.id)}
                    >
                      <div className='flex items-center justify-center '>
                        {subcat2?.url ? (
                          <ImageLoader
                            alt='curr-cat-logo'
                            src={subcat2?.url}
                            className='w-20 rounded-md  object-cover'
                          />
                        ) : (
                          <img
                            src={PlaceholderImg}
                            alt='placeholder'
                            className='w-12 object-cover'
                          />
                        )}
                      </div>
                      <p className='w-[20ch] break-words text-sm font-medium'>
                        {subcat2?.name}
                      </p>
                    </div>
                  ))}
                </Disclosure.Panel>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopLandingCategory;
