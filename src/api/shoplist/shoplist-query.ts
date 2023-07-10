import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shoplistKeys } from './keys';

export type ShopListResponse = {
  shops: {
    shopId: number;
    shopName: string;
    imageUrl: string;
    isFollowed: boolean;
    popularPercent: number;
    products: {
      productId: number;
      productImg: string;
      createdDate: string;
    }[];
  }[];
  totalItem: number;
  statusCode: number;
  message: string;
  ref: null;
};

export const useGetShopList = <TData = ShopListResponse>(
  shopName: string,
  isFollowed: boolean,
  pageSize: number,
  options?: UseInfiniteQueryOptions<ShopListResponse, unknown, TData>
) => {
  return useInfiniteQuery<ShopListResponse, unknown, TData>(
    shoplistKeys.shopList(shopName, isFollowed, pageSize),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('AYAZayShopListCotroller/GetShopListBuyer', {
          params: {
            ShopName: shopName,
            FollowStatusFilter: isFollowed,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.shops);
        return totalPages.length === lastPage.totalItem
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
};
