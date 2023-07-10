import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shopLandingKeys } from './keys';
import { PromotionByShopResponse } from '@/types';

export const useGetPromotionByShopId = <
  TData = PromotionByShopResponse | undefined
>(
  shopId: number,
  pageSize: number,
  options?: UseInfiniteQueryOptions<PromotionByShopResponse, unknown, TData>
) =>
  useInfiniteQuery<PromotionByShopResponse, unknown, TData>(
    shopLandingKeys.shopPromotion(pageSize),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('/AYAZayShopLanding/GetPromotionByShopId', {
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
        const totalPages = pages.flatMap((page) => page.promoProducts);
        return totalPages.length === lastPage.totalItem
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
