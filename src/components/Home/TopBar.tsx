import { useNavigate } from 'react-router-dom';
import { SearchType } from '@/types';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import IconXCircle from '@/components/icon/IconXCircle';

const TopBar = () => {
  const navigate = useNavigate();

  const goToProductSearch = () => {
    navigate('/productsearch', {
      state: { searchType: SearchType.SEARCH_BY_NAME },
    });
  };

  return (
    <>
      <div className='sticky top-0 z-30 flex w-full flex-col bg-primary pb-2'>
        <div className='flex items-center justify-between px-4 py-3'>
          <h2 className='text-xl font-bold leading-5 text-white'>AYAZay</h2>
          <button className='rounded-full bg-[#00000050]'>
            <IconXCircle />
          </button>
        </div>
        <div className='px-4'>
          <div className='relative h-auto w-full' onClick={goToProductSearch}>
            <input
              type='text'
              placeholder='Search Product'
              className='w-full rounded-[10px] px-10 py-2 text-base leading-4 placeholder:text-sm focus:outline-none focus:ring-2'
            />
            <div className='center-y-axis absolute left-3'>
              <IconMagnifyingGlass className='w-5 fill-gray-800' />
            </div>
            <div className='center-y-axis absolute right-2 rounded-md bg-primary px-3 py-[2px] text-sm text-white'>
              Search
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
