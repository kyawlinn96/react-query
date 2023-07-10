import { BrandByAlphabetResponse } from '@/types';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { brandKey } from '@/api/brands/key';
import apiClient from '@/api/apiClient';

export const useGetBrandByName = <TData = BrandByAlphabetResponse>(
  brandName: string,
  pageSize: number,
  option?: UseInfiniteQueryOptions<BrandByAlphabetResponse, unknown, TData>
) => {
  const query = useInfiniteQuery<BrandByAlphabetResponse, unknown, TData>(
    brandKey.getBrandByName(pageSize, brandName),
    async ({ pageParam = 1 }) => {
      if (brandName !== '') {
        const response = await apiClient.get(
          '/AYAZayMiscellaneous/GetBrandByName',
          {
            params: {
              Name: brandName,
              pageNumber: pageParam,
              pageSize: pageSize,
            },
          }
        );

        return response.data;
      }
      return;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page?.total_Results);
        return totalPages.length === lastPage?.total_Results
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...option,
    }
  );
  const totalBrandByName = query?.data?.pages?.flatMap(
    (page: any) => page?.brands
  );
  return {
    ...query,
    totalBrandByName,
  };
};
