import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { cartKeys } from './keys';

export type OrderSettingDetailResponse = {
  id: number;
  allowOrderFromMultiShop: boolean;
  allowOrderWithoutLogin: boolean;
  statusCode: number;
  message: string;
  ref: null;
};

export const useGetOrderSettingDetail = <TData = OrderSettingDetailResponse>(
  options?: UseQueryOptions<OrderSettingDetailResponse, unknown, TData>
) => {
  return useQuery<OrderSettingDetailResponse, unknown, TData>(
    cartKeys.getOrderSetting(),
    async () => {
      return await apiClient
        .get('/AYAZayOrder/GetOrderSettingDetail')
        .then((res) => res.data);
    },
    options
  );
};
