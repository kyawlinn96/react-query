import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { PostOrderVars } from '@/types';

type PostOrderResponse = {
  orderId: number;
  timestamp: string | null;
  nonceStr: null;
  transactionId: null;
  paymentResponse: null;
  productIssues: null;
};

export const usePostOrder = (
  options?: UseMutationOptions<PostOrderResponse, unknown, PostOrderVars>
) =>
  useMutation<PostOrderResponse, unknown, PostOrderVars>(async (payload) => {
    return await apiClient
      .post('/AYAZayOrder/PostOrderForAYAZay', payload)
      .then((res) => res.data);
  }, options);
