import React from 'react';

const AppCard = ({
  title,
  icon,
  bgColor = 'bg-gray-100',
}: {
  title: string;
  icon: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <div className={`flex items-center justify-between p-6 rounded-xl shadow-sm ${bgColor}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
    </div>
  );
};

export default AppCard;
