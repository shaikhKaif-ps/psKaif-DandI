// redux/slices/Auth/authSlice.ts
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ Response type
export interface RegisterResponse {
  status: boolean;
  message: string;
  data?: {
    Name: string;
    Email: string;
    Password: string;
    Role?: string;
    OrgId?: string | null;
    IsQrUser?: boolean;
    QrId?: string | null;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    token?: string;
    isSubscribed?: boolean;
  };
}

// ✅ Request type
export interface RegisterRequest {
  Name: string;
  Email: string;
  Password: string;
  Role?: string;
}

// ✅ Login Request type
export interface LoginRequest {
  Email: string;
  Password: string;
}

// ✅ Login Response type
export interface LoginResponse {
  status: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    token: string;
    isSubscribed?: boolean; // make it optional if not always returned
  };
}

// ✅ Get User Response type
export interface GetUserResponse {
  status: boolean;
  message: string;
  data?: {
    _id: string;
    Name: string;
    Password: string;
    Email: string;
    Role: string;
    OrgId: string | null;
    IsQrUser: boolean;
    QrId: string | null;
    ProfileImg: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

console.log('✅ BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');

      // ✅ Attach token from cookie
      const token = getCookie('UserToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Registreation mutation
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Login mutation
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Get User profile query
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery } = authApi;
