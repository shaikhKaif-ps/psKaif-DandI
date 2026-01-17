import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Preparing your assessment...' }) => {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <div className="relative">
        {/* Decorative background blur for aesthetics */}
        <div className="absolute inset-0 h-24 w-24 -translate-y-4 -translate-x-4 bg-gradient-to-tr from-[#490000] to-red-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>

        {/* Modern Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200/50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#490000] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
           {/* Inner ring for extra detail */}
           <div 
             className="absolute inset-2 rounded-full border-4 border-b-[#490000]/40 border-t-transparent border-r-transparent border-l-transparent"
             style={{ animation: 'spin 1.5s linear infinite reverse' }}
           ></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="mt-6 text-xl font-semibold text-[#490000] animate-pulse">
        {message}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Please wait while we load your data
      </p>
    </div>
  );
};

export default LoadingScreen;
