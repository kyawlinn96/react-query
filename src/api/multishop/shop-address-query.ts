import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { multishopKeys } from './keys';

export type ShopAddressResponse = {
  shopId: number;
  cityId: number;
  townshipId: number;
  cityName: string;
  townshipName: string;
  address: string;
  statusCode: number;
  message: string;
};

export const useGetShopAddress = <TData = ShopAddressResponse>(
  shopId: number,
  options?: UseQueryOptions<ShopAddressResponse, unknown, TData>
) =>
  useQuery<ShopAddressResponse, unknown, TData>(
    multishopKeys.shopAddress(shopId),
    async () => {
      return await apiClient
        .get(`/AYAZayMultiShop/GetShopAddress?ShopId=${shopId}`)
        .then((res) => res.data);
    },
    options
  );
