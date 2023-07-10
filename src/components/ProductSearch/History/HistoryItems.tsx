import { HistoryItemsProps } from '@/types';
import React from 'react';
import { IconCross } from '@/components/icon/IconCross';
import DummyIcon from '@/assets/dummy2.png';
import IconClock from '@/components/icon/IconClock';

interface HistoryItems {
  history: HistoryItemsProps;
  currShopId: number;
  removeHandler: (data: any) => void;
  clickOnHistory: (data: HistoryItemsProps) => void;
}

const HistoryItems: React.FC<HistoryItems> = ({
  history,
  removeHandler,
  currShopId,
  clickOnHistory,
}) => {
  return (
    <div
      className='flex w-full items-center justify-between gap-2 rounded-2xl py-1'
      onClick={(e) => {
        e.stopPropagation();
        clickOnHistory(history);
      }}
    >
      <div className='flex items-center gap-x-4 '>
        <div className='flex h-10 w-10 items-center justify-center'>
          {history?.imageUrl ? (
            <img
              src={history?.imageUrl}
              alt='icon'
              className='h-full w-full rounded-md object-cover'
            />
          ) : (
            <IconClock className='h-5 w-5 fill-gray-900' />
          )}
        </div>
      </div>
      <p className='grow text-left text-[14px] font-medium'>
        {history.searchText}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeHandler({
            id: history.id,
            isClearAll: false,
            shopId: currShopId ? currShopId : 0,
          });
        }}
      >
        <IconCross className='w-4 fill-[#1E1E1E]' />
      </button>
    </div>
  );
};

export default HistoryItems;
