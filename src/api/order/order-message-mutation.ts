import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { orderKeys } from './keys';

export type SendOrderMessageVars = {
  orderId: number;
  message: string;
  senderTypeId: number;
};

export const useSendOrderMessage = (
  options?: UseMutationOptions<any, unknown, SendOrderMessageVars>
) => {
  return useMutation<any, unknown, SendOrderMessageVars>({
    mutationFn: async (payload) => {
      return await apiClient
        .post('/AYAZayOrder/SendOrderMessageForAYAZay', payload)
        .then((res) => res.data);
    },
    ...options,
  });
};
