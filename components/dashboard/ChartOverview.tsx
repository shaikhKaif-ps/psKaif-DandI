// components/dashboard/ChartOverview.tsx
'use client';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const ChartOverview = () => {
  const score = 50; // 50 out of 100
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#6366f1', '#e5e7eb'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-gray-700">{score}%</span>
        </div>
      </div>
      <h4 className="mt-4 text-sm text-gray-500 font-medium">Total Score</h4>
    </div>
  );
};

export default ChartOverview;
