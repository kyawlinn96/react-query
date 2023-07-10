import React from 'react';
import { Link } from 'react-router-dom';

interface category {
  name: string;
  id: number;
  url: string;
}
type categoryProps = {
  categoryData: category;
};
const CategoryCard: React.FC<categoryProps> = ({ categoryData }) => {
  return (
    <Link to={`/categories?selected=${categoryData.id}`}>
      <div className='relative mb-1 flex flex-shrink-0 cursor-pointer overflow-hidden rounded-[10px]'>
        <div className='relative flex h-14 w-full items-center justify-between bg-[#f7f7f7]'>
          <div className='w-3/5 py-2 pl-2'>
            <p className='text-xs leading-[15px]'>{categoryData.name}</p>
          </div>
          <div className='h-full w-2/5'>
            <img
              src={categoryData?.url}
              alt='cate'
              className='h-full w-full object-cover py-2 pr-2'
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
