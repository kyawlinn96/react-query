import React, { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

// hooks
import useDebounce from '@/hooks/useDebounce';

// api
import { useGetProductSuggestion } from '@/api/products/product_suggestion_query';
import { useGetCategoryByProductSearch } from '@/api/products/product-search-category-query';
import { useGetProductSearchLists } from '@/api/products/product-search-query';
import { useGetProductSearchHistory } from '@/api/products/product-search-history-query';

// utils
import { checkWhiteSpace } from '@/utils/checkWhiteSpace';

// types
import { SearchType } from '@/types';

// store
import { useProductSearchStore } from '@/stores/ResultProduct/productSearchStore';

const ProductSearchHook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlData = location.state;
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [submitSearchTerm, setSubmitSearchTerm] = useState('');

  const [isInputValue, setIsInputValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  useGetCategoryByProductSearch();

  const { setProductName, mainCategoryData } = useProductSearchStore(
    (state) => ({
      searchOptions: state.sortOption,
      categoryByShop: state.productSearchCategoryByShop,
      mainCategoryData: state.productSearchCategory,
      setProductName: state.setProductName,
    }),
    shallow
  );

  const { data: suggestData, isFetching: suggestLoading } =
    useGetProductSuggestion(
      useDebounce(searchQuery, 300),
      urlData?.shopData?.shopId
    );

  useGetProductSearchLists(
    10,
    urlData?.searchType || 0,
    {
      productName: submitSearchTerm,
      choose: urlData?.sortType || 0,
      productCategoryId: urlData?.categoryId || '',
    },
    urlData?.shopData?.shopId || ''
  );

  const clickOnSuggestItem = (data: any) => {
    let propsState = {
      productName: data?.name,
      searchType: SearchType.SEARCH_BY_NAME,
      shopData: urlData?.shopData,
    };
    navigate('/resultproducts', {
      state: propsState,
    });
  };

  const searchByCategory = (data: any) => {
    let propsState = {
      searchType: SearchType.SEARCH_BY_CATEGORY,
      categoryId: data?.id,
      categoryData: data,
      shopData: urlData?.shopData || null,
    };
    navigate('/resultproducts', { state: propsState });
  };
  const searchByInput = (text: string) => {
    let propsState = {
      productName: text,
      searchType: SearchType.SEARCH_BY_NAME,
      shopData: urlData?.shopData || null,
    };
    navigate(`/resultproducts`, { state: propsState });
  };

  const onSubmit = (data: any) => {
    searchByInput(data.inputValue?.trim());
    setSubmitSearchTerm(data.inputValue);
  };

  const onChangeSearch = (value: string) => {
    if (!checkWhiteSpace(value)) {
      if (value) {
        setIsInputValue(true);
        setSearchQuery(value);
        return;
      }
    }
    setIsInputValue(false);
  };
  const backFromProductSearch = () => {
    // if (urlData?.shopData) {
    //   return navigate(`/shops/${urlData?.shopData?.shopId}`);
    // }
    navigate(-1);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return {
    urlData,
    searchQuery,
    openSuggestion,
    suggestData,
    suggestLoading,
    mainCategoryData,
    isInputValue,
    isFocus,
    //action
    setProductName,
    onSubmit,
    setIsInputValue,
    setIsFocus,
    setOpenSuggestion,
    setSearchQuery,
    clickOnSuggestItem,
    onChangeSearch,
    searchByCategory,
    backFromProductSearch,
    handleKeyPress,
  };
};

export default ProductSearchHook;
