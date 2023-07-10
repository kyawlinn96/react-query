import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { multishopKeys } from './keys';

export type ShopTypeListResponse = string[];

export const useGetShopTypeList = <TData = ShopTypeListResponse>(
  options?: UseQueryOptions<ShopTypeListResponse, unknown, TData>
) =>
  useQuery<ShopTypeListResponse, unknown, TData>(
    multishopKeys.shopTypeList(),
    async () => {
      return await apiClient
        .get('/AYAZayMultiShop/GetShopTypeList')
        .then((res) => res.data);
    },
    options
  );
