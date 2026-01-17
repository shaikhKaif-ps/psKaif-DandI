// redux/slices/Assesment/assesmentSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
// ---------- Types ----------
export type CreateAssesmentRequest = {
  AssetId: string;
};

export type AssesmentData = {
  UserId: string;
  AssetId: string;
  Status: string;
  Steps: number;
  CurrentStep: number;
  Responses: any[];
  _id: string;
  StartedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CreateAssesmentResponse = {
  status: boolean;
  message: string;
  data?: AssesmentData;
};

// ---------- Step Count Types ----------

export type GetStepCountResponse = {
  status: boolean;
  message: string;
  data: {
    totalCount: number;
    assessmentType?: string;
    currentCount: number;
    remainingSteps: number;
    CurrentSteps?: number | null;
    current?: number; // kept for backward compatibility if needed
    assetId?: string;
    childAssetId?: string | null;
  };
};

// ---------- Submit Step Types ----------
export type SubmitStepRequest = {
  assessmentId: string; // dynamic path
  StepNumber: number;
  AssetId: string;
  CategoryId: string;
  QuestionId: string;
  AnswerValue: number;
};

// ---------- Step Answer Type ----------
export type StepAnswer = {
  _id: string;
  AssessmentId: string;
  UserId: string;
  StepNumber: number;
  AssetId: string;
  CategoryId: string;
  QuestionId: string;
  AnswerValue: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SubmitStepResponse = {
  status: boolean;
  message: string;
  data: {
    assessment: AssesmentData;
    stepAnswers: StepAnswer[]; // ✅ typed
  };
};

/* ---------- ASSESSMENT ADVICE ---------- */
export type AssessmentAdviceCategory = {
  CategoryId: string;
  CategoryName: string;
  Score: number;
  MaxScore: number;
  Percentage: number;
  PercentageLevel: 'high' | 'medium' | 'low';
  AdviceMessage: string;
  _id: string;
};

export type AssessmentAdviceData = {
  AssessmentId: {
    _id: string;
    AssetId: string;
    Status: string;
  };
  AssetId: {
    _id: string;
    Name: string;
    Description: string;
  };
  TotalScore: number;
  MaxScore: number;
  RecommendedCourseId: string | null;
  CategoryScores: AssessmentAdviceCategory[];
  CompletedAt: string;
};

export type GetAssessmentAdviceResponse = {
  status: boolean;
  message: string;
  data: AssessmentAdviceData;
};

/* ---------- ASSET WITH CHILDREN TYPES ---------- */
export type AssetChild = {
  _id: string;
  Name: string;
  PricePerMonth: number;
  Description: string;
  IsActive: boolean;
  CreatedBy: string;
  AssetId?: string; // Parent ID, only present on children
  IsChild: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Structure for the parent asset which contains the Children array
export type AssetWithChildrenData = AssetChild & {
  IsChild: false;
  Children: AssetChild[];
};

export type GetAssetWithChildrenResponse = {
  status: boolean;
  message: string;
  data: AssetWithChildrenData;
};

// ---------- API Slice ----------
export const assesmentApi = createApi({
  reducerPath: 'assesmentApi',
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
  tagTypes: ['Assesment'],
  endpoints: (builder) => ({
    //  Create / Start Assessment
    createAssesment: builder.mutation<CreateAssesmentResponse, CreateAssesmentRequest>({
      query: (body) => ({
        url: '/assesmentsteps/start',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assesment'],
    }),

    //  Get Step Count
    getAssesmentStepsCount: builder.query<GetStepCountResponse, string>({
      query: (assessmentId) => ({
        url: `/assesmentsteps/step-count/${assessmentId}`,
        method: 'GET',
      }),
      providesTags: ['Assesment'],
    }),

    submitStep: builder.mutation<SubmitStepResponse, SubmitStepRequest>({
      query: ({ assessmentId, ...body }) => ({
        url: `/assesmentsteps/step/${assessmentId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assesment'],
    }),

    //  Get Assessment Advice
    getAssessmentAdvice: builder.query<GetAssessmentAdviceResponse, string>({
      query: (assessmentId) => ({
        url: `/assesmentresult/advice/${assessmentId}`,
        method: 'GET',
      }),
      providesTags: ['Assesment'],
    }),

    // Get Asset with Child Assets
    getAssetWithChildren: builder.query<GetAssetWithChildrenResponse, string>({
      query: (appId) => ({
        // Assuming the base URL is handled by fetchBaseQuery and '/assets/child/' is the path
        url: `/assets/child/${appId}`,
        method: 'GET',
      }),
      providesTags: ['Assesment'],
    }),

    // Clear all assessment data for a user
    clearUserAssessment: builder.mutation<
      { status: boolean; message: string; data?: any },
      string // userId
    >({
      query: (userId) => ({
        url: `/users/clear-assessment/${userId}`,
        method: 'DELETE', // Change to 'POST' if backend expects POST
      }),
      invalidatesTags: ['Assesment'],
    }),
  }),
});

// ---------- Hooks ----------
export const {
  useCreateAssesmentMutation,
  useSubmitStepMutation,
  useGetAssesmentStepsCountQuery,
  useLazyGetAssesmentStepsCountQuery,

  // Assessment Advice
  useGetAssessmentAdviceQuery,
  useLazyGetAssessmentAdviceQuery,

  // NEW: Asset with Children Hooks
  useGetAssetWithChildrenQuery,
  useLazyGetAssetWithChildrenQuery,

  // Clear User Assessment Mutation Hook
  useClearUserAssessmentMutation,
} = assesmentApi;
