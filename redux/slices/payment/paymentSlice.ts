// src/redux/slices/payment/paymentSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';

// Types for checkout session
export type CreateCheckoutSessionRequest = {
  subscriptionId: string;
};

export type CreateCheckoutSessionResponse = {
  status: boolean;
  message: string;
  data: {
    url: string;
  };
};

// Types for confirmPayment
export type ConfirmPaymentRequest = {
  session_id: string;
};

export type ConfirmPaymentResponse = {
  status: boolean;
  message: string;
  data: {
    subscriptionId: string;
    amount: number;
    currency: string;
  };
};

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('UserToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      CreateCheckoutSessionResponse,
      CreateCheckoutSessionRequest
    >({
      query: (body) => ({
        url: '/payment/checkout',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Confirm payment mutation
    confirmPayment: builder.mutation<ConfirmPaymentResponse, ConfirmPaymentRequest>({
      query: (body) => ({
        url: '/payment/confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useConfirmPaymentMutation, // 👈 export the new hook
} = paymentApi;
