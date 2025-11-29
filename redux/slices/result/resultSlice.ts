// redux/slices/Result/resultApi.ts
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ CategoryScore type
export interface CategoryScore {
  CategoryId: string;
  CategoryName: string;
  Score: number;
  MaxScore: number;
  Percentage: number;
  _id: string;
}

// ✅ Result data type
export interface ResultData {
  AssessmentId: string;
  UserId: string;
  AssetId: string;
  TotalScore: number;
  MaxScore: number;
  Percentage: number;
  AdviceMessage: string;
  RecommendedCourseId: string | null;
  CategoryScores: CategoryScore[];
  CompletedAt: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ✅ Response type
export interface ResultResponse {
  status: boolean;
  message: string;
  data: ResultData;
}

export const resultApi = createApi({
  reducerPath: 'resultApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const token = getCookie('UserToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Fetch result by assessment ID
    getResultByAssessmentId: builder.query<ResultResponse, string>({
      query: (assessmentID) => ({
        url: `/assesmentresult/result/${assessmentID}`,
        method: 'GET',
      }),
    }),
  }),
});

// ✅ Export hook
export const { useGetResultByAssessmentIdQuery } = resultApi;
