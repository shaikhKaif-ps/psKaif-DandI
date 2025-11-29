// src/redux/slices/category/categoryApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getCookie } from '@/utils/cookies';

// type Category = {
//   _id: string;
//   Name: string;
//   AssetId: string;
//   IsActive: boolean;
// };

// type GetCategoriesResponse = {
//   status: boolean;
//   message: string;
//   data: Category[];
// };

// export const categoryApi = createApi({
//   reducerPath: 'categoryApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = getCookie('UserToken');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       headers.set('Content-Type', 'application/json');
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getCategoryByAssetId: builder.query<GetCategoriesResponse, string>({
//       query: (assetID) => `/category/asset/${assetID}`, // Dynamic URL
//     }),
//   }),
// });

// export const { useGetCategoryByAssetIdQuery } = categoryApi;
// =================
// =================
// =================

//redux/slices/category/categorySlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';

export type Category = {
  _id: string;
  Name: string;
  AssetId: string;
  IsActive: boolean;
};

type GetCategoriesResponse = {
  status: boolean;
  message: string;
  data: Category[];
};

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('UserToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategoryByAssetId: builder.query<GetCategoriesResponse, string>({
      query: (assetID) => `/category/asset/${assetID}`, // Dynamic URL
    }),
  }),
});

// ✅ Export both normal and lazy hooks
export const { useGetCategoryByAssetIdQuery, useLazyGetCategoryByAssetIdQuery } = categoryApi;
