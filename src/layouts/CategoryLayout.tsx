import IconChevron from '@/components/icon/IconChevron';
import { Outlet, useNavigate } from 'react-router-dom';

const CategoryLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-4 py-3'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2'
        >
          <IconChevron className='h-7 w-7' />
          <h3 className='text-xl font-semibold'>Categories</h3>
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default CategoryLayout;
