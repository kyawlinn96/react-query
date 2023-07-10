import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { orderKeys } from './keys';
import { OrderHistoryResponse } from '@/types';

export type GetOrderHistoryArgs<T> = {
  userId: number;
  shopId: number;
  voucherNo: string | null;
  orderStatusId: number | null;
  orderDate: string | null;
  pageSize: number;
  options?: UseInfiniteQueryOptions<OrderHistoryResponse[], unknown, T>;
};

export const useGetOrderHistory = <TData = OrderHistoryResponse[]>({
  userId,
  shopId,
  voucherNo,
  orderStatusId,
  orderDate,
  pageSize,
  options,
}: GetOrderHistoryArgs<TData>) =>
  useInfiniteQuery<OrderHistoryResponse[], unknown, TData>(
    orderKeys.orderHistory(
      userId,
      shopId,
      voucherNo,
      orderStatusId,
      orderDate,
      pageSize
    ),
    async ({ pageParam = 1 }) => {
      return await apiClient
        .get('/AYAZayOrder/GetOrderHistoryForAYAZay', {
          params: {
            UserId: userId,
            ShopId: shopId,
            VoucherNo: voucherNo,
            OrderStatusId: orderStatusId,
            OrderDate: orderDate,
            PageNumber: pageParam,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data);
    },
    {
      getNextPageParam(lastPage, pages) {
        const totalPages = pages.flatMap((page) => page);
        return totalPages.length < lastPage?.[0]?.totalCount
          ? totalPages.length / pageSize + 1
          : undefined;
      },
      ...options,
    }
  );
