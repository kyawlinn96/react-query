import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { multishopKeys } from './keys';

export type SettingDetailResponse = {
  id: number;
  dateCounter: number;
  deleteReasons: {
    id: number;
    reason: string;
    isDefaultReason: boolean;
  }[];
  statusCode: number;
  message: string;
};

export const useGetSettingDetail = <TData = SettingDetailResponse>(
  options?: UseQueryOptions<SettingDetailResponse, unknown, TData>
) =>
  useQuery<SettingDetailResponse, unknown, TData>(
    multishopKeys.settingDetail(),
    async () => {
      return await apiClient
        .get('/AYAZayMultiShop/GetSettingDetail')
        .then((res) => res.data);
    },
    options
  );
