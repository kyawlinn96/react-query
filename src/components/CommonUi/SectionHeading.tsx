import ForwardArrow from '@/assets/svgcomponents/ForwardArrow';
import React from 'react';

interface headerProps {
  Heading: string;
  ViewAll: string;
  onClickViewMore: () => void;
  productLength?: number;
}

const SectionHeading: React.FC<headerProps> = ({
  Heading,
  ViewAll,
  onClickViewMore,
  productLength = 0,
}) => {
  return (
    <div className='flex w-full items-center justify-between px-4'>
      <p className='text-base font-semibold leading-relaxed'>{Heading}</p>

      {productLength >= 4 && (
        <div
          className='flex cursor-pointer items-center justify-center gap-1'
          onClick={onClickViewMore}
        >
          <p className='text-xs leading-[15px] text-gray-400'>{ViewAll}</p>
          <ForwardArrow className='w-4 fill-gray-400/80' />
        </div>
      )}
    </div>
  );
};
export default SectionHeading;
