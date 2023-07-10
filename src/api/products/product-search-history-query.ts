import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';
import { ProductSearchHistoryResponse } from '@/types';

export const useGetProductSearchHistory = <
  TData = ProductSearchHistoryResponse
>(
  pageSize: number,
  shopId?: number,
  options?: UseQueryOptions<ProductSearchHistoryResponse, unknown, TData>
) =>
  useQuery<ProductSearchHistoryResponse, unknown, TData>(
    productKey.productSearchHistory(pageSize),
    async () => {
      let api = 'AYAZayProduct/GetProductSearchHistory';
      if (shopId) {
        api += `?ShopId=${shopId}&PageNumber=1&PageSize=${pageSize}`;
      }

      let response = await apiClient.get(api);
      return response.data;
    },
    options
  );
