'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { ChartOptions } from 'chart.js';

// Register all necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentBarChart = () => {
  const data = {
    labels: ['Human Resources', 'Sales', 'Engineering', 'Marketing', 'Customer Support'],
    datasets: [
      {
        label: 'Diversity',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#fb923c',
      },
      {
        label: 'Inclusion',
        data: [14, 10, 8, 12, 7],
        backgroundColor: '#22c55e',
      },
      { label: 'SWOT', data: [20, 18, 15, 10, 11], backgroundColor: '#06b6d4' },
      {
        label: 'Equity',
        data: [14, 20, 12, 9, 13],
        backgroundColor: '#6366f1',
      },
      {
        label: 'Culture',
        data: [16, 16, 18, 11, 9],
        backgroundColor: '#a855f7',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: { font: { size: 12 } },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    // The chart container is responsive and will adapt to its parent's width.
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Department Scores</h3>
      {/* A wrapper with a defined height is crucial for `maintainAspectRatio: false` to work correctly. */}
      <div className="relative h-96 md:h-[450px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DepartmentBarChart;
