import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { orderKeys } from './keys';

type CreateDeliveryAddressVars = {
  deliveryAddressId: number;
};

export const useConfirmSelectedAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, CreateDeliveryAddressVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayOrder/ConfirmSelectedAddress', {
          ...payload,
          productCarts: [],
        })
        .then((res) => res.data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(orderKeys.deliveryAddress());
      },
    }
  );
};
