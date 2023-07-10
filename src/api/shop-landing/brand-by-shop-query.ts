import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shopLandingKeys } from './keys';
import { BrandByShopResponse } from '@/types';

export const useGetBrandByShopId = <TData = BrandByShopResponse>(
  shopId: number,
  pageSize: number,
  options?: UseInfiniteQueryOptions<BrandByShopResponse, unknown, TData>
) => {
  const query = useInfiniteQuery<BrandByShopResponse, unknown, TData>(
    shopLandingKeys.shopBrand(pageSize),
    async ({ pageParam = 1 }) => {
      const respone = await apiClient.get(
        'AYAZayShopLanding/GetBrandByShopId',
        {
          params: {
            ShopId: shopId,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        }
      );
      return respone.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.brands);

        return totalPages.length === lastPage.totalItem
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
      refetchOnWindowFocus: false,
    }
  );
  const totalBrands = query?.data?.pages.flatMap((page: any) => page.brands);
  return {
    ...query,
    totalBrands,
  };
};
