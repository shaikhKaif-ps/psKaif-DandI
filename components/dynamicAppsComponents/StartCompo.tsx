// // component/dynamicAppsComponents/StartCompo.tsx
'use client';
import Image from 'next/image';
import inclusionImage from '@/public/inclusion/homepage.png';
import { useCreateAssesmentMutation } from '@/redux/slices/assesment/assesmentSlice';
import { useDispatch } from 'react-redux';
import { setAssessmentId } from '@/redux/slices/global/globalSlice';
import { useRouter, useParams } from 'next/navigation';
import { getErrorMessage } from '@/utils/errorHandler';

export default function StartCompo({ assetId }: { assetId: string }) {
  console.log('StartCompo assetId:', assetId);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams(); // get current slug from [app] route
  const currentSlug = params.app;
  console.log(currentSlug, 'currentSlug');

  const [createAssesment, { isLoading }] = useCreateAssesmentMutation();

  const handleStart = async () => {
    try {
      const res = await createAssesment({ AssetId: assetId }).unwrap();
      console.log('Assessment Created:', res);

      if (res?.data?._id) {
        // 🔥 Save the assessmentId in global slice
        dispatch(setAssessmentId(res.data._id));

        // 🔥 Redirect to currentSlug/startnow with child asset ID
        router.push(`/dynamicApps/${currentSlug}/startnow?childAssetId=${assetId}`);
      }
    } catch (err: unknown) {
      console.error('Error creating assessment:', err);

      // Optional: use your getErrorMessage helper
      // import { getErrorMessage } from '@/utils/errorHandler';
      console.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-gray-800 justify-between xl:h-[calc(100vh-4rem)]  items-center min-h-screen">
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
                <h2 className="text-lg font-bold  tertiary-700 leading-7">
                  How inclusive is your organisation in its daily interactions? wert
                </h2>
                <p className="text-sm font-medium tertiary-700 leading-6">
                  Take this short quiz to assess your company’s awareness and understanding of
                  Diversity, Equity, and Inclusion (DEI).
                </p>
              </div>
              <div className="pb-4 md:pb-10">
                <h2 className="text-lg font-bold  tertiary-700 leading-7">
                  How inclusive is your organisation in its daily interactions?
                </h2>
                <p className="text-sm font-medium tertiary-700 leading-6">
                  Take this short quiz to assess your company’s awareness and understanding of
                  Diversity, Equity, and Inclusion (DEI).
                </p>
              </div>
              <div className="pb-4 md:pb-10">
                <h2 className="text-lg font-bold  tertiary-700 leading-7">
                  How inclusive is your organisation in its daily interactions?
                </h2>
                <p className="text-sm font-medium tertiary-700 leading-6">
                  Take this short quiz to assess your company’s awareness and understanding of
                  Diversity, Equity, and Inclusion (DEI).
                </p>
              </div>

              <div className="pb-2 md:pb-10">
                <h2 className="text-lg font-bold  tertiary-700 leading-7">
                  Why Should Your Organisation Take the Quiz?
                </h2>
                <ul className="list-disc pl-6 text-sm text-gray-700 leading-6">
                  <li>Identify potential areas of unconscious bias in workplace practices</li>
                  <li>
                    Discover ways to cultivate a more inclusive and equitable organisational culture
                  </li>
                  <li>Encourage leadership and teams to adopt a more inclusive mindset</li>
                </ul>
              </div>
              <div className="pb-2 md:pb-10">
                <h2 className="text-lg font-bold  tertiary-700 leading-7">
                  Why Should Your Organisation Take the Quiz?
                </h2>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                  <li>Identify potential areas of unconscious bias in workplace practices</li>
                  <li>
                    Discover ways to cultivate a more inclusive and equitable organisational culture
                  </li>
                  <li>Encourage leadership and teams to adopt a more inclusive mindset</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex">
            {/* <button
                            onClick={() => setSelectedChildId(null)}
                            className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                          >
                            ← Back to Modules
                          </button> */}
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="text-center cursor-pointer border border-[#D0D5DD] font-semibold py-2 px-6 rounded-lg-md transition-all duration-400 hover:bg-[#7F0000] hover:text-white w-full"
            >
              {isLoading ? 'Starting...' : 'Get started'}
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden xl:flex justify-center 2xl:max-h-[763px]">
          <Image src={inclusionImage} height={400} width={400} alt="Inclusive team illustration" />
        </div>
      </div>
    </div>
  );
}
