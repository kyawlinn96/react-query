import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type popularShopsResponse = {
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

export const useGetPopularShops = <TData = popularShopsResponse>(
  shopName?: string,
  isFollowed?: boolean,
  pageNumber?: number,
  pageSize?: number,
  options?: UseQueryOptions<popularShopsResponse, unknown, TData>
) => {
  return useQuery<popularShopsResponse, unknown, TData>(
    homeKeys.popularShops(shopName, isFollowed, pageNumber, pageSize),
    async () => {
      return await apiClient
        .get('AYAZayShopListCotroller/GetShopListBuyer', {
          params: {
            ShopName: shopName,
            FollowStatusFilter: isFollowed,
            PageNumber: pageNumber,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    options
  );
};
