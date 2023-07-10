import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import { HistoryItemsProps } from '@/types';

interface AnimateInputBoxProps {
  histories: HistoryItemsProps[];
  goToSearch: () => void;
}
const AnimateInputBox = ({ histories, goToSearch }: AnimateInputBoxProps) => {
  return (
    <div className='relative w-full' onClick={goToSearch}>
      <input
        readOnly={true}
        value=''
        placeholder='Search in Shop'
        className='search-box w-full rounded-[10px] border-none bg-gray-200 py-1 pl-10 pr-2 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-black'
      />
      <div className='center-y-axis absolute left-3'>
        <IconMagnifyingGlass className='h-5 w-5 fill-gray-300' />
      </div>
    </div>
  );
};

export default AnimateInputBox;
