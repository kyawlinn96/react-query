import { useQuery } from '@tanstack/react-query';
import { orderKeys } from './keys';
import apiClient from '../apiClient';

export type OrderMessageList = {
  messageDate: string;
  messageInfo: {
    id: number;
    senderTypeId: number;
    senderType: string;
    senderName: string;
    profileUrl: string | null;
    messageType: 'Sender' | 'Buyer';
    orderMessageTypeId: number;
    orderMessageType: string;
    orderId: number;
    message: string;
    createdDate: string;
    createdBy: number;
  }[];
};
export type GetOrderMessageResponse = {
  total_Pages: number;
  total_Results: number;
  messageLists: OrderMessageList[];
};

export const useGetOrderMessageForAYAZay = (
  orderId: number,
  pageNumber: number,
  pageSize: number
) => {
  return useQuery<GetOrderMessageResponse>({
    queryKey: orderKeys.getOrderMessage(orderId, pageNumber, pageSize),
    queryFn: async () =>
      await apiClient
        .get('/AYAZayOrder/GetOrderMessageForAYAZay', {
          params: {
            OrderId: orderId,
            PageNumber: pageNumber,
            PageSize: pageSize,
          },
        })
        .then((res) => res.data),
    enabled: Boolean(orderId),
  });
};
