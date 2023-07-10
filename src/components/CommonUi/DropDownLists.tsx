import React, { useState } from 'react';
import SortIcon from '@/assets/sort.svg';
import cn from 'classnames';
import { SortType } from '@/types';
import DefaultIcon from '@/assets/sort.svg';
import LowToHighPriceIcon from '@/assets/low_to_hight.svg';
import HighToLowPriceIcon from '@/assets/high_to_low.svg';
import LatestIcon from '@/assets/latest_item.svg';
import PopularIcon from '@/assets/bestselling.svg';

const sortingOptions = [
  {
    title: 'Default',
    value: SortType.DEFAULT,
    image: DefaultIcon,
  },
  {
    title: 'Low To High',
    value: SortType.LOW_TO_HIGH,
    image: LowToHighPriceIcon,
  },
  {
    title: 'High To Low',
    value: SortType.HIGH_TO_LOW,
    image: HighToLowPriceIcon,
  },
  {
    title: 'Latest Item',
    value: SortType.LATEST,
    image: LatestIcon,
  },
  {
    title: 'Best Selling',
    value: SortType.BEST_SELLING,
    image: PopularIcon,
  },
];

interface DropDownProps {
  listItems: any[];
  onOptionChange: (data: any) => void;
}
const DropDownLists: React.FC<DropDownProps> = ({
  listItems,
  onOptionChange,
}) => {
  const [openOption, setOpenOption] = useState(false);
  const [currSortTitle, setCurrSortTitle] = useState(sortingOptions[0]);
  const handleOptionSelect = (option: any) => {
    console.log(option);
    onOptionChange(option);
    setCurrSortTitle(option);
    setOpenOption(false);
  };

  return (
    <div className='relative  '>
      <div className='relative inline-flex w-full'>
        <div
          className='flex h-10 w-full cursor-pointer items-center justify-between bg-white px-3'
          onClick={() => setOpenOption(true)}
        >
          <div className='flex-grow truncate text-sm'>
            {currSortTitle?.title}
          </div>
          <div className='flex items-center justify-center'>
            <img
              src={currSortTitle?.image}
              alt='sorticon'
              className='ml-1 w-3.5'
            />
          </div>
        </div>
        {openOption && (
          <ul className='absolute right-2 top-10 z-50 mt-1 w-48 rounded-lg border bg-white py-1 shadow-sm'>
            {listItems.map((option, index) => (
              <div
                className={cn(
                  'flex items-center gap-2 px-4 py-2',
                  currSortTitle?.value === option.value && 'bg-amber-100'
                )}
                key={index}
                onClick={() => handleOptionSelect(option)}
              >
                <img src={option.image} alt='option_img' className='w-3' />
                <p className='text-sm font-medium text-black '>
                  {option.title}
                </p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDownLists;
