import React, { useEffect } from 'react';
import BackStep from '@/components/CommonUi/BackStep';
import BrandsHook from '@/pages/Brands/BrandsHook';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import cn from 'classnames';
import AlphabetIcon from '@/assets/atoz.png';

import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '@/components/ui/CustomDialog';

const Brands = () => {
  const navigate = useNavigate();
  const {
    searchParams,
    alphabets,
    searchByAlphabet,
    isSuccess,
    totalBrands,
    handleSearchParams,
    brandDataByAlphabet,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    openAlphabetDialog,
    setSearchByAlphabet,
    setOpenAlphabetDialog,

    brandByNameSuccess,
    brandDataByName,
    totalBrandByName,
    brandByNameFetchNextPage,
    brandByNameHasNextPage,
    brandByNameIsLoading,
    brandByNameFetchingNextPage,
    handleClickAlphabet,
  } = BrandsHook();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log(brandByNameIsLoading, 'brandlists');
  return (
    <div className='relative flex w-full flex-col  bg-white'>
      <div className='absolute left-5 top-5 z-30'>
        <BackStep />
      </div>
      <h2 className='my-5 text-center text-xl font-semibold'>
        View By <span className='text-primary-dark'>Brands</span>
      </h2>
      <div
        className='absolute right-5 top-5 z-30 w-10 cursor-pointer'
        onClick={() => setOpenAlphabetDialog(true)}
      >
        <img src={AlphabetIcon} alt='alphabet_icon' className='h-6 w-6 ' />
      </div>
      <div className='relative my-2 w-full px-4'>
        <input
          value={searchParams}
          placeholder='Search Brands'
          onChange={(e) => handleSearchParams(e)}
          className='w-full rounded-xl bg-gray-200 py-3 pl-3 pr-10  font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-dark'
        />
        <div className='center-y-axis absolute right-8'>
          <IconMagnifyingGlass className='w-6 text-primary-dark' />
        </div>
      </div>
      <h2 className='px-4 py-2 text-left font-semibold'>{searchByAlphabet}</h2>
      {searchParams.length > 0 ? (
        <>
          {brandDataByName?.pages[0]?.brands?.length > 0 ? (
            <div className='mb-10  flex flex-col  gap-2 p-4'>
              {brandByNameSuccess &&
                totalBrandByName?.map((brand) => (
                  <div
                    className='flex items-center justify-start gap-4 py-2'
                    key={brand?.brandId}
                    onClick={() => navigate(`/brands/${brand?.brandId}`)}
                  >
                    <div className='obj h-20 w-20 overflow-hidden rounded-full bg-white shadow-md '>
                      <img
                        src={brand?.image}
                        alt={brand?.brandName}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <p className='text-base font-semibold text-black'>
                      {brand?.brandName}
                    </p>
                  </div>
                ))}
              <div
                ref={ref}
                className={cn('py-3', !hasNextPage ? 'hidden' : 'block')}
              >
                <p className='text-md text-center text-gray-400'>
                  {brandByNameFetchingNextPage ? 'Loading more...' : ''}
                </p>
              </div>
              {brandByNameIsLoading && (
                <div className='text-md  mt-4 p-4 text-center text-gray-400'>
                  Loading...
                </div>
              )}
              {!brandByNameHasNextPage && !brandByNameIsLoading && (
                <div className='text-md w-full rounded-md p-4 text-center text-gray-400'>
                  No More Result!
                </div>
              )}
            </div>
          ) : (
            <div className=' text-md p-4 font-medium text-gray-400'>
              {!brandByNameIsLoading ? 'No Brand Yet ...' : null}
            </div>
          )}
        </>
      ) : (
        <>
          {!isLoading && brandDataByAlphabet?.pages[0]?.brands?.length > 0 ? (
            <div className='mb-10  flex flex-col  gap-2 p-4'>
              {isSuccess &&
                totalBrands?.map((brand) => (
                  <div
                    className='flex items-center justify-start gap-4 py-2'
                    key={brand?.brandId}
                    onClick={() => navigate(`/brands/${brand?.brandId}`)}
                  >
                    <div className='obj h-20 w-20 overflow-hidden rounded-full bg-white shadow-md '>
                      <img
                        src={brand?.image}
                        alt={brand?.brandName}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <p className='text-base font-semibold text-black'>
                      {brand?.brandName}
                    </p>
                  </div>
                ))}
              <div
                ref={ref}
                className={cn('py-3', !hasNextPage ? 'hidden' : 'block')}
              >
                <p className='text-md text-center text-gray-400'>
                  {isFetchingNextPage ? 'Loading more...' : ''}
                </p>
              </div>
              {isLoading && (
                <div className='text-md  mt-4 p-4 text-center text-gray-400'>
                  Loading...
                </div>
              )}

              {!hasNextPage && !isLoading && (
                <div className='text-md w-full rounded-md p-4 text-center text-gray-400'>
                  No More Result!
                </div>
              )}
            </div>
          ) : (
            <div className=' text-md p-4 font-medium text-gray-400'>
              {!isLoading ? 'No Brand Yet ...' : null}
            </div>
          )}
        </>
      )}
      {openAlphabetDialog && (
        <CustomDialog
          open={openAlphabetDialog}
          onClose={() => setOpenAlphabetDialog(false)}
        >
          <div className='flex flex-col rounded-xl bg-white p-4'>
            <div className='mb-3 grid grid-cols-5 gap-x-1'>
              <button
                className={cn(
                  'mx-auto h-12 w-12 rounded-full border-none text-base font-semibold outline-none',
                  searchByAlphabet === 'All' && 'bg-primary-dark text-white'
                )}
                onClick={() => handleClickAlphabet('All')}
              >
                All
              </button>
            </div>
            <div className='grid grid-cols-5 gap-x-1 gap-y-3'>
              {alphabets.map((alphabet, index) => (
                <button
                  className={cn(
                    'mx-auto h-12 w-12 rounded-full border-none text-center text-base font-semibold outline-none',
                    searchByAlphabet === alphabet &&
                      'bg-primary-dark text-white '
                  )}
                  key={index}
                  onClick={() => handleClickAlphabet(alphabet)}
                >
                  {alphabet}
                </button>
              ))}
            </div>
          </div>
        </CustomDialog>
      )}
    </div>
  );
};
export default Brands;
