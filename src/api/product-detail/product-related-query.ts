import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';

export type ProductRelatedResponse = {
  firstSkuId: number;
  firstSkuValue: string;
  isFav: boolean;
  isGetOne: boolean;
  leftQtyForFirstSkuValue: number;
  name: string;
  originalPrice: number;
  productCategoryId: number;
  productId: number;
  promotePercent: number;
  promotePrice: number;
  promotionEndDate: null;
  promotionStartDate: null;
  sku: string;
  skuValueSize: number;
  totalQty: number;
  url: string;
}[];

export const useGetRelatedProducts = <TData = ProductRelatedResponse>(
  categoryId: number | undefined,
  productId: number,
  options?: UseQueryOptions<ProductRelatedResponse, unknown, TData>
) => {
  return useQuery<ProductRelatedResponse, unknown, TData>(
    productKey.relatedProduct(categoryId, productId),
    async () => {
      return await apiClient
        .get('AYAZayProduct/GetProductByRelatedCategry', {
          params: {
            CategoryId: categoryId,
            ProductId: productId,
            PageNumber: 1,
            PageSize: 10,
          },
        })
        .then((res) => res.data);
    },
    {
      enabled: Boolean(categoryId),
    }
  );
};
