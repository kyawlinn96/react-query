import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// types
import { SearchType, SortType } from '@/types';

// utils
import UserOutsideClick from '@/utils/useOuterClick';

// store
import { useProductSearchStore } from '@/stores/ResultProduct/productSearchStore';

// api
import { useGetProductSearchLists } from '@/api/products/product-search-query';

// assets
import DefaultIcon from '@/assets/sort.svg';
import LowToHighPriceIcon from '@/assets/low_to_hight.svg';
import HighToLowPriceIcon from '@/assets/high_to_low.svg';
import LatestIcon from '@/assets/latest_item.svg';
import PopularIcon from '@/assets/bestselling.svg';

const ResultHook = () => {
  const optionBoxRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const urlData = location.state;
  const [openSortBox, setOpenSortBox] = useState(false);
  const { sortOption, setSortOption } = useProductSearchStore(
    (state) => ({
      sortOption: state.sortOption,
      setSortOption: state.setSortOption,
    }),
    shallow
  );

  UserOutsideClick(optionBoxRef, () => setOpenSortBox(false));

  useEffect(() => {
    setSortOption(SortType.DEFAULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  let SearchTypeName = (): string => {
    switch (urlData?.searchType) {
      case 1:
        return urlData.productName;
      case 5:
        return 'Promotions';
      default:
        return urlData.productName;
    }
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
    (option) => option.value === sortOption
  );

  const handleOptionClick = (sortValue: number) => {
    setSortOption(sortValue);
    setOpenSortBox(false);
  };

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
      choose: sortOption,
      productCategoryId: urlData?.categoryId || '',
    },
    urlData?.shopData?.shopId || ''
  );
  console.log(urlData, 'urldata');
  const removeShopTag = () => {
    navigate(`/shops/${urlData?.shopData?.shopId}`);
  };
  const removeCategoryTag = () => {
    if (urlData?.shopData) {
      const propsState = {
        shopData: urlData?.shopData,
        searchType: SearchType?.SEARCH_BY_NAME,
      };
      return navigate('/resultproducts', { state: propsState });
    }
    navigate(-1);
  };

  const backFromResults = () => {
    const propState = {
      shopData: urlData?.shopData,
      searchType: SearchType.SEARCH_BY_NAME,
    };
    if (urlData?.shopData) {
      navigate(`/shops/${urlData?.shopData?.shopId}`);
      return;
    }
    navigate('/');
  };

  return {
    currentSortOption,
    sortingOptions,
    openSortBox,
    SearchTypeName,

    optionBoxRef,
    isSuccess,
    isFetchingNextPage,
    totalProducts,
    hasNextPage,
    productLists,
    setOpenSortBox,
    productListsLoading,
    handleOptionClick,
    productListsError,
    fetchNextPage,
    urlData,
    removeShopTag,
    removeCategoryTag,
    backFromResults,
  };
};

export default ResultHook;
