import React from 'react';

// types
import { suggestItem } from '@/types/product';

// components
import ImageLoader from '@/utils/ImageLoader';

interface Props {
  suggestLoading: boolean;
  suggestData: suggestItem[];
  handleSuggestItem: (data: any) => void;
}
const ProductSuggestion = ({
  suggestData,
  handleSuggestItem,
  suggestLoading,
}: Props) => {
  return (
    <div className='flex flex-col'>
      <h2 className='mt-4 px-4 text-sm font-semibold'>
        {suggestData?.length > 0
          ? 'Found Results'
          : suggestLoading
          ? null
          : 'No Result Found'}
      </h2>

      {suggestData?.map((suggProd) => (
        <div
          key={suggProd.id}
          className='flex items-center gap-4 px-4 py-2'
          onClick={() => handleSuggestItem(suggProd)}
        >
          <ImageLoader
            alt='product-img'
            src={suggProd?.imageUrl}
            className='h-10 w-10 rounded-md object-cover'
          />
          <p className='text-sm'>{suggProd.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductSuggestion;
