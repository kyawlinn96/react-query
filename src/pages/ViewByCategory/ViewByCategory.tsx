import React from 'react';
import Hook from './Hook';
import BackStep from '@/components/CommonUi/BackStep';
import cn from 'classnames';
import ProductLists from '@/components/ProductSearch/ProductLists/ProductLists';
import ImageLoader from '@/utils/ImageLoader';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const ViewByCategory = () => {
  const {
    urlData,
    productListsLoading,
    productListsError,
    totalProducts,
    optionBoxRef,
    loadMoreRef,
    openSortBox,
    productLists,
    sortingOptions,
    currentSortOption,
    handleBack,
    handleOptionClick,
    setOpenSortBox,
    hasNextPage,
    isFetchingNextPage,
  } = Hook();
  let dummy = true;
  return (
    <>
      {productListsLoading ? (
        <div className='min-h-screen w-full bg-gray-200 p-5'>
          <SkeletonLoader className='h-52 w-full rounded-xl bg-white' />
          <div className='flex items-center justify-between'>
            <SkeletonLoader className='my-2 h-10 w-32 rounded-xl bg-white' />
            <SkeletonLoader className='my-2 h-10 w-32 rounded-xl bg-white' />
          </div>
          <div className='my-5 grid grid-cols-2 gap-2'>
            <div className='rounded-xl bg-gray-100 p-4'>
              <SkeletonLoader className='h-24 w-full rounded-xl bg-white' />
              <div className='my-2 flex flex-col gap-2'>
                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />

                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />
                <SkeletonLoader className='h-6 w-1/2 rounded-xl bg-white' />
              </div>
            </div>
            <div className='rounded-xl bg-gray-100 p-4'>
              <SkeletonLoader className='h-24 w-full rounded-xl bg-white' />
              <div className='my-2 flex flex-col gap-2'>
                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />

                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />
                <SkeletonLoader className='h-6 w-1/2 rounded-xl bg-white' />
              </div>
            </div>
            <div className='rounded-xl bg-gray-100 p-4'>
              <SkeletonLoader className='h-24 w-full rounded-xl bg-white' />
              <div className='my-2 flex flex-col gap-2'>
                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />

                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />
                <SkeletonLoader className='h-6 w-1/2 rounded-xl bg-white' />
              </div>
            </div>
            <div className='rounded-xl bg-gray-100 p-4'>
              <SkeletonLoader className='h-24 w-full rounded-xl bg-white' />
              <div className='my-2 flex flex-col gap-2'>
                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />

                <SkeletonLoader className='h-6 w-full rounded-xl bg-white' />
                <SkeletonLoader className='h-6 w-1/2 rounded-xl bg-white' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative min-h-screen w-full'>
          <div className='absolute left-3 top-3.5'>
            <BackStep onClick={handleBack} />
          </div>
          <h1 className='w-full py-3 text-center text-xl font-semibold'>
            View By <span className='text-primary-dark'>Category</span>
          </h1>
          <div className='h-40 w-full items-center justify-center object-cover'>
            <ImageLoader
              alt='cat-bg'
              className='h-full w-full object-cover'
              src={urlData?.mainCategory?.backgroundUrl}
            />
          </div>
          {urlData?.shopData && (
            <h3 className='m-2 inline-block bg-primary-dark px-6 py-1 text-base text-white'>
              {urlData?.shopData?.shopName}
            </h3>
          )}
          {productLists?.pages[0]?.message !== 'ရှာဖွေတွေ့ရှိချက် မရှိပါ' && (
            <div className='my-3 flex items-center justify-between px-2'>
              <div className='flex items-center gap-1 text-sm font-medium text-gray-400'>
                <span>{urlData?.mainCategory?.name}</span>
                <span>&raquo;</span>
                <span>{urlData?.subCategoryData?.name}</span>
              </div>
              <div className='relative my-2 flex items-center justify-end px-4'>
                <div
                  className='flex cursor-pointer items-center gap-3'
                  onClick={() => setOpenSortBox(true)}
                >
                  <p className='text-sm font-medium'>
                    {currentSortOption?.title}
                  </p>
                  <img
                    src={currentSortOption?.image}
                    alt='icon'
                    className='w-3'
                  />
                </div>
                {openSortBox && (
                  <div
                    className='absolute right-4 top-6 z-50 flex w-40 flex-col space-y-2 rounded-xl bg-white py-2  shadow-md'
                    ref={optionBoxRef}
                  >
                    {sortingOptions.map((option, index) => (
                      <div
                        className={cn(
                          'flex items-center gap-2 px-4 py-2',
                          currentSortOption?.value === option.value &&
                            'bg-amber-100'
                        )}
                        key={index}
                        onClick={() => handleOptionClick(option.value)}
                      >
                        <img
                          src={option.image}
                          alt='option_img'
                          className='w-3'
                        />
                        <p className='text-sm font-medium text-black '>
                          {option.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className='mb-8 mt-4 w-full bg-white  px-2'>
            {productLists?.pages[0]?.message !== 'ရှာဖွေတွေ့ရှိချက် မရှိပါ' ? (
              <ProductLists
                productListsError={productListsError}
                productListsLoading={productListsLoading}
                productLists={totalProducts!}
              />
            ) : (
              <div className='flex min-h-[50vh] w-full items-center justify-center'>
                <p className='text-md  font-medium text-gray-400'>
                  No Result Found
                </p>
              </div>
            )}
          </div>
          {productLists?.pages[0]?.message !== 'ရှာဖွေတွေ့ရှိချက် မရှိပါ' && (
            <>
              <div
                ref={loadMoreRef}
                className={cn(!hasNextPage ? 'hidden' : 'block')}
              >
                <p className='text-md text-center text-gray-400'>
                  {isFetchingNextPage ? 'Loading more...' : ''}
                </p>
              </div>
              {productListsLoading && (
                <div className='text-md  mt-4 p-4 text-center text-gray-400'>
                  Loading...
                </div>
              )}

              {!hasNextPage && !productListsLoading && (
                <div className='text-md rounded-md p-4 text-center text-gray-400'>
                  No More Result!
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default ViewByCategory;
