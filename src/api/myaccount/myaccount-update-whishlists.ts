import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { productKey } from '@/api/product-detail/keys';
import { myAccountKeys } from '@/api/myaccount/key';

export type UpdateWishListData = {
  statusCode: number;
  ref: number;
  message: string;
};
export type UpdateWishListVar = {
  productId: number;
  isFav: boolean;
};

export const useUpdateWishList = ({
  onSuccess,
  ...options
}: Omit<
  UseMutationOptions<UpdateWishListData, unknown, UpdateWishListVar>,
  'queryFn'
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateWishListData, unknown, UpdateWishListVar>(
    async ({ productId, isFav }) => {
      return await apiClient
        .post(
          `AYAZayProduct/UpdateWishlistForAYA?productId=${productId}&isFav=${isFav}`
        )
        .then((res) => res.data);
    },
    {
      onSuccess: async (data, variables, context) => {
        await queryClient.invalidateQueries(
          productKey.productDetail(variables?.productId)
        );
        await queryClient.invalidateQueries(myAccountKeys.getWishLists());
      },
      ...options,
    }
  );
};
