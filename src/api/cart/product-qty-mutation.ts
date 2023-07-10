import { UpdateProductCartVars } from '@/types';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { cartKeys } from './keys';

export const useUpdateProductCart = (
  options?: UseMutationOptions<any, unknown, UpdateProductCartVars>
) => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, UpdateProductCartVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayOrder/UpdateProductCartForAYAZay', payload)
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
