import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { CategoryByShopResponse } from '@/types';
import { shopLandingKeys } from './keys';
import { useProductSearchStore } from '@/stores/ResultProduct/productSearchStore';

export const useGetCategoryByShopId = <TData = CategoryByShopResponse>(
  shopId: number,
  option?: UseQueryOptions<CategoryByShopResponse, unknown, TData>
) => {
  const setCategoryByShop = useProductSearchStore(
    (state) => state.setProdcutSearchCategoryByShop
  );
  return useQuery<CategoryByShopResponse, unknown, TData>(
    shopLandingKeys.shopCategory(shopId),
    async () => {
      const response = await apiClient.get(
        `AYAZayShopLanding/GetCategoryByShopId?ShopId=${shopId}`
      );
      setCategoryByShop(response.data);
      return response.data;
    },
    option
  );
};
