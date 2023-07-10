import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shopLandingKeys } from './keys';
import { ProductByShopResponse } from '@/types';

export const useGetShopProductByShopId = <TData = ProductByShopResponse>(
  shopId: number,
  sortBy: number,
  pageSize: number,
  options?: UseInfiniteQueryOptions<ProductByShopResponse, unknown, TData>
) =>
  useInfiniteQuery<ProductByShopResponse, unknown, TData>(
    shopLandingKeys.shopProduct(pageSize, sortBy),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('/AYAZayShopLanding/GetProductByShopId', {
          params: {
            ShopId: shopId,
            OrderBy: sortBy,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.products);
        return totalPages.length === lastPage.totalItem
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
