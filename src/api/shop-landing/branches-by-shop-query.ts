import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shopLandingKeys } from './keys';
import { BranchesByShopResponse } from '@/types';
import { data } from 'autoprefixer';

export const useGetBranchesByShopId = <TData = BranchesByShopResponse>(
  shopId: number,
  pageSize: number,
  options?: UseInfiniteQueryOptions<BranchesByShopResponse, unknown, TData>
) => {
  const query = useInfiniteQuery<BranchesByShopResponse, unknown, TData>(
    shopLandingKeys.shopBranches(pageSize),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get(`/AYAZayShopLanding/GetBranchesBuyer`, {
          params: {
            ShopId: shopId,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.branches);
        return totalPages.length === lastPage?.branches?.length
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
  const totalBranches = query?.data?.pages?.flatMap(
    (page: any) => page?.branches
  );

  return {
    ...query,
    totalBranches,
  };
};
