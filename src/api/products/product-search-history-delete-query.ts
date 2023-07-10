import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from './keys';

export type DeleteSearchHistoryProps = {
  id: number;
  isClearAll: boolean;
  shopId: number;
};

export const useGetSearchHistoryDelete = ({
  onSuccess,
  ...options
}: Omit<
  UseMutationOptions<DeleteSearchHistoryProps, unknown, unknown>,
  'queryFn'
> = {}) => {
  const queryClient = useQueryClient();
  return useMutation<DeleteSearchHistoryProps, unknown, unknown>(
    async (payload) => {
      return await apiClient
        .delete('/AYAZayProduct/DeleteProductSearchHistory', { data: payload })
        .then((res) => res.data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          productKey.productSearchHistory(10)
        );
      },
      ...options,
    }
  );
};
