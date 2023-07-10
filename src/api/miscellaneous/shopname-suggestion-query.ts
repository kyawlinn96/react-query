import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { miscellaneousKeys } from './key';
import apiClient from '../apiClient';
import { ShopInfo } from '@/types';

export const useGetShopNameSuggestionBuyer = <TData = ShopInfo[]>(
  search?: string,
  options?: UseQueryOptions<ShopInfo[], unknown, TData>
) =>
  useQuery<ShopInfo[], unknown, TData>(
    miscellaneousKeys.getShopNameSuggestionBuyer(1, 10),
    async () => {
      return await apiClient
        .get('/AYAZayMiscellaneous/GetShopNameSuggestionBuyer', {
          params: {
            SearchText: search,
            PageNumber: 1,
            PageSize: 10,
          },
        })
        .then((res) => res.data);
    },
    options
  );

export const useGetShopNameSuggestionSeller = (
  search: string,
  pageSize: number
) => {
  return useInfiniteQuery<ShopInfo[]>({
    queryKey: miscellaneousKeys.getShopNameSuggestionSeller(search, pageSize),
    queryFn: async ({ pageParam = 1 }) =>
      await apiClient
        .get('/AYAZayMiscellaneous/GetShopNameSuggestionSeller', {
          params: {
            SearchText: search,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data),
    getNextPageParam(lastPage, pages) {
      const totalPages = pages.flatMap((page) => page);
      const pageNum = totalPages.length / pageSize;
      return lastPage.length < 10 ? undefined : pageNum + 1;
    },
  });
};
