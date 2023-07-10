import { CartDetailResponse } from '@/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { cartKeys } from './keys';

export type GetCartDetailBuyNowArgs = {
  productId: number;
  skuId: number;
  qty: number;
};

export const useGetCartDetail = <TData = CartDetailResponse>(
  config?: UseQueryOptions<CartDetailResponse, unknown, TData>
) => {
  return useQuery<CartDetailResponse, unknown, TData>({
    queryKey: cartKeys.cartDetail(),
    queryFn: async () => {
      return await apiClient
        .get('/AYAZayOrder/GetCartDetailForAYAZay')
        .then((res) => res.data);
    },
    ...config,
  });
};

export const useGetCartDetailBuyNow = <TData = CartDetailResponse>(
  { productId, qty, skuId }: GetCartDetailBuyNowArgs,
  config?: UseQueryOptions<CartDetailResponse, unknown, TData>
) =>
  useQuery<CartDetailResponse, unknown, TData>(
    cartKeys.getCartDetailBuyNow(productId, skuId, qty),
    async () => {
      return await apiClient
        .get('/AYAZayOrder/GetCartDetailForBuyNowForAYAZay', {
          params: {
            productId,
            skuId,
            qty,
          },
        })
        .then((res) => res.data);
    },
    config
  );
