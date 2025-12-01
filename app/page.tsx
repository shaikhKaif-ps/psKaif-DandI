'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import PrimaryButton from '@/components/global/PrimaryButton';
import PrimaryLink from '@/components/global/PrimaryLink';

const page = () => {
  return (
    <div className="max-w-[600px] mx-auto flex items-center justify-center h-screen">
      <div className="md:w-full w-[90%]">
        <div className="w-[248px] h-[100px] relative mx-auto md:mb-10 mb-5">
          <Image src="/DILogo.svg" alt="DI Logo" fill className="object-cover"></Image>
        </div>

        <h1 className="text-center tertiary-600 md:text-lg font-normal leading-5 md:pb-11 pb-7">
          Enter your details to move forward
        </h1>

        <h1 className="text-center md:text-left primary-900 md:text-3xl text-2xl font-semibold leading-9 mb-4">
          Select who you are?
        </h1>

        <div className="flex gap-3 pb-8">
          <PrimaryLink href="/ind-signup" className="w-full text-center">
            Individual
          </PrimaryLink>
          <PrimaryLink href="/org-signup" className="w-full text-center">
            Organization
          </PrimaryLink>
        </div>

        <p className="text-center tertiary-600 text-sm">
          This is to better understand you or your organization
        </p>

        <PrimaryButton className="w-full md:my-12 my-7">Get started</PrimaryButton>

        <div className="text-center text-sm tertiary-600 flex items-center justify-center gap-1">
          <p>Already have an account ?</p>
          <Link href="/ind-login" className="primary-900 font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
