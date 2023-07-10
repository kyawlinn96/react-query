import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type ProductOfferListResponse = {
  promotionTypeId: number;
  promotionName: string;
  productPromotionList: {
    id: number;
    name: string;
    imgUrl: string | null;
    originalPrice: number;
    promotePrice: number;
    promotePercent: number;
  }[];
}[];

export const useGetProductOfferList = <TData = ProductOfferListResponse>(
  pageNumber?: number,
  pageSize?: number,
  options?: UseQueryOptions<ProductOfferListResponse, unknown, TData>
) => {
  return useQuery<ProductOfferListResponse, unknown, TData>(
    homeKeys.productOfferList(pageNumber, pageSize),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetLandingProductOffer', {
          params: {
            PageNumber: pageNumber,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    options
  );
};
