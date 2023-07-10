import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { shopLandingKeys } from './keys';
import apiClient from '../apiClient';
import { ShopDetailByShopResponse } from '@/types';
import { useShopLandingStore } from '@/stores/ShopLandingStore/shopLandingStore';

export const useGetShopDetailByShopId = <TData = ShopDetailByShopResponse>(
  shopId: number,
  options?: UseQueryOptions<ShopDetailByShopResponse, unknown, TData>
) => {
  const setCurrShopData = useShopLandingStore(
    (state) => state.setCurrShopDetail
  );
  return useQuery<ShopDetailByShopResponse, unknown, TData>(
    shopLandingKeys.shopDetail(shopId),
    async () => {
      const response = await apiClient.get(
        `AYAZayShopLanding/GetShopDetailBuyer?ShopId=${shopId}`
      );
      setCurrShopData(response.data);
      return response.data;
    },
    options
  );
};
