import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type BrandAndCategoryResponse = {
  brandList: {
    id: number;
    name: string;
    url: string;
    logoUrl: string;
    isPopular: boolean;
    productInfo: {
      id: number;
      name: string;
      imgUrl: string;
    }[];
  }[];
  categoryList: {
    id: number;
    name: string;
    url: string;
    background: string;
    mainCategoryId: number;
    productListBuyers: {
      productId: number;
      productTypeId: number;
      url: string;
      name: string;
      promotePercent: number;
      isGetOne: boolean;
      createdDate: string;
    }[];
  }[];
};

export const useGetBrandAndCategories = <TData = BrandAndCategoryResponse>(
  pageNumber?: number,
  pageSize?: number,
  options?: UseQueryOptions<BrandAndCategoryResponse, unknown, TData>
) => {
  return useQuery<BrandAndCategoryResponse, unknown, TData>(
    homeKeys.brandAndCategory(pageNumber, pageSize),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetLandingBrandCategory', {
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
