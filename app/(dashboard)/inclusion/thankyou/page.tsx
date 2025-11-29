import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center ">
          <div className="max-w-[600px] w-full relative  ">
            <Image
              src="/inclusion/thankyouBanner.svg"
              alt="Thank You"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="pt-3 text-center">
          <h1 className="text-4xl font-medium">Thanks for your responses!</h1>
          <p className="tertiary-700 py-3 leading-6">
            You’ve taken the first step in assessing your organization’s inclusivity effectiveness!
            Click ‘View Result’ to see how your organization is performing and discover actionable
            steps to enhance diversity, equity, and inclusion.
          </p>
          <button className="pt-1">
            <Link href="/inclusion/result" className="text-white bg-[#5a0000] px-10 py-2.5 rounded">
              View Result
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
