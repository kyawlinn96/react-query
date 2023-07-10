import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { cartKeys } from './keys';

export type RemoveFromCartVars = {
  productId: number;
  skuId: number;
};

export const useRemoveFromCart = (
  options?: UseMutationOptions<any, unknown, RemoveFromCartVars>
) => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, RemoveFromCartVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayOrder/RemoveFromCartForAYAZay', payload)
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
