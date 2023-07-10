import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { miscellaneousKeys } from './key';
import { CategoryDetails } from '@/types';

export const useGetCategoryDetails = <TData = CategoryDetails[]>(
  option?: UseQueryOptions<CategoryDetails[], unknown, TData>
) =>
  useQuery<CategoryDetails[], unknown, TData>(
    miscellaneousKeys.getCategoryDetails(),
    async () => {
      return await apiClient
        .get('/AYAZayMiscellaneous/GetMainCategoryForDetail')
        .then((res) => res.data);
    },
    option
  );
