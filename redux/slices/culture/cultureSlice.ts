// redux/slices/culture/cultureSlice.ts
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// --- Types ---

export interface StartAssessmentRequest {
  AssetId: string;
}

export interface StartAssessmentResponse {
  status: boolean;
  message: string;
  data: {
    AssessmentId: string;
    CurrentQuestion: number;
    Status: string;
  };
}

export interface GetProgressResponse {
  status: boolean;
  message: string;
  data: {
    AssessmentId: string;
    Asset: {
      Name: string;
      Description: string;
    };
    Status: string;
    CurrentQuestion: number;
    CompletedQuestions: number;
    TotalQuestions: number;
    ProgressPercentage: number;
    StartedAt: string;
    CompletedAt: string | null;
  };
}

export interface GetQuestionResponse {
  status: boolean;
  message: string;
  data: {
    QuestionNumber: number;
    QuestionText: string;
    Choices: {
      index: number;
      text: string;
    }[];
    ExistingRankings: { choiceIndex: number; rank: number }[] | null;
    TotalQuestions: number;
  };
}

export interface SubmitResponseRequest {
  assessmentId: string;
  QuestionNumber: number;
  Rankings: {
    choiceIndex: number;
    rank: number;
  }[];
}

export interface SubmitResponseResponse {
  status: boolean;
  message: string;
  data: {
    CurrentQuestion: number;
    CompletedQuestions: number;
    TotalQuestions: number;
  };
}

export interface CompleteAssessmentResponse {
  status: boolean;
  message: string;
  data: {
    AssessmentId: string;
    CompletedAt: string;
  };
}

export interface CalculateResultResponse {
  status: boolean;
  message: string;
  data: any; // Data structure not specified in curl, using any
}

export interface GetCultureResultResponse {
  status: boolean;
  message: string;
  data: {
    AssessmentId: string;
    Asset: {
      _id: string;
      Name: string;
      Description: string;
    };
    CulturalProfile: {
      types: {
        LinearActive: number;
        MultiActive: number;
        Reactive: number;
        Reflective: number;
      };
      percentages: {
        LinearActive: number;
        MultiActive: number;
        Reactive: number;
        Reflective: number;
      };
      primaryType: string;
    };
    DiscProfile: {
      scores: {
        Direction: number;
        Interaction: number;
        Stability: number;
        Care: number;
      };
      percentages: {
        Direction: number;
        Interaction: number;
        Stability: number;
        Care: number;
      };
      primaryDrive: string;
    };
    CompletedAt: string;
  };
}

// --- API Slice ---

export const cultureApi = createApi({
  reducerPath: 'cultureApi',
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
    // 1. Start New Culture Assessment
    startCultureAssessment: builder.mutation<StartAssessmentResponse, StartAssessmentRequest>({
      query: (body) => ({
        url: '/culture/assessment/start',
        method: 'POST',
        body,
      }),
    }),

    // 2. Get Assessment Progress
    getAssessmentProgress: builder.query<GetProgressResponse, string>({
      query: (assessmentId) => ({
        url: `/culture/assessment/${assessmentId}/progress`,
        method: 'GET',
      }),
    }),

    // 3. Get Specific Question
    getSpecificQuestion: builder.query<
      GetQuestionResponse,
      { assessmentId: string; questionNumber: number }
    >({
      query: ({ assessmentId, questionNumber }) => ({
        url: `/culture/assessment/${assessmentId}/question/${questionNumber}`,
        method: 'GET',
      }),
    }),

    // 4. Submit Response to Question
    submitResponse: builder.mutation<SubmitResponseResponse, SubmitResponseRequest>({
      query: ({ assessmentId, ...body }) => ({
        url: `/culture/assessment/${assessmentId}/response`,
        method: 'POST',
        body,
      }),
    }),

    // 5. Complete Assessment
    completeAssessment: builder.mutation<CompleteAssessmentResponse, string>({
      query: (assessmentId) => ({
        url: `/culture/assessment/${assessmentId}/complete`,
        method: 'POST',
      }),
    }),

    // 6. Calculate Culture Result
    calculateCultureResult: builder.mutation<CalculateResultResponse, string>({
      query: (assessmentId) => ({
        url: `/culture/result/${assessmentId}/calculate`,
        method: 'POST',
      }),
    }),

    // 7. Get Culture Result
    getCultureResult: builder.query<GetCultureResultResponse, string>({
      query: (assessmentId) => ({
        url: `/culture/result/${assessmentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useStartCultureAssessmentMutation,
  useGetAssessmentProgressQuery,
  useGetSpecificQuestionQuery,
  useSubmitResponseMutation,
  useCompleteAssessmentMutation,
  useCalculateCultureResultMutation,
  useGetCultureResultQuery,
} = cultureApi;
