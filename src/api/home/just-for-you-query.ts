import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { homeKeys } from './keys';

export type JustForYouResponse = {
  id: number;
  name: string;
  imgUrl: string;
  originalPrice: number;
  promotePrice: number;
  promotePercent: number;
  createdDate: string;
}[];

export const useJustForYouProducts = <TData = JustForYouResponse>(
  pageNumber: number,
  pageSize: number,
  options?: UseInfiniteQueryOptions<JustForYouResponse, unknown, TData>
) => {
  return useInfiniteQuery<JustForYouResponse, unknown, TData>(
    homeKeys.justForYouProducts(pageNumber, pageSize),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('AYAZayProduct/GetLandingJustForYouProduct', {
          params: {
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page);
        return totalPages.length === lastPage.length
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
};
