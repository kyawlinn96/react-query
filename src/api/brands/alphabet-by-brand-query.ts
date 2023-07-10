import { BrandByAlphabetResponse } from '@/types';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { brandKey } from '@/api/brands/key';
import apiClient from '@/api/apiClient';

export const useGetBrandByAlphabet = <TData = BrandByAlphabetResponse>(
  searchParams: string,
  pageSize: number,
  options?: UseInfiniteQueryOptions<BrandByAlphabetResponse, unknown, TData>
) => {
  const query = useInfiniteQuery<BrandByAlphabetResponse, unknown, TData>(
    brandKey.getBrandByAlphabet(pageSize, searchParams),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('/AYAZayMiscellaneous/GetBrandByAlphabet', {
          params: {
            Alphabet: searchParams,
            pageNumber: pageParam,
            pageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.brands);

        return totalPages.length === lastPage.total_Results
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      refetchOnWindowFocus: false,
      ...options,
    }
  );
  const totalBrands = query?.data?.pages?.flatMap((page: any) => page.brands);

  return {
    ...query,
    totalBrands,
  };
};
