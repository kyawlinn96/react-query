import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { shopLandingKeys } from './keys';

export type UpdateFollowStatusData = {
  statusCode: number;
  message: string;
};
export type UpdateFollowStatusVars = {
  shopId: number;
  followStatus: boolean;
};

export const useShopLandingFollowShopStatusStatus = ({
  onSuccess,
  ...options
}: Omit<
  UseMutationOptions<UpdateFollowStatusData, unknown, UpdateFollowStatusVars>,
  'queryFn'
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateFollowStatusData, unknown, UpdateFollowStatusVars>(
    async (payload) => {
      return await apiClient
        .post('/AYAZayShopLanding/FollowShop', payload)
        .then((res) => res.data);
    },
    {
      onSuccess: async (data, variables, context) => {
        await queryClient.invalidateQueries(
          shopLandingKeys.shopDetail(variables.shopId)
        );
        await onSuccess?.(data, variables, context);
      },
      ...options,
    }
  );
};
