'use client';

import { useState } from 'react';

const departments = [
  'Strategic Leadership / CEO & Board of Directors',
  'Management / Leadership Team',
  'Human Resources (HR)',
  'Sales',
  'Marketing',
  'IT & Technology',
  'Customer Service / Client Support',
  'Finance',
  'Operations / Business Operations',
  'Training & Development',
  'Compliance & Legal Affairs',
  'Product Development / Innovation',
  'Research & Development (R&D)',
  'Supply Chain / Logistics',
  'Communication',
  'Company Cafeteria / Facility Services',
  'Strategic Consultancy',
  'Administration / Back Office',
  'Business Analysis',
  'Public Relations',
  'Health & Safety',
];

const Page = () => {
  const [selected, setSelected] = useState<string>('');
  return (
    <div className="flex flex-col justify-center items-center lg:h-screen w-[90%] mx-auto md:w-full py-5">
      <div className="max-w-[600px] w-full mx-auto">
        <h1 className="primary-900 text-2xl md:text-3xl font-semibold leading-7">
          Choose your department
        </h1>

        <p className="md:pt-11 pt-6 md:text-lg leading-5 tertiary-600">
          Enter your details to move forward
        </p>

        {/* Step Progress */}
        <div className="flex w-full justify-center items-center gap-2 pt-2">
          <div className="flex-1 h-1 rounded-full bg-[#7F0000]" />
          <div className="flex-1 h-1 rounded-full bg-[#7F0000]" />
          <div className="flex-1 h-1 rounded-full bg-[#E4E7EC]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center w-full md:w-[90%] md:mt-12 mt-4 mb-4 md:mb-0 max-w-[944px]">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelected(dept)}
            className={`text-[12px] cursor-pointer transition-all duration-400 hover:bg-[#7F0000] md:text-base px-2 md:px-4 py-2 rounded-lg border  ${
              selected === dept
                ? 'bg-[#7F0000] text-white shadow-md'
                : 'bg-white text-[#344054] border-[#D0D5DD] hover:bg-[#F9FAFB]'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="max-w-[600px] w-full">
        <button
          className={
            ' text-sm md:text-base cursor-pointer border border-[#D0D5DD] font-semibold py-2 md:my-10 px-6 rounded-lg transition-all duration-400 hover:bg-[#7F0000] hover:text-white w-full '
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
