'use client';

import clsx from 'clsx';
import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        ' cursor-pointer border border-[#D0D5DD] font-semibold py-2 px-6 rounded-lg-md transition-all duration-400 hover:bg-[#7F0000] hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
