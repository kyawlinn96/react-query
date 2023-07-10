import { useForm } from 'react-hook-form';
import cn from 'classnames';
import ProductSearchHook from './ProductSearchHook';

import BackStep from '@/components/CommonUi/BackStep';
import ProductSuggestion from '@/components/ProductSearch/ProductSuggestion/ProductSuggestion';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import { IconCross } from '@/components/icon/IconCross';
import History from '@/components/ProductSearch/History/History';
import IconChevron from '@/components/icon/IconChevron';

const ProductSearch = () => {
  const { handleSubmit, register, reset } = useForm();

  const {
    urlData,
    isInputValue,
    suggestData,
    suggestLoading,
    isFocus,
    mainCategoryData,

    //action
    setIsFocus,
    onSubmit,
    setIsInputValue,
    clickOnSuggestItem,
    onChangeSearch,
    searchByCategory,
    backFromProductSearch,
  } = ProductSearchHook();

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='sticky inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-white px-4 py-2'>
        <button onClick={backFromProductSearch}>
          <IconChevron className='h-5 w-5' />
        </button>
        <div className='relative flex grow'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='relative w-full focus-within:text-primary'
          >
            <input
              autoFocus
              {...register('inputValue', {
                onChange: (event) => {
                  event.preventDefault();
                  onChangeSearch(event.target.value);
                },
              })}
              onFocus={() => setIsFocus(true)}
              className='w-full rounded-[10px] border-none bg-gray-100 px-10 py-1 text-gray-800 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark'
              placeholder='Search'
            />
            <div className='center-y-axis absolute left-3'>
              <IconMagnifyingGlass className='h-5 w-5' />
            </div>
            {isInputValue && (
              <div
                className='center-y-axis absolute right-3 z-30 p-2 pr-0'
                onClick={() => {
                  setIsInputValue(false);
                  reset();
                }}
              >
                <IconCross className='h-4 w-4 fill-gray-700' />
              </div>
            )}
          </form>
        </div>
      </div>

      {isInputValue ? (
        <ProductSuggestion
          suggestLoading={suggestLoading}
          suggestData={suggestData!}
          handleSuggestItem={clickOnSuggestItem}
        />
      ) : (
        <>
          <div className='flex w-full flex-col gap-2 px-4'>
            <History shopData={urlData?.shopData || ''} />
          </div>

          {!urlData?.shopData && (
            <div className='w-full px-4'>
              <h3 className='text-md my-3 font-semibold'>Search By Category</h3>
              <div className='grid w-full grid-cols-5 gap-y-2'>
                {mainCategoryData?.mainCategories.map((category) => (
                  <div
                    className='flex w-full  flex-col items-center justify-center gap-2'
                    key={category.id}
                    onClick={() => searchByCategory(category)}
                  >
                    <div className='w-14 overflow-hidden rounded-md border-2 border-gray-400 bg-custom-gray-light'>
                      <img
                        src={category.url}
                        alt=''
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <p className='line-clamp-2 h-10 text-center text-[12px]'>
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSearch;
