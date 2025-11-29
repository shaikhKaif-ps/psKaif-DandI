import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface PrimaryLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const PrimaryLink: React.FC<PrimaryLinkProps> = ({ children, className, href, ...props }) => {
  return (
    <Link
      href={href || '#'}
      className={clsx(
        'cursor-pointer border border-[#D0D5DD] font-semibold py-2 px-6 rounded-lg-md transition-all duration-400 hover:bg-[#7F0000] hover:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
