// app/(dashboard)/dynamicApps/culture/questions/[questionNumber]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  useGetSpecificQuestionQuery,
  useSubmitResponseMutation,
  useGetAssessmentProgressQuery,
  useCompleteAssessmentMutation,
  useCalculateCultureResultMutation,
} from '@/redux/slices/culture/cultureSlice';
import LoadingScreen from '@/components/global/LoadingScreen';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function CultureQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const questionNumber = Number(params.questionNumber);
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

  const { data: questionData, isLoading: isQuestionLoading } = useGetSpecificQuestionQuery(
    { assessmentId: assessmentId || '', questionNumber },
    { skip: !assessmentId },
  );

  const { data: progressData } = useGetAssessmentProgressQuery(assessmentId || '', {
    skip: !assessmentId,
  });

  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();
  const [completeAssessment, { isLoading: isCompleting }] = useCompleteAssessmentMutation();
  const [calculateResult] = useCalculateCultureResultMutation();

  const [rankings, setRankings] = useState<{ choiceIndex: number; rank: number }[]>([]);

  useEffect(() => {
    if (questionData?.data?.Choices) {
      if (questionData.data.ExistingRankings) {
        setRankings(questionData.data.ExistingRankings);
      } else {
        // Initialize rankings with null rank or 0
        setRankings(
          questionData.data.Choices.map((c: { index: number }) => ({
            choiceIndex: c.index,
            rank: 0,
          })),
        );
      }
    }
  }, [questionData]);

  const handleRankChange = (choiceIndex: number, rank: number) => {
    setRankings((prev) => {
      // If this rank is already taken by another choice, clear it from that choice
      const newRankings = prev.map((r) => {
        if (r.rank === rank) return { ...r, rank: 0 };
        if (r.choiceIndex === choiceIndex) return { ...r, rank };
        return r;
      });
      return newRankings;
    });
  };

  const isAllRanked = rankings.every((r) => r.rank > 0);

  const handleNext = async () => {
    if (!isAllRanked) {
      toast.error('Please rank all options before proceeding.');
      return;
    }

    try {
      if (!assessmentId) return;
      const res = await submitResponse({
        assessmentId,
        QuestionNumber: questionNumber,
        Rankings: rankings,
      }).unwrap();

      if (res.status) {
        if (res.data.CurrentQuestion > questionNumber) {
          router.push(`/dynamicApps/culture/questions/${res.data.CurrentQuestion}`);
        } else {
          // If no next question, complete and calculate
          const compRes = await completeAssessment(assessmentId).unwrap();
          if (compRes.status) {
            toast.loading('Calculating results...', { id: 'calc' });
            await calculateResult(assessmentId).unwrap();
            toast.success('Results calculated!', { id: 'calc' });
            router.push(`/dynamicApps/culture/completed`);
          }
        }
      }
    } catch (err) {
      toast.error('Failed to process submission', { id: 'calc' });
    }
  };

  const handleComplete = async () => {
    if (!assessmentId) return;
    try {
      const res = await completeAssessment(assessmentId).unwrap();
      if (res.status) {
        await calculateResult(assessmentId).unwrap();
        router.push(`/dynamicApps/culture/completed`);
      }
    } catch (err) {
      toast.error('Failed to complete assessment');
    }
  };

  if (isQuestionLoading || !assessmentId) return <LoadingScreen />;
  if (!questionData?.data) return <div>Question not found</div>;

  const choices = questionData.data.Choices;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Question and Ranking */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              Question {questionNumber} of {questionData.data.TotalQuestions}
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold text-[#7F0000] leading-tight">
              {questionData.data.QuestionText}
            </h1>
            <p className="text-gray-500 mt-4 italic">
              Please rank the following options from 1 (Highest) to {choices.length} (Lowest).
            </p>
          </div>

          <div className="space-y-4">
            {choices.map((choice) => {
              const currentRank = rankings.find((r) => r.choiceIndex === choice.index)?.rank || 0;
              return (
                <div
                  key={choice.index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].slice(0, choices.length).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRankChange(choice.index, num)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                          currentRank === num
                            ? 'bg-[#7F0000] text-white'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">{choice.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            {questionNumber < questionData.data.TotalQuestions ? (
              <button
                onClick={handleNext}
                disabled={!isAllRanked || isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isAllRanked && !isSubmitting
                    ? 'bg-[#7F0000] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Next Question'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAllRanked || isSubmitting || isCompleting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isAllRanked && !isSubmitting && !isCompleting
                    ? 'bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting || isCompleting ? 'Processing...' : 'Finish Assessment'}
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Progress and Illustration */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col justify-between items-center border-l border-gray-100">
          <div className="w-full">
            <h3 className="text-gray-600 font-bold mb-4">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-[#7F0000] h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${progressData?.data?.ProgressPercentage || (questionNumber / (questionData?.data?.TotalQuestions || 1)) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 text-right">
              {progressData?.data?.ProgressPercentage ||
                Math.round((questionNumber / (questionData?.data?.TotalQuestions || 1)) * 100)}
              % Completed
            </p>
          </div>

          <div className="my-12">
            <Image
              src="/inclusion/qusetionsScreenBg.png"
              alt="Question"
              width={200}
              height={200}
              className="opacity-80"
            />
          </div>

          <p className="text-center text-sm text-gray-400 font-medium px-4">
            Your perspective matters. Rank these options based on your daily experience.
          </p>
        </div>
      </div>
    </div>
  );
}
