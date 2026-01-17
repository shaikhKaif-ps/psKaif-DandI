
// ================
// ================ 06 Dec
// ================

'use client';

import ResultPage from '@/components/results/ResultPage';
import Advice from '@/components/results/Advice';
import LoadingScreen from '@/components/global/LoadingScreen';
import { useState, useRef, useEffect } from 'react';
import { FaStar, FaRegClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';
import { useGetAssessmentAdviceQuery } from '@/redux/slices/assesment/assesmentSlice';
import { setResultData } from '@/redux/slices/global/globalSlice';

const tabs = [
  { id: 'results', label: 'Results' },
  { id: 'suggestedCourses', label: 'Suggested Courses' },
  { id: 'advice', label: 'Advice' },
];

const placeholderCourses = [
  { id: 1, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 2, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 3, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
];

export default function CompletedPage() {
  const dispatch = useDispatch();
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

  // Fetch result (for results & courses)
  const {
    data: resultData,
    error: resultError,
    isLoading: resultLoading,
  } = useGetResultByAssessmentIdQuery(assessmentId || '', { skip: !assessmentId });

  // Fetch advice with auto-retry
  const {
    data: adviceData,
    error: adviceError,
    isLoading: adviceLoading,
    refetch: refetchAdvice,
  } = useGetAssessmentAdviceQuery(assessmentId || '', {
    skip: !assessmentId,
    refetchOnMountOrArgChange: 3, // Retry up to 3 times on mount/change
  });

  // Store result data in Redux
  useEffect(() => {
    if (resultData?.data) {
      dispatch(setResultData(resultData.data));
    }
  }, [resultData, dispatch]);

  // Auto-refetch advice when result becomes available (advice might be ready now)
  useEffect(() => {
    if (resultData?.data && !adviceData && !adviceLoading && assessmentId) {
      refetchAdvice();
    }
  }, [resultData, adviceData, adviceLoading, assessmentId, refetchAdvice]);

  const [activeTab, setActiveTab] = useState('results');
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabRefs.current[index];
    if (el) {
      setHighlightStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab, resultLoading, adviceLoading]);

  // Show full loading only if result is loading
  if (resultLoading) {
    return <LoadingScreen message="Generating your assessment results..." />;
  }

  // Critical error: result failed
  if (resultError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error loading results. Please try again later.
      </div>
    );
  }

  // Extract advice categories
  const categoryAdvice = adviceData?.data?.CategoryScores || [];

  return (
    <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
      {/* Tabs */}
      <div className="relative flex rounded-full border border-gray-300 bg-gray-100 p-1 mb-6 max-w-fit">
        <div
          className="absolute top-1 bottom-1 rounded-full bg-[#5A0C0C] transition-all duration-300"
          style={{ left: highlightStyle.left, width: highlightStyle.width }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer relative z-10 rounded-full px-4 py-2 text-sm md:text-base font-medium transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="text-gray-600">
          <ResultPage />
        </div>
      )}

      {/* Suggested Courses Tab */}
      {activeTab === 'suggestedCourses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {resultData?.data.RecommendedCourseId ? (
            <div className="p-3 h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md bg-white flex flex-col">
              <div className="bg-[#542E2E] h-[180px] rounded-lg flex items-center justify-center text-white text-2xl">
                Play
              </div>
              <div className="py-3 flex flex-col flex-1 justify-between">
                <p className="font-bold text-sm text-gray-800">
                  Recommended Course (ID: {resultData.data.RecommendedCourseId})
                </p>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-1 rounded">
                    <FaRegClock /> 10 min
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar /> <span className="text-black text-base">4.5</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            placeholderCourses.map((course) => (
              <div
                key={course.id}
                className="p-3 h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md bg-white flex flex-col"
              >
                <div className="bg-[#542E2E] h-[180px] rounded-lg flex items-center justify-center text-white text-2xl">
                  Play
                </div>
                <div className="py-3 flex flex-col flex-1 justify-between">
                  <p className="font-bold text-sm text-gray-800 w-[70%]">{course.title}</p>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-1 rounded">
                      <FaRegClock /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar /> <span className="text-black text-base">{course.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Advice Tab */}
      {activeTab === 'advice' && (
        <div>
          {adviceLoading ? (
            <div className="text-center py-12 text-gray-600">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5A0C0C] mb-3"></div>
              <p>Generating personalized advice...</p>
            </div>
          ) : adviceError ? (
            <div className="text-center py-12">
              <p className="text-amber-600 mb-3">
                Advice is still being generated. This may take a few seconds.
              </p>
              <button
                onClick={() => refetchAdvice()}
                className="px-4 py-2 bg-[#5A0C0C] text-white rounded-md hover:bg-[#4a0a0a] transition-colors"
              >
                Retry Now
              </button>
            </div>
          ) : (
            <Advice categories={categoryAdvice} />
          )}
        </div>
      )}
    </div>
  );
}
