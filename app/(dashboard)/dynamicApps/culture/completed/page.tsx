// app/(dashboard)/dynamicApps/culture/completed/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetCultureResultQuery } from '@/redux/slices/culture/cultureSlice';
import LoadingScreen from '@/components/global/LoadingScreen';

export default function CultureCompletedPage() {
  const router = useRouter();
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
  const { data: resultData, isLoading } = useGetCultureResultQuery(assessmentId || '', {
    skip: !assessmentId,
    refetchOnMountOrArgChange: true,
  });

  const [view, setView] = useState<'status' | 'results'>('status');

  if (isLoading) return <LoadingScreen message="Loading your culture report..." />;

  const data = resultData?.data;

  // Color helpers to match project style (ResultPage pattern)
  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getBadgeStyle = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const culturalLabels: Record<string, string> = {
    LinearActive: 'Linear-Active',
    MultiActive: 'Multi-Active',
    Reactive: 'Reactive',
    Reflective: 'Reflective',
  };

  const discLabels: Record<string, string> = {
    Direction: 'Directional',
    Interaction: 'Interactive',
    Stability: 'Stability',
    Care: 'Care',
  };

  if (view === 'results' && data) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[90px] px-4 md:px-8 pb-16 font-inter">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => setView('status')}
              className="flex items-center gap-2 text-gray-500 hover:text-[#490000] font-medium transition-colors"
            >
              <FaArrowLeft /> Back to Summary
            </button>
          </div>

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Assessment Complete
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Culture & Behavioral Analysis</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover your organizations primary cultural type and behavioral drives through these
              detailed metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cultural Profile Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                  Lewis Cultural Model
                  <FaInfoCircle
                    className="text-gray-300 text-base cursor-help"
                    title="Based on the Lewis Model of interaction styles."
                  />
                </h3>

                <div className="space-y-6 flex-1">
                  {Object.entries(data.CulturalProfile.types).map(([key, value]) => {
                    const percentage =
                      data.CulturalProfile.percentages[
                        key as keyof typeof data.CulturalProfile.percentages
                      ];
                    const isPrimary = key === data.CulturalProfile.primaryType;

                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-xl border ${isPrimary ? 'border-[#490000] bg-red-50/20' : 'border-gray-100'}`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span
                            className={`font-bold text-base ${isPrimary ? 'text-[#490000]' : 'text-gray-700'}`}
                          >
                            {culturalLabels[key]} {isPrimary && '(Primary)'}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(value)}`}
                          >
                            Score: {value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(value)} transition-all duration-700`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium tracking-tight">
                          <span>Relative Influence</span>
                          <span>{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* DISC Profile Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                  Behavioral Drives (DISC Summary)
                  <FaInfoCircle
                    className="text-gray-300 text-base cursor-help"
                    title="Summary of core behavioral motivations."
                  />
                </h3>

                <div className="space-y-6 flex-1">
                  {Object.entries(data.DiscProfile.scores).map(([key, value]) => {
                    const percentage =
                      data.DiscProfile.percentages[
                        key as keyof typeof data.DiscProfile.percentages
                      ];
                    const isPrimary = key === data.DiscProfile.primaryDrive;

                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-xl border ${isPrimary ? 'border-[#490000] bg-red-50/20' : 'border-gray-100'}`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span
                            className={`font-bold text-base ${isPrimary ? 'text-[#490000]' : 'text-gray-700'}`}
                          >
                            {discLabels[key]} {isPrimary && '(Dominant)'}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(percentage)}`}
                          >
                            {percentage}% Intensity
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(percentage)} transition-all duration-700`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium tracking-tight">
                          <span>Raw Score</span>
                          <span>{value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-10 py-3 bg-[#490000] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Status/Summary View
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 font-inter">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Completed</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your Culture Assessment responses have been processed. You can now explore your
          organizational style and behavioral drivers.
        </p>

        <div className="bg-white rounded-2xl p-8 mb-10 border border-gray-100 shadow-sm text-left">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#490000] font-black text-xl border border-red-100">
              {data?.CulturalProfile?.primaryType?.charAt(0) || 'C'}
            </div>
            <div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Primary Culture
              </div>
              <div className="text-lg font-bold text-gray-800">
                {culturalLabels[data?.CulturalProfile?.primaryType || ''] || 'Calculating...'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#490000] font-black text-xl border border-red-100">
              {data?.DiscProfile?.primaryDrive?.charAt(0) || 'D'}
            </div>
            <div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Disc Profile
              </div>
              <div className="text-lg font-bold text-gray-800">
                {data?.DiscProfile?.primaryDrive || 'Calculating...'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setView('results')}
            className="w-full py-3.5 bg-[#490000] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3"
          >
            View Full Report
          </button>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-500 font-bold hover:text-[#490000] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>

      <div className="mt-16 opacity-10">
        <Image src="/inclusion/withOutWhite.svg" alt="Logo" width={80} height={80} />
      </div>
    </div>
  );
}
