import { useQuery } from '@tanstack/react-query';
import { orderKeys } from './keys';
import apiClient from '../apiClient';
import { GetVoucherResponse } from '@/types';

export const useGetVoucher = <TData = GetVoucherResponse>(orderId: number) =>
  useQuery<GetVoucherResponse, unknown, TData>(
    orderKeys.voucher(orderId),
    async () => {
      return await apiClient
        .get('/AYAZayOrder/GetPOSVoucher', { params: { orderId } })
        .then((res) => res.data);
    }
  );
