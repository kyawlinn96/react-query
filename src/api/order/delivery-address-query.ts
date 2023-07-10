import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { orderKeys } from './keys';

export type GetDeliveryAddressResponse = {
  id: number;
  labelName: string;
  cityId: number;
  cityName: string;
  townshipId: number;
  townshipName: string;
  address: string;
  landmark: string;
  selected: boolean;
  updatedDate: string;
};

export const useGetDeliveryAddress = () =>
  useQuery(
    orderKeys.deliveryAddress(),
    async () => {
      return await apiClient
        .get<GetDeliveryAddressResponse[]>('/AYAZayOrder/GetDeliveryAddress')
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
