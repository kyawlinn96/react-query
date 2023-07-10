import React from 'react';

interface Props {
  categoryStep: string[];
}

const BreadCrumb = ({ categoryStep }: Props) => {
  return (
    <div className='text-md flex items-center px-4 py-3'>
      {categoryStep?.length > 0 &&
        categoryStep.map((data, i, arr) => (
          <>
            <p className='text-[14px] text-gray-400'>{data}</p>
            <span className='mx-1 text-gray-400'>
              {i !== arr.length - 1 ? ' > ' : ' '}
            </span>
          </>
        ))}
    </div>
  );
};

export default BreadCrumb;
