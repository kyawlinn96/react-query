import React, { useRef, useState } from 'react';
import { useGetBrandByAlphabet } from '@/api/brands/alphabet-by-brand-query';
import { useGetBrandByName } from '@/api/brands/name-by-brand-query';
import useDebounce from '@/hooks/useDebounce';

const BrandsHook = () => {
  const [openAlphabetDialog, setOpenAlphabetDialog] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const [searchByAlphabet, setSearchByAlphabet] = useState('All');
  const {
    data: brandDataByAlphabet,
    totalBrands,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetBrandByAlphabet(searchByAlphabet, 10);

  const {
    data: brandDataByName,
    totalBrandByName,
    isSuccess: brandByNameSuccess,
    fetchNextPage: brandByNameFetchNextPage,
    hasNextPage: brandByNameHasNextPage,
    isLoading: brandByNameIsLoading,
    isFetchingNextPage: brandByNameFetchingNextPage,
  } = useGetBrandByName(useDebounce(searchParams, 500), 10);

  const handleSearchParams = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
  };
  const alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const handleClickAlphabet = (value: string) => {
    setSearchByAlphabet(value);
    setOpenAlphabetDialog(false);
  };

  return {
    alphabets,
    searchParams,
    handleSearchParams,
    brandDataByAlphabet,
    totalBrands,
    searchByAlphabet,
    setSearchByAlphabet,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    openAlphabetDialog,
    setOpenAlphabetDialog,

    brandByNameSuccess,
    brandDataByName,
    totalBrandByName,
    brandByNameFetchNextPage,
    brandByNameHasNextPage,
    brandByNameIsLoading,
    brandByNameFetchingNextPage,
    handleClickAlphabet,
  };
};
export default BrandsHook;
