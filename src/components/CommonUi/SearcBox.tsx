import { IconCross } from '@/components/icon/IconCross';
import SearchIcon from '@/assets/svgcomponents/Search';
import React from 'react';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';

interface SearchBoxProps {
  searchTerm?: string;
  handleSearchTermChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleOpenSuggestionBox?: () => void;
  clearSearchTerm?: () => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  handleSearchTermChange,
  handleOpenSuggestionBox,
  clearSearchTerm,
}) => {
  return (
    <div className='relative w-full'>
      <input
        value={searchTerm}
        onFocus={handleOpenSuggestionBox}
        className='w-full rounded-md border-none bg-gray-100 py-2 pl-10 pr-2 focus:ring-1 focus:ring-black'
        onChange={handleSearchTermChange}
        placeholder='Search'
      />
      <div className='center-y-axis absolute left-3'>
        <IconMagnifyingGlass className='h-5 w-5 fill-gray-300' />
      </div>
      {searchTerm?.length! > 0 && (
        <div
          className='center-y-axis absolute right-3'
          onClick={clearSearchTerm}
        >
          <IconCross className='h-4 w-4 fill-gray-700' />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
