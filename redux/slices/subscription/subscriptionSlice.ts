// src/redux/slices/subscription/subscriptionSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies'; // 👈 If you store JWT in cookies

// ---------- Types ----------

type AppInput = {
  AppId: string;
  Quantity: number;
};

export type CreateSubscriptionRequest = {
  SubscriberType: 'user' | 'org'; // you can extend if needed
  SubscriberId: string;
  Apps: AppInput[];
};

export type SubscriptionApp = {
  AppId: {
    _id: string;
    Name: string;
    PricePerMonth?: number;
    Description?: string;
    IsActive?: boolean;
    CreatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  Quantity: number;
  _id: string;
};

export type Subscription = {
  _id: string;
  SubscriberType: string;
  SubscriberId: string;
  Apps: SubscriptionApp[];
  TotalUsers: number;
  TotalAmount: number;
  Status: string;
  StartDate: string;
  ExpiryDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SubscriptionResponse = {
  status: boolean;
  message: string;
  data: Subscription[];
};

// Response type for createSubscription (returns single Subscription)
export type CreateSubscriptionResponse = {
  status: boolean;
  message: string;
  data: Subscription; // 👈 Single Subscription object
};

// ---------- API Slice ----------

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // 👈 configure in .env
    prepareHeaders: (headers) => {
      const token = getCookie('UserToken'); // if auth required
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Create subscription
    // createSubscription: builder.mutation<SubscriptionResponse, CreateSubscriptionRequest>({
    //   query: (body) => ({
    //     url: '/subscription/create',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    createSubscription: builder.mutation<CreateSubscriptionResponse, CreateSubscriptionRequest>({
      query: (body) => ({
        url: '/subscription/create',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Get subscription(s) for logged-in user
    getUserSubscriptionByUser: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: '/subscription',
        method: 'GET',
      }),
    }),
  }),
});

// ---------- Hooks ----------
export const { useCreateSubscriptionMutation, useGetUserSubscriptionByUserQuery } = subscriptionApi;
