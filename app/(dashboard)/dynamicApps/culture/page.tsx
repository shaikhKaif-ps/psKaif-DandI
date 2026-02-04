// app/(dashboard)/dynamicApps/culture/page.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import inclusionImage from '@/public/inclusion/homepage.png';
import { useStartCultureAssessmentMutation } from '@/redux/slices/culture/cultureSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAssessmentId, setAssetId } from '@/redux/slices/global/globalSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/errorHandler';

export default function CultureStartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const assetId = useSelector((state: RootState) => state.global.assetId);
  const [startAssessment, { isLoading }] = useStartCultureAssessmentMutation();

  const handleStart = async () => {
    if (!assetId) {
      console.error('No assetId selected');
      return;
    }
    try {
      const res = await startAssessment({ AssetId: assetId }).unwrap();
      if (res?.data?.AssessmentId) {
        dispatch(setAssessmentId(res.data.AssessmentId));
        router.push(`/dynamicApps/culture/questions/${res.data.CurrentQuestion || 1}`);
      }
    } catch (err) {
      console.error('Error starting culture assessment:', getErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-gray-800 justify-between xl:h-[calc(100vh-4rem)] items-center min-h-screen">
      <div className="flex justify-between items-center w-full h-full px-6 xl:pl-6 ">
        {/* Left Text Section */}
        <div className="xl:max-w-[667px] max-h-[763px] p-5 bg-white rounded-2xl shadow-sm border border-gray-100 ">
          <div className="md:h-[450px] overflow-y-auto mb-4 scrollable-div">
            <div className="logo w-[60px] h-[100px] mt-3 mb-4 ml-6">
              <Image
                src="/inclusion/withOutWhite.svg"
                alt="DI Logo"
                width={60}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="">
              <div className="pb-4 md:pb-10">
                <h2 className="text-xl font-bold tertiary-700 leading-7">Culture Assessment</h2>
                <p className="text-sm font-medium tertiary-700 leading-6 mt-4">
                  Understand your organizations culture through this interactive ranking assessment.
                  Well explore how you prioritize different values and behaviors in your daily work.
                </p>
              </div>

              <div className="pb-2 md:pb-10">
                <h2 className="text-lg font-bold tertiary-700 leading-7">
                  Why Take the Culture Assessment?
                </h2>
                <ul className="list-disc pl-6 text-sm text-gray-700 leading-6 mt-2">
                  <li>Capture a snapshot of your organizational values</li>
                  <li>Identify gaps between desired and actual culture</li>
                  <li>Benchmark against industry standards for inclusivity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex">
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="text-center cursor-pointer border border-[#D0D5DD] font-semibold py-2 px-6 rounded-lg-md transition-all duration-400 hover:bg-[#7F0000] hover:text-white w-full"
            >
              {isLoading ? 'Starting...' : 'Start Assessment'}
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden xl:flex justify-center 2xl:max-h-[763px]">
          <Image
            src={inclusionImage}
            height={400}
            width={400}
            alt="Culture assessment illustration"
          />
        </div>
      </div>
    </div>
  );
}
