import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { orderKeys } from './keys';

type CreateDeliveryAddressVars = {
  cityId: number;
  townshipId: number;
  labelName: string;
  address: string;
  landmark: string;
};
export const useCreateUserDeliveryAddress = () =>
  useMutation<any, unknown, CreateDeliveryAddressVars>(async (payload) => {
    return await apiClient
      .post('/AYAZayOrder/CreateUserDeliveryAddress', payload)
      .then((res) => res.data);
  });
export const useUpdateUserDeliveryAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, CreateDeliveryAddressVars & { id: number }>(
    async (payload) => {
      return await apiClient
        .post(`/AYAZayOrder/UpdateUserDeliveryAddress`, payload)
        .then((res) => res.data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(orderKeys.deliveryAddress());
      },
    }
  );
};

type DeleteDeliveryAddressVars = {
  id: number;
};
export const useDeleteUserDeliveryAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, DeleteDeliveryAddressVars>(
    async (payload) => {
      return await apiClient
        .delete(
          `/AYAZayOrder/DeleteUserDeliveryAddress?DeliveryAddressId=${payload.id}`
        )
        .then((res) => res.data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(orderKeys.deliveryAddress());
      },
    }
  );
};
