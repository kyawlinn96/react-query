import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { profileKeys } from './keys';

export type ProfileRespone = {
  userInfo: {
    id: number;
    phoneNo: string;
    email: string;
    name: string;
    address: string | null;
    cityName: string;
    townName: string;
    miniUrl: string;
    cityId: number;
    townId: number;
    labelName: string | null;
    landMark: string | null;
  };
  recentProductList: {
    id: number;
    name: string;
    imgUrl: string;
    originalPrice: number;
    hasFromToPrice: boolean;
    promotePrice: number;
    promotePercent: number;
    fromPrice: number;
    toPrice: number;
    promoteFromPrice: number | undefined;
    promoteToPrice: number | undefined;
    promotionStartDate: string | undefined;
    promotionEndDate: string | undefined;
    createdDate: string;
    isFav: boolean;
    isGetOne: boolean;
    skuValueSize: number;
    leftQtyForFirstSkuValue: number;
    firstSkuValue: string;
    firstSkuId: number;
    totalWishList: number;
    totalOrder: number;
  }[];
};

export const useGetProfile = <TData = ProfileRespone>(
  pageSize: number,
  options?: UseQueryOptions<ProfileRespone, unknown, TData>
) => {
  return useQuery<ProfileRespone, unknown, TData>(
    profileKeys.myProfile(pageSize),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('/AYAZayMiscellaneous/GetMyProfile', {
          params: {
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    options
  );
};
