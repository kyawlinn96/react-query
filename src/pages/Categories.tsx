import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCategoryDetails } from '@/api/miscellaneous/categories-detail-query';
import { useEffect } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/Button';
import { SearchType, SortType } from '@/types';

const MainCategory = () => {
  const navigate = useNavigate();
  const [searchPrams, setSearchParams] = useSearchParams();
  const { isLoading, isError, data } = useGetCategoryDetails();
  const selectedCategoryId = Number(searchPrams.get('selected') || 0);
  const selectedCategory = data?.find(
    (category) => category.id === selectedCategoryId
  );

  useEffect(() => {
    if (data && !selectedCategoryId) {
      setSearchParams({ selected: data[0].id.toString() }, { replace: true });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const viewAllProductByCategory = () => {
    const propsState = {
      searchType: SearchType.SEARCH_BY_CATEGORY,
      categoryId: selectedCategory?.productCategoryId,
      categoryData: selectedCategory,
    };
    navigate('/resultproducts', { state: propsState });
  };
  const clickOnViewMoreSubCate = (subCat: any) => {
    const propsState = {
      mainCategory: selectedCategory,
      subCategoryData: subCat,
      searchType: SearchType.SEARCH_SUB_CATEGORY,
      sortType: SortType?.DEFAULT,
    };
    navigate('/viewbycategory', { state: propsState });
  };

  return (
    <div className='flex h-screen border-t pt-[52px]'>
      <div className='no-scrollbar w-1/4 overflow-y-auto'>
        {data.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              setSearchParams(
                { selected: category.id.toString() },
                { replace: true }
              )
            }
            className={cn(
              'flex flex-col items-center p-2',
              selectedCategoryId === category.id
                ? 'bg-primary font-medium text-white'
                : 'bg-gray-100'
            )}
          >
            <img src={category.url} alt='' className='h-10 w-10 rounded-full' />
            <span className='text-center text-sm'>{category.name}</span>
          </div>
        ))}
      </div>

      <div className='flex w-3/4 flex-col overflow-y-auto'>
        <img
          src={selectedCategory?.backgroundUrl}
          alt=''
          className='max-h-40 w-full object-cover'
        />
        <Button className='m-2' onClick={viewAllProductByCategory}>
          View All Products
        </Button>
        <div className='overflow-y-auto'>
          {selectedCategory?.brand.length ? (
            <div>
              <div>By Brands</div>
              <div className='flex'>
                {selectedCategory?.brand.map((brand) => (
                  <div></div>
                ))}
              </div>
            </div>
          ) : null}
          {selectedCategory?.subCategory1.map((subCat) => (
            <div
              key={subCat.id}
              className='flex items-center gap-2 border-y p-2'
              onClick={() => clickOnViewMoreSubCate(subCat)}
            >
              <img src={subCat.url} alt='' className='h-8 w-8 rounded-full' />
              <span className='text-sm font-medium'>{subCat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
