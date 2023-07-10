import ResultHook from '@/pages/ResultLists/ResultHook';
import cn from 'classnames';
import SearchBar from '@/pages/ResultLists/SearchBar';
import IconXCircle from '@/components/icon/IconXCircle';
import ProductLists from '@/components/ProductSearch/ProductLists/ProductLists';
import { SearchType } from '@/types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ScrollToTopButton from '@/components/CommonUi/ScrollToTopButton';
import IconChevron from '@/components/icon/IconChevron';

const ResultLists = () => {
  const {
    currentSortOption,
    sortingOptions,
    SearchTypeName,

    optionBoxRef,
    hasNextPage,
    isFetchingNextPage,
    totalProducts,
    productLists,
    urlData,
    openSortBox,
    setOpenSortBox,
    handleOptionClick,
    productListsError,
    productListsLoading,
    fetchNextPage,
    removeShopTag,
    removeCategoryTag,
    backFromResults,
  } = ResultHook();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <div className='sticky top-0 z-50 bg-white'>
        <div className='relative flex items-center justify-between gap-4 px-4 py-2'>
          <button onClick={backFromResults}>
            <IconChevron className='h-5 w-5' />
          </button>
          <SearchBar name={SearchTypeName()} categoryId={0} />
        </div>
      </div>

      {/*shop tag and category tag*/}
      <div className='flex items-center justify-start gap-2 px-4 py-2'>
        {urlData?.shopData && (
          <div className='flex w-44  items-center justify-center gap-1.5 rounded-md bg-primary-dark p-2 shadow'>
            <img
              src={urlData?.shopData?.shopImageUrl}
              alt='category_icon'
              className='h-10 w-10 rounded-md object-contain'
            />
            <p className='w-[15ch] grow break-words text-[12px] font-medium text-white'>
              {urlData?.shopData?.shopName}
            </p>
            <div className='' onClick={removeShopTag}>
              <IconXCircle className='w-5 fill-gray-50' fill='#CF202D' />
            </div>
          </div>
        )}
        {urlData?.searchType === SearchType.SEARCH_BY_CATEGORY && (
          <div className='flex w-44  items-center justify-center gap-2 rounded-md bg-primary-dark p-2  shadow'>
            <img
              src={urlData?.categoryData?.url}
              alt='category_icon'
              className='h-10 w-10 rounded-md object-contain'
            />
            <p className='w-[15ch] grow break-all text-[12px] font-medium text-white'>
              {urlData.categoryData?.name}
            </p>
            <div className='' onClick={removeCategoryTag}>
              <IconXCircle className='w-5 fill-white' fill='#CF202D' />
            </div>
          </div>
        )}
        {urlData?.searchTypeName && (
          <div className=' rounded-md bg-primary-dark p-3 font-medium text-white'>
            {urlData?.searchTypeName}
          </div>
        )}
      </div>

      {productLists?.pages[0]?.message !== 'ရှာဖွေတွေ့ရှိချက် မရှိပါ' && (
        <div className='relative my-2 px-4'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-gray-800'>
              {productLists?.pages[0]?.count} Products
            </p>
            <div
              className='flex cursor-pointer items-center gap-3'
              onClick={() => setOpenSortBox(true)}
            >
              <p className='text-sm font-medium'>{currentSortOption?.title}</p>
              <img src={currentSortOption?.image} alt='icon' className='w-3' />
            </div>
          </div>

          {openSortBox && (
            <div
              className='absolute right-4 top-6 z-50 flex flex-col space-y-2 rounded-xl bg-white py-2  shadow-md'
              ref={optionBoxRef}
            >
              {sortingOptions.map((option, index) => (
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2',
                    currentSortOption?.value === option.value && 'bg-amber-100'
                  )}
                  key={index}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <img src={option.image} alt='option_img' className='w-3' />
                  <p className='text-sm font-medium text-black '>
                    {option.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className='mb-8 min-h-screen w-full overflow-auto bg-white  px-2'>
        {productLists?.pages[0]?.message !== 'ရှာဖွေတွေ့ရှိချက် မရှိပါ' ? (
          <>
            <ProductLists
              productListsError={productListsError}
              productListsLoading={productListsLoading}
              productLists={totalProducts!}
            />
            <div ref={ref} className={cn(!hasNextPage ? 'hidden' : 'block')}>
              <p className='text-md text-center text-gray-400'>
                {isFetchingNextPage ? 'Loading more...' : ''}
              </p>
            </div>
            {productListsLoading && (
              <div className='text-md mt-4 p-4 text-center text-gray-400'>
                Loading...
              </div>
            )}

            {!hasNextPage && !productListsLoading && (
              <div className='text-md rounded-md p-4 text-center text-gray-400'>
                No More Result!
              </div>
            )}
          </>
        ) : (
          <div className='flex  min-h-[50vh] w-full  items-center justify-center'>
            <p className='text-md font-medium text-gray-400'>No Result Fount</p>
          </div>
        )}
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default ResultLists;
