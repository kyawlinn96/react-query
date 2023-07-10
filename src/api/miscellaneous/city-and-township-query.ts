import { useQuery } from '@tanstack/react-query';
import { miscellaneousKeys } from './key';
import apiClient from '../apiClient';

export type GetCityResponse = {
  cityList: {
    id: number;
    name: string;
  }[];
};
export const useGetCity = () =>
  useQuery(miscellaneousKeys.getCity(), async () => {
    return await apiClient
      .get<GetCityResponse>('/AYAZayMiscellaneous/GetCity')
      .then((res) => res.data.cityList);
  });

export type GetTownshipResponse = {
  townList: {
    id: number;
    name: string;
  }[];
};
export const useGetTownship = (cityId: number) =>
  useQuery(
    miscellaneousKeys.getTownship(cityId),
    async () => {
      return await apiClient
        .get<GetTownshipResponse>(
          `/AYAZayMiscellaneous/GetTownship?CityId=${cityId}`
        )
        .then((res) => res.data.townList);
    },
    {
      enabled: Boolean(cityId),
    }
  );
