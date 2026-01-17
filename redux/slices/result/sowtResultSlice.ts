import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* ======================= Types ======================= */

/* ---------- Categories (existing) ---------- */

export type SwotQuadrant = 'strength' | 'weakness' | 'opportunity' | 'threat';

export interface SwotCategory {
  id: string;
  name: string;
  quadrant: SwotQuadrant;
  averageScore: number;
  isCompleted: boolean;
}

export interface SwotCategoriesData {
  viewType: 'categories';
  childAssetId: string;
  categories: SwotCategory[];
  isCompleted: boolean;
}

export interface SwotCategoriesResponse {
  status: boolean;
  message: string;
  data: SwotCategoriesData;
}

/* ---------- Tabular (new) ---------- */

export interface AdviceMessage {
  team: string;
  teamLeader: string;
  organization: string;
}

export interface SwotTabularCategory {
  categoryId: string;
  categoryName: string;
  quadrant: SwotQuadrant;
  averageScore: number;
  score: number;
  maxScore: number;
  percentage: number;
  adviceMessage: AdviceMessage;
}

export interface SwotTabularResult {
  childAssetId: string;
  childAssetName: string;
  categories: SwotTabularCategory[];
  isCompleted: boolean;
  swotCount?: {
    s: number;
    w: number;
    o: number;
    t: number;
  };
}

export interface SwotTabularData {
  childAssetFilter: string;
  quadrantFilter: string;
  results: SwotTabularResult[];
}

export interface SwotTabularResponse {
  status: boolean;
  message: string;
  data: SwotTabularData;
}

/* ======================= Query Params ======================= */

export interface GetSwotCategoriesParams {
  assetId: string;
  childAssetId?: string | null;
}

export interface GetSwotTabularParams {
  assetId: string;
  childAssetId?: string; // "all" | childAssetId
  quadrantFilter?: SwotQuadrant | 'all';
}

/* ======================= API Slice ======================= */

export const swotResultApi = createApi({
  reducerPath: 'swotResultApi',
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
  tagTypes: ['SwotResult'],
  endpoints: (builder) => ({
    /* ---------- SWOT Categories ---------- */

    getSwotCategoriesByChildAsset: builder.query<SwotCategoriesResponse, GetSwotCategoriesParams>({
      query: ({ assetId, childAssetId }) => {
        const params: Record<string, string> = {};

        if (childAssetId) {
          params.viewType = 'categories';
          params.childAssetId = childAssetId;
        } else {
          params.viewType = 'childAssets';
        }

        return {
          url: `/assesmentresult/swot-quadrant/${assetId}`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['SwotResult'],
    }),

    /* ---------- SWOT Tabular Data ---------- */

    getSwotTabularData: builder.query<SwotTabularResponse, GetSwotTabularParams>({
      query: ({ assetId, childAssetId, quadrantFilter = 'all' }) => {
        return {
          url: `/assesmentresult/swot-tabular/${assetId}`,
          method: 'GET',
          params: {
            childAssetId: childAssetId || 'all',
            quadrantFilter,
          },
        };
      },
      providesTags: ['SwotResult'],
    }),
  }),
});

/* =======================
   Export Hooks
 ======================= */

export const { useGetSwotCategoriesByChildAssetQuery, useGetSwotTabularDataQuery } = swotResultApi;
