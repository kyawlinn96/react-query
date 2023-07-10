import React from 'react';

interface Props {
  image: string;
  title: string;
  viewByTitle: () => void;
}

const OptionCategoryCard: React.FC<Props> = ({ image, title, viewByTitle }) => {
  return (
    <div
      onClick={viewByTitle}
      className='flex flex-col items-center justify-start gap-1 text-center'
    >
      <img src={image} alt='option' className='h-11 w-11 object-contain' />
      <div className='whitespace-pre-wrap break-words text-xs font-normal leading-[15px]'>
        {title}
      </div>
    </div>
  );
};

export default OptionCategoryCard;
