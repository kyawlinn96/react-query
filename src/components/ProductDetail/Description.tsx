import React from 'react';

// utils
import { Parser } from '@/utils/parser';

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const desc = Parser(description);

  return (
    <div className='px-4 py-3'>
      <p className='text text-gray-800'>Description</p>
      <p className='mt-3 text-[13px]'>{desc}</p>
    </div>
  );
};

export default Description;
