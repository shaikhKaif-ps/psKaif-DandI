// redux/slices/allApp/allAppSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';

// ✅ Asset type
export interface Asset {
  _id: string;
  Name: string;
  PricePerMonth: number;
  Description: string;
  IsActive: boolean;
  CreatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  purchased?: boolean;
}

// ✅ Response type
export interface AssetsResponse {
  status: boolean;
  message: string;
  data: Asset[];
}

export const appAppApi = createApi({
  reducerPath: 'appAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Get Assets
    getAssets: builder.query<AssetsResponse, void>({
      query: () => {
        const userId = getCookie('UserId');
        return {
          url: userId ? `/assets/?userId=${userId}` : '/assets/',
          method: 'GET',
        };
      },
    }),
  }),
});

// ✅ Export hooks
export const { useGetAssetsQuery } = appAppApi;
