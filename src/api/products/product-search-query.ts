import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';
import { ProductsLists, ProductSearchOption } from '@/types';

export const useGetProductSearchLists = <TData = ProductsLists>(
  pageSize: number,
  searchType: number,
  searchOptions: ProductSearchOption,
  shopId?: number,
  options?: UseInfiniteQueryOptions<ProductsLists, unknown, TData>
) => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery<ProductsLists, unknown, TData>(
    productKey.productSearchLists(pageSize, searchType, searchOptions),
    async ({ pageParam = 1 }) => {
      const queryParams = Object.entries({
        SearchType: searchType,
        ProductName: searchOptions.productName,
        ProductCategoryId: searchOptions.productCategoryId,
        choose: searchOptions.choose,
        ShopId: shopId,
      })
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      let response = await apiClient.get(
        `/AYAZayProduct/ProductSearchForAYAZay?${queryParams}&PageNumber=${pageParam}&PageSize=${pageSize}`
      );
      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.productList) return undefined;

        const totalPages = pages.flatMap((page) => page.productList);

        return totalPages.length === lastPage.count
          ? undefined
          : totalPages.length / pageSize + 1;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          productKey.productSearchHistory(10)
        );
      },
      refetchOnWindowFocus: true,
      ...options,
    }
  );
  const totalProducts = query?.data?.pages.flatMap(
    (page: any) => page?.productList
  );
  return {
    ...query,
    totalProducts,
  };
};
