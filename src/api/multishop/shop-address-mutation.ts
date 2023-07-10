import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { multishopKeys } from './keys';

export type UpdateShopAddressData = {
  shopId: number;
  statusCode: number;
  message: string;
};
export type UpdateShopAddressVars = {
  shopId: number;
  cityId: number;
  townshipId: number;
  address: string;
};

export const useUploadShopAddress = ({
  onSuccess,
  ...options
}: Omit<
  UseMutationOptions<UpdateShopAddressData, unknown, UpdateShopAddressVars>,
  'queryFn'
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateShopAddressData, unknown, UpdateShopAddressVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayMultiShop/UploadShopAddress', payload)
        .then((res) => res.data);
    },
    {
      onSuccess: async (data, variables, context) => {
        await queryClient.invalidateQueries(
          multishopKeys.shopAddress(data.shopId)
        );
        await onSuccess?.(data, variables, context);
      },
      ...options,
    }
  );
};
