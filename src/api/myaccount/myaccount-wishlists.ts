import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { myAccountKeys } from './key';
import apiClient from '../apiClient';

import { WishListsProps } from '@/types/wishlists';

export const useGetWishLists = <TData = WishListsProps[]>(
  options?: UseQueryOptions<WishListsProps[], unknown, TData>
) => {
  return useQuery<WishListsProps[], unknown, TData>(
    myAccountKeys.getWishLists(),
    async () => {
      const response = await apiClient.get('AYAZayProduct/GetWishlist');
      return response.data;
    },
    options
  );
};
