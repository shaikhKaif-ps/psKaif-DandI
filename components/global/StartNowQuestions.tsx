import React from 'react';
import { FaCheck, FaInfoCircle } from 'react-icons/fa';

type StartNowQuestionsProps = {
  mainHeading: string;
  subHeading: string;
  userGuidePoints: string[];
  userMessage?: string;
  onStart: () => void;
  isLoading?: boolean;
  currentStep?: number;
  isAssessmentComplete?: boolean;
};

const StartNowQuestions: React.FC<StartNowQuestionsProps> = ({
  mainHeading,
  userGuidePoints = [],
  subHeading,
  userMessage,
  onStart,
  isLoading,
  currentStep,
  isAssessmentComplete,
}) => {
  console.log('Current Step:', currentStep);
  console.log('isAssessmentComplete :', isAssessmentComplete);

  // Smart button text
  const buttonLabel = isLoading
    ? 'Loading...'
    : isAssessmentComplete
      ? 'Assessment Complete – View Results'
      : currentStep && currentStep > 1
        ? `Resume from Step ${currentStep}`
        : 'Start Assessment';

  return (
    <div className="max-w-[1068px] mx-auto text-center md:px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-normal text-center">{mainHeading}</h1>

      <ul className="text-left max-w-xl mx-auto py-12 space-y-3">
        {userGuidePoints.map((point, index) => (
          <li key={index} className="flex md:items-center justify-center gap-2 text-center">
            <FaCheck className="text-[#344054] md:mt-1" />
            <span className="text-sm tertiary-700 md:text-xl leading-5 md:leading-9 font-medium">
              {point}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-base md:text-lg font-semibold tertiary-700">{subHeading}</p>

      {userMessage && (
        <div className="bg-yellow-100 my-7 max-w-[790px] mx-auto text-[#C08200] leading-[20px] text-sm font-medium px-4 py-3 rounded flex items-start gap-2">
          <FaInfoCircle className="mt-1" size={33} />
          <span>{userMessage}</span>
        </div>
      )}

      {/* ✅ Start/Resume Button */}
      <button
        onClick={onStart}
        disabled={isLoading}
        className="bg-[#490000] mt-5 cursor-pointer hover:bg-[#4a0000] text-white px-6 md:px-16 py-3 rounded-md shadow-sm text-base font-semibold transition"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default StartNowQuestions;
