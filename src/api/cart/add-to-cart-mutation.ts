import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { cartKeys } from './keys';

export type AddToCartVars = {
  productId: number;
  skuId: number;
  qty: number;
};

export const useAddToCart = (
  options?: UseMutationOptions<any, unknown, AddToCartVars>
) => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, AddToCartVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayOrder/AddToCart', payload)
        .then((res) => res.data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(cartKeys.cartDetail());
      },
      ...options,
    }
  );
};
