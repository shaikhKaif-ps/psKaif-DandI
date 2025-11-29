// // ======================== 07 Oct
// // app / dashboard / dynamicApps / [app] / startnow / page.tsx;
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { Category, useLazyGetCategoryByAssetIdQuery } from '@/redux/slices/category/categorySlice';

// import { setCategoryIds } from '@/redux/slices/global/globalSlice';

// import { useRouter, useParams } from 'next/navigation';

// import StartNowQuestions from '@/components/global/StartNowQuestions';

// const StartNowPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const appName = params.app as string;
//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   const [triggerGetCategories, { isLoading }] = useLazyGetCategoryByAssetIdQuery();

//   const handleStart = async () => {
//     if (!assetId) return console.warn('❌ No assetId found!');

//     try {
//       const res = await triggerGetCategories(assetId).unwrap();
//       const categoryIds = res.data.map((cat: Category) => cat._id);

//       dispatch(setCategoryIds(categoryIds));

//       // 🔥 Go to first question step (1)
//       router.push(`/dynamicApps/${appName}/questions/1`);
//     } catch (err) {
//       console.error('❌ Category API failed:', err);
//     }
//   };

//   return (
//     <div>
//       <StartNowQuestions
//         mainHeading="Welcome to the Inclusion Assessment – your first step toward creating a more diverse, equitable, and welcoming workplace."
//         userGuidePoints={[
//           'Assess your organization’s inclusivity across key values',
//           'Gain insights into strengths and areas for growth',
//           'Get actionable recommendations for improvement',
//         ]}
//         subHeading="Let’s begin! Your journey toward a more inclusive future starts now."
//         onStart={handleStart}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// };

// export default StartNowPage;
// =========================
// =========================
// =========================
// =========================
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import {
//   Question,
//   useLazyGetAllQuestionByAssetIdQuery,
// } from '@/redux/slices/questions/questionSlice'; // ✅ correct import
// import { setCategoryIds, setQuestions } from '@/redux/slices/global/globalSlice';
// import { useRouter, useParams } from 'next/navigation';
// import StartNowQuestions from '@/components/global/StartNowQuestions';
// import toast from 'react-hot-toast';

// const StartNowPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const appName = params.app as string;
//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   // ✅ Lazy query for fetching all questions by assetId
//   const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();

//   const handleStart = async () => {
//     if (!assetId) {
//       toast.error('No assetId found!');
//       return;
//     }

//     try {
//       // ✅ Fetch all questions using assetId
//       const res = await triggerGetAllQuestions(assetId).unwrap();
//       console.log(res?.data, '===== All Questions Response');

//       if (!res?.data?.length) {
//         toast.error('No questions found for this asset.');
//         return;
//       }

//       // Flatten all questions with category info
//       // const allQuestions: Question[] = res.data.flatMap((item) =>
//       //   item.Questions.map((q) => ({
//       //     ...q,
//       //     CategoryId: item.Category._id,
//       //     CategoryName: item.Category.Name,
//       //   })),
//       // );

//       // const allQuestions: Question[] =
//       //   res.data?.flatMap(
//       //     (item) =>
//       //       item?.Questions?.map((q) => ({
//       //         ...q,
//       //         CategoryId: item?.Category?._id ?? '',
//       //         CategoryName: item?.Category?.Name ?? '',
//       //       })) ?? [],
//       //   ) ?? [];

//         const allQuestions: Question[] = res.data.map((q) => ({
//           ...q,
//         }));

//       dispatch(setQuestions(allQuestions));

//       // ✅ Navigate to first question page
//       router.push(`/dynamicApps/${appName}/questions/1`);
//     } catch (err) {
//       console.error('❌ Failed to fetch questions:', err);
//       toast.error('Something went wrong while loading questions.');
//     }
//   };

//   return (
//     <div>
//       <StartNowQuestions
//         mainHeading="Welcome to the Inclusion Assessment – your first step toward creating a more diverse, equitable, and welcoming workplace."
//         userGuidePoints={[
//           'Assess your organization’s inclusivity across key values',
//           'Gain insights into strengths and areas for growth',
//           'Get actionable recommendations for improvement',
//         ]}
//         subHeading="Let’s begin! Your journey toward a more inclusive future starts now."
//         onStart={handleStart}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// };

// export default StartNowPage;
// =====================
// =====================
// =====================

//path: app/(dashboard)/dynamicApps/(app)/startnow/page.tsx
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import {
//   Question,
//   useLazyGetAllQuestionByAssetIdQuery,
// } from '@/redux/slices/questions/questionSlice';
// import { setQuestions } from '@/redux/slices/global/globalSlice';
// import { useRouter, useParams } from 'next/navigation';
// import StartNowQuestions from '@/components/global/StartNowQuestions';
// import toast from 'react-hot-toast';

// const StartNowPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const appName = params.app as string;
//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();

//   const handleStart = async () => {
//     if (!assetId) {
//       toast.error('No assetId found!');
//       return;
//     }

//     try {
//       const res = await triggerGetAllQuestions(assetId).unwrap();
//       if (!res?.data?.length) {
//         toast.error('No questions found for this asset.');
//         return;
//       }

//       console.log(res?.data, '=== All Questions Response');

//       const allQuestions: Question[] = res.data.map((q) => ({
//         ...q,
//       }));

//       // Store all questions in Redux

//       dispatch(setQuestions(allQuestions));

//       router.push(`/dynamicApps/${appName}/questions/1`);
//     } catch (err) {
//       console.error('Failed to fetch questions:', err);
//       toast.error('Something went wrong while loading questions.');
//     }
//   };

//   return (
//     <StartNowQuestions
//       mainHeading="Welcome to the Assessment"
//       userGuidePoints={[
//         'Assess your organization’s inclusivity',
//         'Gain insights into strengths and areas for growth',
//         'Get actionable recommendations for improvement',
//       ]}
//       subHeading="Let’s begin!"
//       onStart={handleStart}
//       isLoading={isLoading}
//     />
//   );
// };

// export default StartNowPage;
// ===============
// =============== current step count
//path: app/(dashboard)/dynamicApps/(app)/startnow/page.tsx
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import {
//   Question,
//   useLazyGetAllQuestionByAssetIdQuery,
// } from '@/redux/slices/questions/questionSlice';
// import { setQuestions } from '@/redux/slices/global/globalSlice';
// import { useRouter, useParams } from 'next/navigation';
// import StartNowQuestions from '@/components/global/StartNowQuestions';
// import toast from 'react-hot-toast';
// import { useLazyGetAssesmentStepsCountQuery } from '@/redux/slices/assesment/assesmentSlice';
// import { getCookie } from '@/utils/cookies';

// const StartNowPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const appName = params.app as string;

//   const assetIdFromRedux = useSelector((state: RootState) => state.global.assetId);
//   const assessmentIdFromRedux = useSelector((state: RootState) => state.global.assessmentId);

//   // const assetId = useSelector((state: RootState) => state.global.assetId);
//   // const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

//   const assetId = assetIdFromRedux || getCookie('assetId');
//   const assessmentId = assessmentIdFromRedux || getCookie('assessmentId');

//   const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();
//   const [triggerGetStepCount] = useLazyGetAssesmentStepsCountQuery();

//   const handleStart = async () => {
//     if (!assetId) {
//       toast.error('No assetId found!');
//       return;
//     }

//     try {
//       // 1️⃣ Get all questions
//       const res = await triggerGetAllQuestions(assetId).unwrap();
//       if (!res?.data?.length) {
//         toast.error('No questions found for this asset.');
//         return;
//       }

//       const allQuestions: Question[] = res.data.map((q) => ({ ...q }));
//       dispatch(setQuestions(allQuestions));

//       // 2️⃣ Get user's current step (if available)
//       let currentStep = 1; // default
//       if (assessmentId) {
//         try {
//           const stepRes = await triggerGetStepCount(assessmentId).unwrap();
//           if (stepRes?.data?.current) {
//             currentStep = stepRes.data.current;
//           }
//         } catch (err: unknown) {
//           console.warn('Failed to fetch current step count, defaulting to 1.');
//           console.log(err);
//         }
//       }

//       // 3️⃣ Navigate user to their current question
//       router.push(`/dynamicApps/${appName}/questions/${currentStep}`);
//     } catch (err) {
//       console.error('Failed to fetch questions:', err);
//       toast.error('Something went wrong while loading questions.');
//     }
//   };

//   return (
//     <StartNowQuestions
//       mainHeading="Welcome to the Assessment"
//       userGuidePoints={[
//         'Assess your organization’s inclusivity',
//         'Gain insights into strengths and areas for growth',
//         'Get actionable recommendations for improvement',
//       ]}
//       subHeading="Let’s begin!"
//       onStart={handleStart}
//       isLoading={isLoading}
//     />
//   );
// };

// export default StartNowPage;
// ==========================
// ==========================
// ==========================
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import {
//   Question,
//   useLazyGetAllQuestionByAssetIdQuery,
// } from '@/redux/slices/questions/questionSlice';
// import { setQuestions } from '@/redux/slices/global/globalSlice';
// import { useRouter, useParams } from 'next/navigation';
// import StartNowQuestions from '@/components/global/StartNowQuestions';
// import toast from 'react-hot-toast';
// import { useLazyGetAssesmentStepsCountQuery } from '@/redux/slices/assesment/assesmentSlice';

// const StartNowPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const appName = params.app as string;

//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

//   const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();
//   const [triggerGetStepCount] = useLazyGetAssesmentStepsCountQuery();

//   const handleStart = async () => {
//     if (!assetId) {
//       toast.error('No assetId found!');
//       return;
//     }

//     try {
//       const res = await triggerGetAllQuestions(assetId).unwrap();

//       if (!res?.data?.length) {
//         toast.error('No questions found for this asset.');
//         return;
//       }

//       const allQuestions: Question[] = res.data.map((q) => ({ ...q }));
//       dispatch(setQuestions(allQuestions));

//       let currentStep = 1;
//       if (assessmentId) {
//         try {
//           const stepRes = await triggerGetStepCount(assessmentId).unwrap();
//           const userCurrentStep = stepRes?.data?.current;
//           console.log(stepRes?.data?.current, '=== Step Count Response');
//           if (stepRes?.data?.current) {
//             currentStep = stepRes.data.current;
//           }
//         } catch (err: unknown) {
//           console.warn('Failed to fetch current step count, defaulting to 1.', err);
//         }
//       }

//       router.push(`/dynamicApps/${appName}/questions/${currentStep}`);
//     } catch (err) {
//       console.error('Failed to fetch questions:', err);
//       toast.error('Something went wrong while loading questions.');
//     }
//   };

//   return (
//     <StartNowQuestions
//       mainHeading="Welcome to the Assessment"
//       userGuidePoints={[
//         'Assess your organization’s inclusivity',
//         'Gain insights into strengths and areas for growth',
//         'Get actionable recommendations for improvement',
//       ]}
//       subHeading="Let’s begin!"
//       onStart={handleStart}
//       isLoading={isLoading}
//       currentStep={userCurrentStep}
//     />
//   );
// };

// export default StartNowPage;
// ===================
// ===================
// =================== after add resume
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Question,
  useLazyGetAllQuestionByAssetIdQuery,
} from '@/redux/slices/questions/questionSlice';
import { setQuestions } from '@/redux/slices/global/globalSlice';
import { useRouter, useParams } from 'next/navigation';
import StartNowQuestions from '@/components/global/StartNowQuestions';
import toast from 'react-hot-toast';
import { useLazyGetAssesmentStepsCountQuery } from '@/redux/slices/assesment/assesmentSlice';
import { useState, useEffect } from 'react';
// import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';

const StartNowPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const appName = params.app as string;

  const assetId = useSelector((state: RootState) => state.global.assetId);
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

  const [triggerGetAllQuestions, { isLoading }] = useLazyGetAllQuestionByAssetIdQuery();
  const [triggerGetStepCount] = useLazyGetAssesmentStepsCountQuery();

  // Fetch result if assessment is complete
  // const { data: resultData, isSuccess: isResultSuccess } = useGetResultByAssessmentIdQuery(
  //   assessmentId!,
  //   { skip: !assessmentId || !assessmentId },
  // );

  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  // Fetch current step on mount if assessmentId exists
  // useEffect(() => {
  //   const fetchCurrentStep = async () => {
  //     if (!assessmentId) return;
  //     try {
  //       const stepRes = await triggerGetStepCount(assessmentId).unwrap();
  //       if (stepRes?.data?.current) {
  //         setCurrentStep(stepRes.data.current);
  //       }
  //     } catch (err) {
  //       console.warn('Failed to fetch current step count', err);
  //       setCurrentStep(1); // default to 1
  //     }
  //   };

  //   fetchCurrentStep();
  // }, [assessmentId, triggerGetStepCount]);
  useEffect(() => {
    const fetchCurrentStep = async () => {
      if (!assessmentId) {
        setCurrentStep(1); // New assessment → start from 1
        return;
      }

      try {
        const stepRes = await triggerGetStepCount(assessmentId).unwrap();

        const data = stepRes?.data;

        if (data?.remainingSteps === 0) {
          setIsAssessmentComplete(true);
          // Optionally auto-redirect here if you want
          // router.push(`/dynamicApps/${appName}/result`);
        } else {
          // Continue from next step
          const nextStep = (data?.currentCount || 0) + 1;
          setCurrentStep(nextStep);
        }
      } catch (err) {
        console.warn('Failed to fetch step count', err);
        setCurrentStep(1); // fallback
      }
    };

    fetchCurrentStep();
  }, [assessmentId, triggerGetStepCount, appName, router, assetId]);

  const handleStart = async () => {
    if (!assetId) {
      toast.error('No assetId found!');
      return;
    }

    try {
      console.log(assetId);
      const res = await triggerGetAllQuestions(assetId).unwrap();

      if (!res?.data?.length) {
        toast.error('No questions found for this asset.');
        return;
      }

      const allQuestions: Question[] = res.data.map((q) => ({ ...q }));
      dispatch(setQuestions(allQuestions));

      // Decide where to go
      if (isAssessmentComplete) {
        router.push(`/dynamicApps/${appName}/completed`);
      } else {
        const stepToGo = currentStep || 1;
        router.push(`/dynamicApps/${appName}/questions/${stepToGo}`);
      }
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      toast.error('Something went wrong while loading questions.');
    }
  };

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
