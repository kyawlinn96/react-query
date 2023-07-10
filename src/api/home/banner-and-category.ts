import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type BannerAndCategoryResponse = {
  mainCategoryList: {
    id: number;
    name: string;
    url: string;
    statusCode: number;
    message: null;
    ref: null;
  }[];
  bannerList: {
    id: number;
    name: string;
    url: string;
    bannerLinkId: number;
    isWeb: number;
    brandId: null;
    seqNo: number;
    width: string;
    height: string;
    categoryId: number;
    categoryName: null;
    categoryImgUrl: null;
    productId: number;
    productName: null;
    searchKeyword: null;
    recommendedId: null;
  }[];
  adList: {
    id: number;
    name: string;
    url: string;
    bannerLinkId: number;
    isWeb: number;
    brandId: null;
    seqNo: number;
    width: string;
    height: string;
    categoryId: null;
    categoryName: null;
    categoryImgUrl: null;
    productId: null;
    productName: null;
    searchKeyword: null;
    recommendedId: null;
  }[];
};

export const useGetBannerAndCategories = <TData = BannerAndCategoryResponse>(
  bannerType?: number,
  isWeb?: number,
  options?: UseQueryOptions<BannerAndCategoryResponse, unknown, TData>
) => {
  return useQuery<BannerAndCategoryResponse, unknown, TData>(
    homeKeys.bannerAndCategory(bannerType, isWeb),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetLandingBannerAndCategory', {
          params: {
            bannerType,
            isWeb,
          },
        })
        .then((res) => res.data);
    },
    options
  );
};
