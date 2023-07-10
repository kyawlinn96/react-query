import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';
import { suggestItem } from '@/types/product';

export const useGetProductSuggestion = <TData = suggestItem[]>(
  query: string,
  shopId?: number,
  options?: UseQueryOptions<suggestItem[], unknown, TData>
) =>
  useQuery<suggestItem[], unknown, TData>(
    productKey.productSearchSuggestion(query, shopId),
    async () => {
      const response = await apiClient.get(
        '/AYAZayProduct/GetProductNameSuggestionForAYAZay',
        {
          params: {
            SearchText: query,
            ShopId: shopId,
            PageNumber: 1,
            PageSize: 10,
          },
        }
      );
      return response.data;
    },
    options
  );
