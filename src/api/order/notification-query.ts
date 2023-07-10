import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { orderKeys } from './keys';
import apiClient from '../apiClient';

export type GetNotificationResponse = {
  id: number;
  title: string;
  body: string;
  bodyEng: string;
  bodyChn: string;
  url: string;
  redirectAction: string;
  referenceAttribute: string;
  notificationDate: string;
  count: number;
  isSeen: boolean;
  sku: null | string;
  productName: null | string;
};

export const useGetNotificationBuyer = (pageSize: number) => {
  return useInfiniteQuery<GetNotificationResponse[], unknown>({
    queryKey: orderKeys.getNotificationBuyer(pageSize),
    queryFn: async ({ pageParam = 1 }) =>
      await apiClient
        .get('/AYAZayOrder/GetNotificationBuyer', {
          params: {
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data),
    getNextPageParam(lastPage, pages) {
      const totalPages = pages.flatMap((page) => page);
      return totalPages.length === lastPage?.[0].count
        ? undefined
        : totalPages.length / pageSize + 1;
    },
  });
};

export const useSeenNotification = () => {
  return useMutation<any, unknown, number>(async (payload) => {
    return await apiClient
      .get(`/AYAZayOrder/SeenNotification?Id=${payload}`)
      .then((res) => res.data);
  });
};
