'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import dandIQuestion from '@/components/global/dataOfQuestion';
export default function RespectQuestion() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const params = useParams();
  const router = useRouter();

  // Get question number from URL and convert to number
  const questionNumber = Number(params.question);

  // Find the matching question
  const questionData = dandIQuestion.find((q) => q.question_number === questionNumber);

  // Handle "Next" button click
  const handleNextDemo = () => {
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber <= dandIQuestion.length) {
      router.push(`/inclusion/${nextQuestionNumber}`);
    } else {
      // alert('Survey completed!');
      router.push(`/inclusion/outcome`);
    }
  };

  if (!questionData) {
    return <div className="text-center mt-10 text-red-500">Question not found.</div>;
  }

  return (
    <div className="flex flex-col pl-3">
      {/* Content */}
      <div className="flex flex-col gap-5 md:flex-row flex-1 justify-between items-center">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-5xl font-semibold brand mb-8">
            Question {questionData.question_number}
          </h1>

          <p className="text-xl tertiary-700 pb-10">{questionData.question}</p>

          {/* Radio Options */}
          <div className="flex items-center gap-6 mb-10">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex flex-col items-center mr-5 text-sm cursor-pointer">
                <input
                  type="radio"
                  name={`question-${questionNumber}`}
                  value={num}
                  checked={selectedValue === num}
                  onChange={() => setSelectedValue(num)}
                  className="accent-[#5a0000] w-4 h-4 mb-1.5 cursor-pointer"
                />
                <span className="text-sm font-semibold">{num}</span>
              </label>
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleNextDemo}
            className="cursor-pointer border border-[#D0D5DD] font-semibold py-2 px-6 rounded-lg transition-all duration-400 bg-[#7F0000] text-white hover:bg-[#c24040] w-full"
          >
            Next
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 flex items-center justify-center  ">
          <Image
            src="/inclusion/qusetionsScreenBg.png"
            alt="Respect Illustration"
            width={400}
            height={400}
            className="w-full h-auto max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
