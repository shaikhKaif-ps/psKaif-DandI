

// path : dynamicApps/[app]/startnow

'use client';


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Question,
  CategoryWithQuestions,
  useLazyGetAllQuestionByAssetIdQuery,
} from '@/redux/slices/questions/questionSlice';
import {
  setQuestions,
  setAssessmentType,
  setAssetId,
  setChildAssetId,
} from '@/redux/slices/global/globalSlice';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import StartNowQuestions from '@/components/global/StartNowQuestions';
import LoadingScreen from '@/components/global/LoadingScreen';
import toast from 'react-hot-toast';
import { useLazyGetAssesmentStepsCountQuery } from '@/redux/slices/assesment/assesmentSlice';
import { useState, useEffect } from 'react';
// import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';

const StartNowPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const appName = params.app as string;

  // if is child app, get childAssetId from global slice
  const assetId = useSelector((state: RootState) => state.global.assetId);
  const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
  const isChild = useSelector((state: RootState) => state.global.isChild);
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

  console.log(assetId, '----- startNowpage assetId ---------');
  console.log(childAssetId, '----- startNowpage childAssetId ---------');
  console.log(isChild, '----- startNowpage isChild ---------');
  // console.log(assessmentId, '----- startNowpage assessmentId ---------');

  const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();
  const [triggerGetStepCount] = useLazyGetAssesmentStepsCountQuery();

  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [assessmentTypeState, setAssessmentTypeState] = useState<string | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchCurrentStep = async () => {
      setIsInitializing(true);
      
      // PRIORITY: Check URL for childAssetId first
      const urlChildAssetId = searchParams.get('childAssetId');
      if (urlChildAssetId) {
        console.log('🎯 Setting childAssetId from URL:', urlChildAssetId);
        dispatch(setChildAssetId(urlChildAssetId));
      }
      
      if (!assessmentId) {
        console.log('⚠️ No assessmentId - starting fresh assessment');
        setCurrentStep(1); // New assessment → start from 1
        setIsInitializing(false);
        return;
      }

      try {
        const stepRes = await triggerGetStepCount(assessmentId).unwrap();

        const data = stepRes?.data;
        
        // CRITICAL: If URL has childAssetId, check if it matches API response
        if (urlChildAssetId && data?.childAssetId && urlChildAssetId !== data.childAssetId) {
          console.log('🔄 Different child asset detected:', {
            urlChildAssetId,
            apiChildAssetId: data.childAssetId,
            action: 'Starting new assessment'
          });
          // Different child asset - start fresh
          setCurrentStep(1);
          setIsAssessmentComplete(false);
          setAssessmentTypeState(data?.assessmentType);
          dispatch(setAssessmentType(data?.assessmentType || null));
          setIsInitializing(false);
          return;
        }
        
        // Same child or no mismatch - continue with existing assessment
        setAssessmentTypeState(data?.assessmentType);
        dispatch(setAssessmentType(data?.assessmentType || null));

        if (data?.assetId) {
          dispatch(setAssetId(data.assetId));
        }
        
        // Only set childAssetId from API if NOT provided in URL
        if (data?.childAssetId && !urlChildAssetId) {
          dispatch(setChildAssetId(data.childAssetId));
        }

        if (data?.remainingSteps === 0) {
          setIsAssessmentComplete(true);
          if (data?.assessmentType === 'swot') {
            router.push(`/dynamicApps/${appName}/swot-result`);
            return;
          }
        } else {
          // Continue from next step
          const nextStep = (data?.currentCount || 0) + 1;
          setCurrentStep(nextStep);
        }
      } catch (err) {
        console.warn('Failed to fetch step count', err);
        setCurrentStep(1); // fallback
      } finally {
        setIsInitializing(false);
      }
    };

    fetchCurrentStep();
  }, [assessmentId, triggerGetStepCount, appName, router, assetId, dispatch, searchParams]);

  const handleStart = async () => {
    // Check if we have a child asset ID in URL query params
    const urlChildAssetId = searchParams.get('childAssetId');
    const targetAssetId = urlChildAssetId || (isChild ? childAssetId : assetId);

    if (!targetAssetId) {
      toast.error('No asset ID found!');
      return;
    }

    try {
      console.log(
        targetAssetId,
        urlChildAssetId ? 'URL child asset' : isChild ? 'child asset' : 'parent asset',
      );
      const res = await triggerGetAllQuestions(targetAssetId).unwrap();

      if (!res?.data?.length) {
        toast.error('No questions found for this asset.');
        return;
      }

      const allQuestions: Question[] = res.data.flatMap((cat: CategoryWithQuestions) =>
        cat.questions.map((q) => ({
          ...q,
          CategoryId: cat.CategoryId,
          CategoryName: cat.CategoryName,
          CategoryImage: cat.CategoryImage,
          totalQuestion: cat.totalQuestions,
        })),
      );
      dispatch(setQuestions(allQuestions));

      // Decide where to go
      if (isAssessmentComplete) {
        if (assessmentTypeState === 'swot') {
          router.push(`/dynamicApps/${appName}/swot-result`);
        } else {
          router.push(`/dynamicApps/${appName}/completed`);
        }
      } else {
        const stepToGo = currentStep || 1;
        router.push(`/dynamicApps/${appName}/questions/${stepToGo}`);
      }
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      toast.error('Something went wrong while loading questions.');
    }
  };

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <StartNowQuestions
      mainHeading="Welcome to the Assessment"
      userGuidePoints={[
        'Assess your organization’s inclusivity',
        'Gain insights into strengths and areas for growth',
        'Get actionable recommendations for improvement',
      ]}
      subHeading="Let’s begin!"
      onStart={handleStart}
      isLoading={isLoading}
      currentStep={currentStep}
      isAssessmentComplete={isAssessmentComplete}
    />
  );
};

export default StartNowPage;
