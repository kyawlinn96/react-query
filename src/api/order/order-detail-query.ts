import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { orderKeys } from './keys';
import apiClient from '../apiClient';
import { OrderDetailResponse } from '@/types';

export const useGetOrderDetail = <TData = OrderDetailResponse>(
  orderId: number,
  options?: UseQueryOptions<OrderDetailResponse, unknown, TData>
) =>
  useQuery<OrderDetailResponse, unknown, TData>(
    orderKeys.orderDetail(orderId),
    async () => {
      return await apiClient
        .get('/AYAZayOrder/GetOrderDetail', {
          params: {
            orderId,
          },
        })
        .then((res) => res.data);
    },
    options
  );
