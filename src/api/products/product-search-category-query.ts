import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { CategoryByProductSearchResponse } from '@/types';
import { productKey } from './keys';
import { useProductSearchStore } from '@/stores/ResultProduct/productSearchStore';

export const useGetCategoryByProductSearch = <
  TData = CategoryByProductSearchResponse
>(
  option?: UseQueryOptions<CategoryByProductSearchResponse, unknown, TData>
) => {
  const setMainCategory = useProductSearchStore(
    (state) => state.setProductSearchCategory
  );
  return useQuery<CategoryByProductSearchResponse, unknown, TData>(
    productKey.productSearchCategory(),
    async () => {
      const response = await apiClient.get(
        'AYAZayProduct/GetMainCategoryForProductSearch'
      );
      setMainCategory(response.data);
      return response.data;
    },
    option
  );
};
