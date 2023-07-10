import { ProductByBrandResponse } from '@/types';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { brandKey } from '@/api/brands/key';
import apiClient from '@/api/apiClient';

export const useGetProductByBrandId = <TData = ProductByBrandResponse>(
  brandId: number,
  pageSize: number,
  shopId?: number,
  options?: UseInfiniteQueryOptions<ProductByBrandResponse, unknown, TData>
) => {
  const query = useInfiniteQuery<ProductByBrandResponse, unknown, TData>(
    brandKey.getProductByBrandId(pageSize),
    async ({ pageParam = 1 }) => {
      let endpoint = `/AYAZayProduct/GetProductByBrandForAYAZay?BrandId=${brandId}&PageNumber=${pageParam}&PageSize=${pageSize}`;
      if (shopId) {
        endpoint = `/AYAZayProduct/GetProductByBrandForAYAZay?BrandId=${brandId}&ShopId=${shopId}&PageNumber=${pageParam}&PageSize=${pageSize}`;
      }
      return await apiClient.get(endpoint).then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = pages.flatMap((page) => page.products);
        return totalPages.length === lastPage?.products?.length
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      ...options,
    }
  );
  const totalProducts = query?.data?.pages?.flatMap((page) => page);

  return {
    ...query,
    totalProducts,
  };
};
