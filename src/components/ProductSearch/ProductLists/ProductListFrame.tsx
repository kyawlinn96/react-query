import React from 'react';
import Masonry from 'react-masonry-css';

interface Props {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}

const ProductListFrame = ({ isError, isLoading, children }: Props) => {
  const toggleAction = (): boolean => {
    if (isLoading) return true;
    return false;
  };

  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Masonry
      breakpointCols={{ default: 2 }}
      className='my-masonry-grid px-2'
      columnClassName='my-masonry-grid_column'
    >
      {toggleAction()
        ? arr.map((index) => (
            <div
              key={index}
              className='grid h-auto w-full grid-cols-1 gap-y-2 space-x-0 rounded-md bg-gray-200 p-2 '
            >
              <div className='h-40 w-[153.5px] animate-pulse rounded-md bg-gray-100' />
              <div className='w-full space-y-2 '>
                <div className='h-5 w-full animate-pulse rounded-md bg-gray-100' />
                <div className='grid h-3 w-full grid-cols-2 gap-2'>
                  <div className='h-full w-full animate-pulse rounded-md bg-gray-100' />
                  <div className='h-full w-full animate-pulse rounded-md bg-gray-100' />
                </div>
                <div className='h-5 w-full animate-pulse rounded-md bg-gray-100' />
              </div>
            </div>
          ))
        : children}
    </Masonry>
  );
};

export default ProductListFrame;
