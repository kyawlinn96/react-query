import BottomNavigation from '@/components/BottomNavigation';
import BackStep from '@/components/CommonUi/BackStep';
import { Outlet } from 'react-router-dom';

const SubCatgoryLayout = () => {
  /*  useGetCategoryByShopId(Number(shopid)); */
  return (
    <>
      <div className='flex items-center  bg-white px-4 py-3'>
        <BackStep />
        <h3 className='grow text-center text-2xl font-bold'>
          View By Category
        </h3>
      </div>
      <Outlet />
      <BottomNavigation />
    </>
  );
};

export default SubCatgoryLayout;
