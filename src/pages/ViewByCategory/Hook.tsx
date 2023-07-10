import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProductSearchLists } from '@/api/products/product-search-query';
import { SearchType, SortType } from '@/types';
import DefaultIcon from '@/assets/sort.svg';
import LowToHighPriceIcon from '@/assets/low_to_hight.svg';
import HighToLowPriceIcon from '@/assets/high_to_low.svg';
import LatestIcon from '@/assets/latest_item.svg';
import PopularIcon from '@/assets/bestselling.svg';
import useIntersectionObserver from '@/utils/useIntersectionObserver';
import * as url from 'url';

const Hook = () => {
  const loadMoreRef = useRef(null);
  const optionBoxRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const urlData = location.state;
  console.log(urlData, 'product');
  const [openSortBox, setOpenSortBox] = useState(false);
  const {
    data: productLists,
    totalProducts,
    isLoading: productListsLoading,
    isError: productListsError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useGetProductSearchLists(
    10,
    urlData?.searchType,
    {
      productName: urlData?.productName || '',
      choose: urlData?.sortType,
      productCategoryId: urlData?.subCategoryData?.id,
    },
    urlData?.shopData?.shopId || ''
  );

  // handler
  const handleBack = () => {
    navigate(-1);
  };

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
  const currentSortOption = sortingOptions.find(
    (option) => option.value === urlData?.sortType
  );
  const handleOptionClick = (sortValue: number) => {
    const propsState = {
      mainCategory: urlData?.mainCategory,
      subCategoryData: urlData?.subCategoryData,
      searchType: SearchType.SEARCH_SUB_CATEGORY,
      shopData: urlData?.shopData,
      sortType: sortValue,
    };
    navigate('/viewbycategory', { state: propsState });
    setOpenSortBox(false);
  };
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return {
    openSortBox,
    optionBoxRef,
    loadMoreRef,
    urlData,
    productListsError,
    productLists,
    totalProducts,
    productListsLoading,
    sortingOptions,
    currentSortOption,

    setOpenSortBox,
    handleBack,
    handleOptionClick,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
export default Hook;
