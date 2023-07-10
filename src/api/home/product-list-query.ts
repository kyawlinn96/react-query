import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type ProductCartListResponse = {
  bestSellingProductList: {
    id: number;
    name: string;
    url: string;
    originalPrice: number;
    promotePrice: number;
    orderCount: number;
    isFav: boolean;
    isGetOne: boolean;
  }[];
  flashSaleProductList: {}[];
  newArrivalProdictList: {
    id: number;
    name: string;
    imgUrl: string;
  }[];
  popularNowProductList: {
    id: number;
    name: string;
    imgUrl: string;
  }[];
};

export const useGetProductCardList = <TData = ProductCartListResponse>(
  pageNumber?: number,
  pageSize?: number,
  options?: UseQueryOptions<ProductCartListResponse, unknown, TData>
) => {
  return useQuery<ProductCartListResponse, unknown, TData>(
    homeKeys.productCardList(pageNumber, pageSize),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetLandingProductCardList', {
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
