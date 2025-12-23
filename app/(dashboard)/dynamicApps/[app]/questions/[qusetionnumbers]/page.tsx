// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { toast } from 'react-hot-toast';
// import { useSubmitStepMutation, SubmitStepRequest } from '@/redux/slices/assesment/assesmentSlice';
// import { motion } from 'framer-motion';

// // ✅ Stepper Progress Bar Component
// const StepperProgressBar: React.FC<{ totalQuestions: number; currentQuestionNo: number }> = ({
//   totalQuestions,
//   currentQuestionNo,
// }) => {
//   const steps = useMemo(
//     () => Array.from({ length: totalQuestions }, (_, i) => i + 1),
//     [totalQuestions],
//   );

//   return (
//     <div className="flex items-center w-full mb-6 ">
//       {steps.map((step) => {
//         const isCompleted = step < currentQuestionNo;
//         const isActive = step === currentQuestionNo;

//         return (
//           <div key={step} className="flex-1 flex items-center">
//             {/* Step Circle */}
//             <motion.div
//               className={`w-13 h-[6px] rounded-3xl  flex items-center justify-center text-sm font-semibold border-2 relative ${
//                 isCompleted
//                   ? 'bg-gray-500 border-gray-500'
//                   : isActive
//                     ? 'bg-green-500 border-green-500 '
//                     : 'bg-white border-gray-300 text-gray-600'
//               }`}
//               layout
//               transition={{ duration: 0.3 }}
//             ></motion.div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ✅ QuestionPage Component
// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;

//   const questions = useSelector((state: RootState) => state.global.questions);
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const questionNumber = Number(pathname.split('/').pop()) || 1;
//   const currentQuestionIndex = questionNumber - 1;
//   const question = questions[currentQuestionIndex];

//   const [submitStep, { isLoading: isSubmitting }] = useSubmitStepMutation();

//   useEffect(() => {
//     setSelectedOption(null);
//   }, [currentQuestionIndex]);

//   const [initialRender, setInitialRender] = useState(true);
//   useEffect(() => {
//     setInitialRender(false);
//   }, []);

//   if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
//   if (!question) return <p>Question not found</p>;
//   if (!assessmentId) return <p>Assessment not started. Please start first</p>;

//   const handleOptionSelect = (opt: number) => setSelectedOption(opt);

//   const handleNext = async () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }

//     try {
//       const body: SubmitStepRequest = {
//         assessmentId,
//         StepNumber: questionNumber,
//         AssetId: question.CategoryId,
//         CategoryId: question.CategoryId,
//         QuestionId: question._id,
//         AnswerValue: selectedOption,
//       };

//       const res = await submitStep(body).unwrap();
//       const lastAnswer = res?.data?.stepAnswers?.[res.data.stepAnswers.length - 1];

//       if (!lastAnswer) {
//         console.log('Failed to save answer.');
//         return;
//       }

//       if (lastAnswer.AnswerValue > 0) {
//         if (currentQuestionIndex < questions.length - 1) {
//           router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
//         } else {
//           toast.success('You have completed all questions!');
//           router.push(`/dynamicApps/${appName}/completed`);
//         }
//       } else {
//         toast.error('Answer was not saved. Please try again.');
//       }
//     } catch (err) {
//       console.error('Failed to submit answer:', err);
//       toast.error('Something went wrong while submitting your answer.');
//     }
//   };

//   return (
//     <div className="h-fit flex flex-col gap-4 lg:gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-1">
//       <div className="flex-1 max-w-xl">
//         {/* Question Content */}
//         <h1 className="text-4xl md:text-2xl lg:text-4xl font-bold text-[#7F0000] mb-6 capitalize">
//           {question.CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
//         </h1>

//         <p className="text-lg text-gray-700 md:text-2xl mb-8">{question.Question}</p>

//         {/* Options */}
//         <div className="flex items-center gap-6 flex-wrap mb-10">
//           {question.Options.map((opt: number) => (
//             <label
//               key={opt}
//               className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
//                 selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question._id}`}
//                 value={opt}
//                 checked={selectedOption === opt}
//                 onChange={() => handleOptionSelect(opt)}
//                 className="hidden"
//               />
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
//                   selectedOption === opt
//                     ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
//                     : 'bg-white border-gray-300 hover:border-[#7F0000]'
//                 }`}
//               >
//                 <span className="text-sm">{opt}</span>
//               </div>
//             </label>
//           ))}
//         </div>

//         {/* Next/Finish Button */}
//         <button
//           onClick={handleNext}
//           disabled={selectedOption === null || isSubmitting}
//           className={`w-full py-3 cursor-pointer mb-3 text-lg font-semibold transition-all duration-300 ${
//             selectedOption === null || isSubmitting
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
//           }`}
//         >
//           {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
//         </button>

//         {/* ✅ Stepper Progress Bar */}
//         {!initialRender && (
//           <StepperProgressBar
//             totalQuestions={question.totalQuestion ?? 1}
//             currentQuestionNo={question.questionNo ?? 1}
//           />
//         )}
//       </div>

//       {/* Illustration */}
//       <div className="flex-1 flex justify-center mt-1 md:mt-0">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Question Illustration"
//           width={330}
//           height={330}
//           className="w-full max-w-md h-auto"
//         />
//       </div>
//     </div>
//   );
// }
// ============================
// ============================
// ============================ grok
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { toast } from 'react-hot-toast';
// import { useSubmitStepMutation, SubmitStepRequest } from '@/redux/slices/assesment/assesmentSlice';
// import { motion } from 'framer-motion';

// // Fixed & Responsive Stepper Progress Bar
// const StepperProgressBar: React.FC<{ totalQuestions: number; currentQuestionNo: number }> = ({
//   totalQuestions,
//   currentQuestionNo,
// }) => {
//   const progress = (currentQuestionNo / totalQuestions) * 100;

//   return (
//     <div className="w-full mt-8 px-4 sm:px-0">
//       <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
//         <motion.div
//           className="absolute top-0 left-0 h-full bg-[#7F0000]"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//         />
//       </div>
//       <div className="flex justify-between mt-3 text-xs text-gray-500">
//         <span>Question {currentQuestionNo}</span>
//         <span>{totalQuestions} Total</span>
//       </div>
//     </div>
//   );
// };

// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;

//   const questions = useSelector((state: RootState) => state.global.questions);
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const questionNumber = Number(pathname.split('/').pop()) || 1;
//   const currentQuestionIndex = questionNumber - 1;
//   const question = questions[currentQuestionIndex];

//   const [submitStep, { isLoading: isSubmitting }] = useSubmitStepMutation();

//   useEffect(() => {
//     setSelectedOption(null);
//   }, [currentQuestionIndex]);

//   const [initialRender, setInitialRender] = useState(true);
//   useEffect(() => {
//     setInitialRender(false);
//   }, []);

//   if (!questions?.length)
//     return (
//       <p className="text-center py-10">No questions found. Please start the assessment first.</p>
//     );
//   if (!question) return <p className="text-center py-10">Question not found</p>;
//   if (!assessmentId)
//     return <p className="text-center py-10">Assessment not started. Please start first</p>;

//   const handleOptionSelect = (opt: number) => setSelectedOption(opt);

//   const handleNext = async () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }

//     try {
//       const body: SubmitStepRequest = {
//         assessmentId,
//         StepNumber: questionNumber,
//         AssetId: question.CategoryId,
//         CategoryId: question.CategoryId,
//         QuestionId: question._id,
//         AnswerValue: selectedOption,
//       };

//       const res = await submitStep(body).unwrap();
//       const lastAnswer = res?.data?.stepAnswers?.[res.data.stepAnswers.length - 1];

//       if (!lastAnswer || lastAnswer.AnswerValue <= 0) {
//         toast.error('Answer was not saved. Please try again.');
//         return;
//       }

//       if (currentQuestionIndex < questions.length - 1) {
//         router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
//       } else {
//         toast.success('You have completed all questions!');
//         router.push(`/dynamicApps/${appName}/completed`);
//       }
//     } catch (err) {
//       console.error('Failed to submit answer:', err);
//       toast.error('Something went wrong while submitting your answer.');
//     }
//   };

//   const totalQuestions = questions.length;
//   const currentQuestionNo = questionNumber;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] flex flex-col">
//       {/* Main Content - Mobile: Column, Desktop: Row */}
//       <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-5 py-8 gap-10 lg:gap-16 max-w-7xl mx-auto w-full">
//         {/* Left Side: Question */}
//         <div className="w-full lg:w-1/2 flex flex-col items-start">
//           {/* Category Title */}
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7F0000] mb-4 text-center lg:text-left w-full">
//             {question.CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) =>
//               char.toUpperCase(),
//             )}
//           </h1>

//           {/* Question Text */}
//           <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-10 text-center lg:text-left leading-relaxed">
//             {question.Question}
//           </p>

//           {/* Answer Options - Grid on Mobile, Horizontal on Large */}
//           <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 sm:gap-6 w-full max-w-md mx-auto lg:mx-0 mb-10">
//             {question.Options.map((opt: number) => (
//               <label
//                 key={opt}
//                 className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110"
//               >
//                 <input
//                   type="radio"
//                   name={`question-${question._id}`}
//                   value={opt}
//                   checked={selectedOption === opt}
//                   onChange={() => handleOptionSelect(opt)}
//                   className="sr-only"
//                 />
//                 <div
//                   className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-4 font-bold text-lg transition-all duration-300 shadow-md ${
//                     selectedOption === opt
//                       ? 'bg-[#7F0000] border-[#7F0000] text-white scale-110'
//                       : 'bg-white border-gray-300 text-gray-700 hover:border-[#7F0000]'
//                   }`}
//                 >
//                   {opt}
//                 </div>
//               </label>
//             ))}
//           </div>

//           {/* Next / Finish Button */}
//           <button
//             onClick={handleNext}
//             disabled={selectedOption === null || isSubmitting}
//             className={`w-full max-w-md mx-auto lg:mx-0 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg ${
//               selectedOption === null || isSubmitting
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#7F0000] hover:bg-[#6a0000] text-white active:scale-95'
//             }`}
//           >
//             {isSubmitting
//               ? 'Submitting...'
//               : currentQuestionIndex < questions.length - 1
//                 ? 'Next →'
//                 : 'Finish Assessment'}
//           </button>

//           {/* Progress Bar */}
//           {!initialRender && (
//             <StepperProgressBar
//               totalQuestions={totalQuestions}
//               currentQuestionNo={currentQuestionNo}
//             />
//           )}
//         </div>

//         {/* Right Side: Illustration (Hidden on small mobile, visible from md+) */}
//         <div className="hidden md:block lg:w-1/2 flex justify-center">
//           <Image
//             src="/inclusion/qusetionsScreenBg.png"
//             alt="Assessment Illustration"
//             width={450}
//             height={450}
//             className="w-full max-w-sm lg:max-w-md h-auto object-contain"
//             priority
//           />
//         </div>
//       </div>

//       {/* Optional: Smaller illustration on mobile at bottom */}
//       <div className="md:hidden flex justify-center pb-8 px-6">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Assessment Illustration"
//           width={300}
//           height={300}
//           className="w-full max-w-xs h-auto object-contain opacity-80"
//         />
//       </div>
//     </div>
//   );
// }
// =========================
// =========================
// =========================
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-hot-toast';
import { useSubmitStepMutation, SubmitStepRequest } from '@/redux/slices/assesment/assesmentSlice';
import { motion } from 'framer-motion';

// ✅ Stepper Progress Bar Component
const StepperProgressBar: React.FC<{ totalQuestions: number; currentQuestionNo: number }> = ({
  totalQuestions,
  currentQuestionNo,
}) => {
  const steps = useMemo(
    () => Array.from({ length: totalQuestions }, (_, i) => i + 1),
    [totalQuestions],
  );

  return (
    <div className="flex items-center w-full mb-6">
      {steps.map((step) => {
        const isCompleted = step < currentQuestionNo;
        const isActive = step === currentQuestionNo;

        return (
          <div key={step} className="flex-1 flex items-center">
            <motion.div
              className={`w-5 md:w-9 lg:w-13 h-[6px] rounded-3xl flex items-center justify-center text-sm font-semibold border-2 relative ${
                isCompleted
                  ? 'bg-gray-500 border-gray-500'
                  : isActive
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white border-gray-300 text-gray-600'
              }`}
              layout
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        );
      })}
    </div>
  );
};

// ✅ QuestionPage Component
export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const appName = params.app as string;

  const questions = useSelector((state: RootState) => state.global.questions);
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questionNumber = Number(pathname.split('/').pop()) || 1;
  const currentQuestionIndex = questionNumber - 1;
  const question = questions[currentQuestionIndex];

  const [submitStep, { isLoading: isSubmitting }] = useSubmitStepMutation();

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    setInitialRender(false);
  }, []);

  if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
  if (!question) return <p>Question not found</p>;
  if (!assessmentId) return <p>Assessment not started. Please start first</p>;

  const handleOptionSelect = (opt: number) => setSelectedOption(opt);

  const handleNext = async () => {
    if (selectedOption === null) {
      toast.error('Please select an answer!');
      return;
    }

    try {
      const body: SubmitStepRequest = {
        assessmentId,
        StepNumber: questionNumber,
        AssetId: question.CategoryId,
        CategoryId: question.CategoryId,
        QuestionId: question._id,
        AnswerValue: selectedOption,
      };

      const res = await submitStep(body).unwrap();
      const lastAnswer = res?.data?.stepAnswers?.[res.data.stepAnswers.length - 1];

      if (!lastAnswer) {
        console.log('Failed to save answer.');
        return;
      }

      if (lastAnswer.AnswerValue > 0) {
        if (currentQuestionIndex < questions.length - 1) {
          router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
        } else {
          toast.success('You have completed all questions!');
          router.push(`/dynamicApps/${appName}/completed`);
        }
      } else {
        toast.error('Answer was not saved. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
      toast.error('Something went wrong while submitting your answer.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-4 py-4 md:px-6 md:py-6">
      <div className="flex-1 max-w-xl w-full">
        {/* Question Content */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7F0000] mb-4 md:mb-6 capitalize">
          {question.CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
        </h1>

        <p className="text-base md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8">
          {question.Question}
        </p>

        {/* Options */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap mb-8 md:mb-10 justify-center md:justify-start">
          {question.Options.map((opt: number) => (
            <label
              key={opt}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={opt}
                checked={selectedOption === opt}
                onChange={() => handleOptionSelect(opt)}
                className="hidden"
              />
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
                  selectedOption === opt
                    ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
                    : 'bg-white border-gray-300 hover:border-[#7F0000]'
                }`}
              >
                <span className="text-sm">{opt}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Next/Finish Button */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null || isSubmitting}
          className={`w-full py-3 cursor-pointer mb-3 text-lg font-semibold transition-all duration-300 ${
            selectedOption === null || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
          }`}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>

        {/* Stepper Progress Bar */}
        {!initialRender && (
          <div className="w-full mt-4 md:mt-6 ">
            <StepperProgressBar
              totalQuestions={question.totalQuestion ?? 1}
              currentQuestionNo={question.questionNo ?? 1}
            />
          </div>
        )}
      </div>

      {/* Illustration */}
      <div className="flex-1 flex justify-center mt-6 lg:mt-0 w-full">
        <Image
          src={question.CategoryImage || '/inclusion/qusetionsScreenBg.png'}
          alt="Question Illustration"
          width={330}
          height={330}
          className="w-64 sm:w-72 md:w-80 lg:w-[330px] h-auto"
        />
      </div>
    </div>
  );
}
