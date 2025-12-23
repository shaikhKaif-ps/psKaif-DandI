// 'use client';
// import { RootState } from '@/redux/store';

// import { useEffect, useMemo, useRef } from 'react';

// import { useSelector } from 'react-redux';
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
//   ChartConfiguration,
//   ChartItem,
// } from 'chart.js';
// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

// import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';

// export default function ResultPage() {
//   // const resultData = useSelector((state: RootState) => state.global.resultData);
//   const resultData = useSelector(
//     (state: RootState) => state.global.resultData,
//   ) as ResultData | null;

//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);
//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };
//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const resultsData = useMemo(() => {
//     if (!resultData?.CategoryScores) return [];
//     return resultData.CategoryScores.map((item: CategoryScore) => ({
//       category: item.CategoryName.replace(/-/g, ' '), // clean name
//       value: Math.round(item.Percentage), // actual percentage
//     }));
//   }, [resultData]);
//   useEffect(() => {
//     if (!chartRef.current || resultsData.length === 0) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }
//     const data = {
//       labels: resultsData.map((item) => item.category),
//       datasets: [
//         {
//           label: 'DEI Category Scores (%)',
//           data: resultsData.map((item) => item.value),
//           fill: true,
//           backgroundColor: 'rgba(59,130,246,0.25)',
//           borderColor: 'rgba(59,130,246,1)',
//           pointBackgroundColor: 'rgba(59,130,246,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(59,130,246,1)',
//           borderWidth: 2,
//         },
//       ],
//     };
//     const config: ChartConfiguration<'radar'> = {
//       type: 'radar',
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: { duration: 1200, easing: 'easeInOutQuart' },
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             enabled: true,
//             backgroundColor: '#1F2937',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: {
//               label: (context) => `${context.label}: ${context.raw}%`,
//             },
//           },
//         },
//         scales: {
//           r: {
//             min: 0,
//             max: 100,
//             ticks: {
//               stepSize: 20, // tick sequence 10,20,30,... visually spaced
//               color: '#9CA3AF',
//               font: { size: 10, family: 'Inter, sans-serif' },
//               padding: 1,
//             },
//             grid: { circular: false, color: '#E5E7EB' },
//             angleLines: { color: '#E5E7EB' },
//             pointLabels: {
//               color: '#6B7280',
//               font: { size: 10, family: 'Inter, sans-serif', weight: 600 },
//               callback: function (label: string) {
//                 const maxChars = 19;
//                 if (label.length > maxChars) {
//                   const words = label.split(' ');
//                   const lines: string[] = [];
//                   let currentLine = '';
//                   words.forEach((word) => {
//                     if ((currentLine + ' ' + word).trim().length > maxChars) {
//                       lines.push(currentLine);
//                       currentLine = word;
//                     } else {
//                       currentLine = (currentLine + ' ' + word).trim();
//                     }
//                   });
//                   lines.push(currentLine);
//                   return lines;
//                 } else {
//                   return label;
//                 }
//               },
//             },
//           },
//         },
//         elements: {
//           line: { borderWidth: 2 },
//           point: { radius: 6, hoverRadius: 6 },
//         },
//       },
//     };
//     chartInstanceRef.current = new Chart(ctx as ChartItem, config);
//     return () => {
//       chartInstanceRef.current?.destroy();
//     };
//   }, [resultsData]);
//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);
//   const getAverageLabel = (percentage: number) => {
//     if (percentage >= 80) return 'Good';
//     if (percentage >= 60) return 'Average';
//     return 'Below Average';
//   };
//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* Left Column */}
//         <div className="space-y-6 flex flex-col">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>
//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>
//             <button className="bg-red-950 text-white py-2 mt-4 px-3 rounded-xl text-lg cursor-pointer">
//               view advice as per your score
//             </button>
//           </div>
//           {/* Chart.js Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="w-full aspect-square max-w-full flex-1">
//               <canvas ref={chartRef} className="w-full h-full" />
//             </div>
//           </div>
//         </div>
//         {/* Right Column */}
//         <div className="space-y-6 flex flex-col">
//           {/* Category Scores */}
//           <div className="category-scores-box bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div
//               className="category-scores-content overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5"
//               style={{ maxHeight: '100vh' }}
//             >
//               {resultData?.CategoryScores?.map((item: CategoryScore, index: number) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                     {item.CategoryName.replace(/-/g, ' ')}
//                   </span>
//                   <div className="w-full mb-1">
//                     <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                       <div
//                         className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                         style={{ width: `${item.Percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                       {Math.round(item.Percentage)}%
//                     </span>
//                     <span className="text-base text-gray-500">
//                       {getAverageLabel(item.Percentage)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// =====================
// =====================
// =====================
// 'use client';

// import { RootState } from '@/redux/store';
// import { useEffect, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';
// import { getScoreInfo } from '@/utils/colors';

// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

// export default function ResultPage() {
//   const resultData = useSelector(
//     (state: RootState) => state.global.resultData,
//   ) as ResultData | null;

//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   const resultsData = useMemo(() => {
//     if (!resultData?.CategoryScores) return [];
//     return resultData.CategoryScores.map((item: CategoryScore) => ({
//       category: item.CategoryName.replace(/-/g, ' '),
//       value: Math.round(item.Percentage),
//     }));
//   }, [resultData]);

//   // ---------- Radar Chart ----------
//   useEffect(() => {
//     if (!chartRef.current || resultsData.length === 0) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     if (chartInstanceRef.current) chartInstanceRef.current.destroy();

//     const data = {
//       labels: resultsData.map((i) => i.category),
//       datasets: [
//         {
//           label: 'DEI Category Scores (%)',
//           data: resultsData.map((i) => i.value),
//           fill: true,
//           backgroundColor: 'rgba(59,130,246,0.25)',
//           borderColor: 'rgba(59,130,246,1)',
//           pointBackgroundColor: 'rgba(59,130,246,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(59,130,246,1)',
//           borderWidth: 2,
//         },
//       ],
//     };

//     const config: any = {
//       type: 'radar',
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: { duration: 1200, easing: 'easeInOutQuart' },
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             backgroundColor: '#1F2937',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: { label: (c: any) => `${c.label}: ${c.raw}%` },
//           },
//         },
//         scales: {
//           r: {
//             min: 0,
//             max: 100,
//             ticks: { stepSize: 20, color: '#9CA3AF', font: { size: 10 } },
//             grid: { color: '#E5E7EB' },
//             angleLines: { color: '#E5E7EB' },
//             pointLabels: {
//               color: '#6B7280',
//               font: { size: 10, weight: 600 },
//               callback: (label: string) => {
//                 const max = 19;
//                 if (label.length <= max) return label;
//                 const words = label.split(' ');
//                 const lines: string[] = [];
//                 let line = '';
//                 words.forEach((w) => {
//                   const test = line ? `${line} ${w}` : w;
//                   if (test.length > max) {
//                     lines.push(line);
//                     line = w;
//                   } else line = test;
//                 });
//                 lines.push(line);
//                 return lines;
//               },
//             },
//           },
//         },
//         elements: { line: { borderWidth: 2 }, point: { radius: 6, hoverRadius: 6 } },
//       },
//     };

//     chartInstanceRef.current = new Chart(ctx, config);

//     return () => chartInstanceRef.current?.destroy();
//   }, [resultsData]);

//   // ---------- Overall score ----------
//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((s, i) => s + i.value, 0) / resultsData.length);

//   const getAverageLabel = (p: number) => (p >= 80 ? 'Good' : p >= 60 ? 'Average' : 'Below Average');

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* LEFT */}
//         <div className="space-y-6 flex flex-col">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>
//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getScoreInfo(overallScore).bg} transition-all`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>
//             <button className="bg-red-950 text-white py-2 mt-4 px-3 rounded-xl text-lg cursor-pointer">
//               view advice as per your score
//             </button>
//           </div>

//           {/* Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="w-full aspect-square max-w-full flex-1">
//               <canvas ref={chartRef} className="w-full h-full" />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6 flex flex-col">
//           {/* Category Scores */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div
//               className="overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5"
//               style={{ maxHeight: '100vh' }}
//             >
//               {resultData.CategoryScores?.map((item: CategoryScore, idx: number) => {
//                 const { level, bg } = getScoreInfo(item.Percentage);
//                 const textColor = getPercentageTextColor(level);

//                 return (
//                   <div
//                     key={idx}
//                     className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                   >
//                     <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                       {item.CategoryName.replace(/-/g, ' ')}
//                     </span>

//                     <div className="w-full mb-1">
//                       <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                         <div
//                           className={`h-2 ${bg} transition-all duration-500`}
//                           style={{ width: `${item.Percentage}%` }}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center mt-2">
//                       <span className={`text-base font-bold ${textColor}`}>
//                         {Math.round(item.Percentage)}%
//                       </span>
//                       <span className="text-base text-gray-500">
//                         {getAverageLabel(item.Percentage)}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// ================
// ================
// ================
// 'use client';

// import { RootState } from '@/redux/store';
// import { useEffect, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux'; // Fixed
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';
// import { getScoreInfo } from '@/utils/colors';
// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

// export default function ResultPage() {
//   const resultData = useSelector(
//     (state: RootState) => state.global.resultData,
//   ) as ResultData | null;

//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   const resultsData = useMemo(() => {
//     if (!resultData?.CategoryScores) return [];
//     return resultData.CategoryScores.map((item: CategoryScore) => ({
//       category: item.CategoryName.replace(/-/g, ' '),
//       value: Math.round(item.Percentage),
//     }));
//   }, [resultData]);

//   // ---------- Radar Chart ----------
//   useEffect(() => {
//     if (!chartRef.current || resultsData.length === 0) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     if (chartInstanceRef.current) chartInstanceRef.current.destroy();

//     const data = {
//       labels: resultsData.map((i) => i.category),
//       datasets: [
//         {
//           label: 'DEI Category Scores (%)',
//           data: resultsData.map((i) => i.value),
//           fill: true,
//           backgroundColor: 'rgba(59,130,246,0.25)',
//           borderColor: 'rgba(59,130,246,1)',
//           pointBackgroundColor: 'rgba(59,130,246,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(59,130,246,1)',
//           borderWidth: 2,
//         },
//       ],
//     };

//     const config: any = {
//       type: 'radar',
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: { duration: 1200, easing: 'easeInOutQuart' },
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             backgroundColor: '#1F2937',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: { label: (c: any) => `${c.label}: ${c.raw}%` },
//           },
//         },
//         scales: {
//           r: {
//             min: 0,
//             max: 100,
//             ticks: { stepSize: 20, color: '#9CA3AF', font: { size: 10 } },
//             grid: { color: '#E5E7EB' },
//             angleLines: { color: '#E5E7EB' },
//             pointLabels: {
//               color: '#6B7280',
//               font: { size: 10, weight: 600 },
//               callback: (label: string) => {
//                 const max = 19;
//                 if (label.length <= max) return label;
//                 const words = label.split(' ');
//                 const lines: string[] = [];
//                 let line = '';
//                 words.forEach((w) => {
//                   const test = line ? `${line} ${w}` : w;
//                   if (test.length > max) {
//                     lines.push(line);
//                     line = w;
//                   } else line = test;
//                 });
//                 lines.push(line);
//                 return lines;
//               },
//             },
//           },
//         },
//         elements: { line: { borderWidth: 2 }, point: { radius: 6, hoverRadius: 6 } },
//       },
//     };

//     chartInstanceRef.current = new Chart(ctx, config);

//     return () => chartInstanceRef.current?.destroy();
//   }, [resultsData]);

//   // ---------- Overall score ----------
//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((s, i) => s + i.value, 0) / resultsData.length);

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="Typingbg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* LEFT */}
//         <div className="space-y-6 flex flex-col">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>
//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getScoreInfo(overallScore).bg} transition-all`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>
//             <div className="mt-3 text-sm font-medium">{getScoreInfo(overallScore).message}</div>
//             <button className="bg-red-950 text-white py-2 mt-4 px-3 rounded-xl text-lg cursor-pointer">
//               View Advice
//             </button>
//           </div>

//           {/* Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="w-full aspect-square max-w-full flex-1">
//               <canvas ref={chartRef} className="w-full h-full" />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6 flex flex-col">
//           {/* Category Scores */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div
//               className="overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5"
//               style={{ maxHeight: '100vh' }}
//             >
//               {resultData.CategoryScores?.map((item: CategoryScore, idx: number) => {
//                 const { bg, text, message } = getScoreInfo(item.Percentage);

//                 return (
//                   <div
//                     key={idx}
//                     className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                   >
//                     <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                       {item.CategoryName.replace(/-/g, ' ')}
//                     </span>

//                     {/* Progress Bar */}
//                     <div className="w-full mb-1">
//                       <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                         <div
//                           className={`h-2 ${bg} transition-all duration-500`}
//                           style={{ width: `${item.Percentage}%` }}
//                         />
//                       </div>
//                     </div>

//                     {/* Score + Message */}
//                     <div className="flex justify-between items-center mt-2">
//                       <span className={`text-base font-bold ${text}`}>
//                         {Math.round(item.Percentage)}%
//                       </span>
//                       <span className="text-sm text-gray-700 font-medium text-right max-w-[60%]">
//                         {message}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// ============
// ============
// ============
// 'use client';
// import { RootState } from '@/redux/store';
// import { useEffect, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
//   ChartConfiguration,
//   ChartItem,
// } from 'chart.js';

// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

// import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';

// export default function ResultPage() {
//   const resultData = useSelector(
//     (state: RootState) => state.global.resultData,
//   ) as ResultData | null;

//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   // === NEW RATING LOGIC ===
//   const getRatingLevel = (percentage: number): 'high' | 'medium' | 'low' => {
//     if (percentage >= 75) return 'high';
//     if (percentage >= 51) return 'medium';
//     return 'low';
//   };

//   const getRatingLabel = (percentage: number): string => {
//     if (percentage >= 75) return 'High';
//     if (percentage >= 51) return 'Medium';
//     return 'Low';
//   };

//   const getScoreColor = (percentage: number): string => {
//     const level = getRatingLevel(percentage);
//     switch (level) {
//       case 'high':
//         return 'text-green-600';
//       case 'medium':
//         return 'text-yellow-600';
//       case 'low':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const getProgressColor = (percentage: number): string => {
//     const level = getRatingLevel(percentage);
//     switch (level) {
//       case 'high':
//         return 'bg-green-500';
//       case 'medium':
//         return 'bg-yellow-500';
//       case 'low':
//         return 'bg-red-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const getBadgeStyle = (level: 'high' | 'medium' | 'low') => {
//     switch (level) {
//       case 'high':
//         return { bg: 'bg-green-100', text: 'text-green-800' };
//       case 'medium':
//         return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
//       case 'low':
//         return { bg: 'bg-red-100', text: 'text-red-800' };
//       default:
//         return { bg: 'bg-gray-100', text: 'text-gray-800' };
//     }
//   };

//   // === Transform Data ===
//   const resultsData = useMemo(() => {
//     if (!resultData?.CategoryScores) return [];
//     return resultData.CategoryScores.map((item: CategoryScore) => ({
//       // category: item.CategoryName.replace(/-/g, ' '),
//       // value: Math.round(item.Percentage),
//       // level: getRatingLevel(item.Percentage),

//       category: item.CategoryName.replace(/-/g, ' '),
//       value: item.Percentage,
//       level: getRatingLevel(item.Percentage), // uses 75+, 51–74, 0–50
//     }));
//   }, [resultData]);

//   // === Radar Chart ===
//   useEffect(() => {
//     if (!chartRef.current || resultsData.length === 0) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     const data = {
//       labels: resultsData.map((item) => item.category),
//       datasets: [
//         {
//           label: 'DEI Category Scores (%)',
//           data: resultsData.map((item) => item.value),
//           fill: true,
//           backgroundColor: 'rgba(59,130,246,0.25)',
//           borderColor: 'rgba(59,130,246,1)',
//           pointBackgroundColor: 'rgba(59,130,246,1)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgba(59,130,246,1)',
//           borderWidth: 2,
//         },
//       ],
//     };

//     const config: ChartConfiguration<'radar'> = {
//       type: 'radar',
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: { duration: 1200, easing: 'easeInOutQuart' },
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             enabled: true,
//             backgroundColor: '#1F2937',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: {
//               label: (context) => `${context.label}: ${context.raw}%`,
//             },
//           },
//         },
//         scales: {
//           r: {
//             min: 0,
//             max: 100,
//             ticks: {
//               stepSize: 20,
//               color: '#9CA3AF',
//               font: { size: 10, family: 'Inter, sans-serif' },
//               padding: 1,
//             },
//             grid: { color: '#E5E7EB' },
//             angleLines: { color: '#E5E7EB' },
//             pointLabels: {
//               color: '#6B7280',
//               font: { size: 10, family: 'Inter, sans-serif', weight: 600 },
//               callback: function (label: string) {
//                 const maxChars = 19;
//                 if (label.length > maxChars) {
//                   const words = label.split(' ');
//                   const lines: string[] = [];
//                   let currentLine = '';
//                   words.forEach((word) => {
//                     if ((currentLine + ' ' + word).trim().length > maxChars) {
//                       lines.push(currentLine);
//                       currentLine = word;
//                     } else {
//                       currentLine = (currentLine + ' ' + word).trim();
//                     }
//                   });
//                   lines.push(currentLine);
//                   return lines;
//                 } else {
//                   return label;
//                 }
//               },
//             },
//           },
//         },
//         elements: {
//           line: { borderWidth: 2 },
//           point: { radius: 6, hoverRadius: 6 },
//         },
//       },
//     };

//     chartInstanceRef.current = new Chart(ctx as ChartItem, config);

//     return () => {
//       chartInstanceRef.current?.destroy();
//     };
//   }, [resultsData]);

//   // === Overall Score ===
//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length || 0);

//   const overallLevel = getRatingLevel(overallScore);
//   const overallLabel = getRatingLabel(overallScore);
//   const { bg: overallBg, text: overallText } = getBadgeStyle(overallLevel);

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* Left Column */}
//         <div className="space-y-6 flex flex-col">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>

//             {/* Rating Badge */}
//             <div
//               className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${overallBg} ${overallText}`}
//             >
//               {overallLabel}
//             </div>

//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all duration-700`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>

//             {/* <button className="bg-red-950 cursor-pointer hover:bg-red-900 text-white py-2 mt-4 px-6 rounded-xl text-lg font-medium transition-colors">
//               View Advice as per your Score
//             </button> */}
//           </div>

//           {/* Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="w-full aspect-square max-w-full flex-1">
//               <canvas ref={chartRef} className="w-full h-full" />
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Category Scores */}
//         <div className="space-y-6 flex flex-col">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div className="overflow-y-auto grid gap-5 pr-2" style={{ maxHeight: '100vh' }}>
//               {resultData.CategoryScores.map((item: CategoryScore, index: number) => {
//                 const percentage = Math.round(item.Percentage);
//                 const level = getRatingLevel(percentage);
//                 const label = getRatingLabel(percentage);
//                 const { bg, text } = getBadgeStyle(level);

//                 return (
//                   <div
//                     key={index}
//                     className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
//                   >
//                     <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                       {item.CategoryName.replace(/-/g, ' ')}
//                     </span>

//                     {/* Progress Bar */}
//                     <div className="w-full mb-2">
//                       <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                         <div
//                           className={`h-2 ${getProgressColor(percentage)} transition-all duration-700`}
//                           style={{ width: `${percentage}%` }}
//                         />
//                       </div>
//                     </div>

//                     {/* Score + Badge */}
//                     <div className="flex justify-between items-center mt-2">
//                       <span className={`text-base font-bold ${getScoreColor(percentage)}`}>
//                         {percentage}%
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
//                       >
//                         {label}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// ================ 
// ================  06 -DEc
// ================ 
'use client';
import { RootState } from '@/redux/store';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartItem,
} from 'chart.js';
import QuadrantChart from './QuadrantChart';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';

export default function ResultPage() {
  const resultData = useSelector(
    (state: RootState) => state.global.resultData,
  ) as ResultData | null;

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // === NEW RATING LOGIC ===
  const getRatingLevel = (percentage: number): 'high' | 'medium' | 'low' => {
    if (percentage >= 75) return 'high';
    if (percentage >= 51) return 'medium';
    return 'low';
  };

  const getRatingLabel = (percentage: number): string => {
    if (percentage >= 75) return 'High';
    if (percentage >= 51) return 'Medium';
    return 'Low';
  };

  const getScoreColor = (percentage: number): string => {
    const level = getRatingLevel(percentage);
    switch (level) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressColor = (percentage: number): string => {
    const level = getRatingLevel(percentage);
    switch (level) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getBadgeStyle = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'low':
        return { bg: 'bg-red-100', text: 'text-red-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  // === Transform Data ===
  const resultsData = useMemo(() => {
    if (!resultData?.CategoryScores) return [];
    return resultData.CategoryScores.map((item: CategoryScore) => ({
      // category: item.CategoryName.replace(/-/g, ' '),
      // value: Math.round(item.Percentage),
      // level: getRatingLevel(item.Percentage),

      category: item.CategoryName.replace(/-/g, ' '),
      value: item.Percentage,
      level: getRatingLevel(item.Percentage), // uses 75+, 51–74, 0–50
    }));
  }, [resultData]);

  // === Radar Chart ===
  useEffect(() => {
    if (!chartRef.current || resultsData.length === 0) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = {
      labels: resultsData.map((item) => item.category),
      datasets: [
        {
          label: 'DEI Category Scores (%)',
          data: resultsData.map((item) => item.value),
          fill: true,
          backgroundColor: 'rgba(59,130,246,0.25)',
          borderColor: 'rgba(59,130,246,1)',
          pointBackgroundColor: 'rgba(59,130,246,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59,130,246,1)',
          borderWidth: 2,
        },
      ],
    };

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '#9CA3AF',
              font: { size: 10, family: 'Inter, sans-serif' },
              padding: 1,
            },
            grid: { color: '#E5E7EB' },
            angleLines: { color: '#E5E7EB' },
            pointLabels: {
              color: '#6B7280',
              font: { size: 10, family: 'Inter, sans-serif', weight: 600 },
              callback: function (label: string) {
                const maxChars = 19;
                if (label.length > maxChars) {
                  const words = label.split(' ');
                  const lines: string[] = [];
                  let currentLine = '';
                  words.forEach((word) => {
                    if ((currentLine + ' ' + word).trim().length > maxChars) {
                      lines.push(currentLine);
                      currentLine = word;
                    } else {
                      currentLine = (currentLine + ' ' + word).trim();
                    }
                  });
                  lines.push(currentLine);
                  return lines;
                } else {
                  return label;
                }
              },
            },
          },
        },
        elements: {
          line: { borderWidth: 2 },
          point: { radius: 6, hoverRadius: 6 },
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx as ChartItem, config);

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [resultsData]);

  // === Overall Score ===
  const overallScore = resultData?.Percentage
    ? Math.round(resultData.Percentage)
    : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length || 0);

  const overallLevel = getRatingLevel(overallScore);
  const overallLabel = getRatingLabel(overallScore);
  const { bg: overallBg, text: overallText } = getBadgeStyle(overallLevel);

  if (!resultData) {
    return <div className="text-center text-gray-600 mt-10">No result data available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Assessment Complete
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Here’s how your organization scored across different DEI dimensions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col">
          {/* Overall Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
            <div className="text-lg font-semibold text-gray-800">Overall Score</div>
            <div className="text-sm text-gray-500 mb-4">
              Based on {resultsData.length} assessment categories
            </div>

            {/* Rating Badge */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${overallBg} ${overallText}`}
            >
              {overallLabel}
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all duration-700`}
                style={{ width: `${overallScore}%` }}
              />
            </div>

            {/* <button className="bg-red-950 cursor-pointer hover:bg-red-900 text-white py-2 mt-4 px-6 rounded-xl text-lg font-medium transition-colors">
              View Advice as per your Score
            </button> */}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 pt-6 md:p-6 flex-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-0 text-center">
              {resultData.isChild ? 'SWOT Quadrant' : 'D&I Assessment Radar'}
            </h3>
            <div className="w-full aspect-square max-w-full flex-1">
              {resultData.isChild ? (
                <QuadrantChart categories={resultData.CategoryScores} />
              ) : (
                <canvas ref={chartRef} className="w-full h-full" />
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Category Scores */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
            <div className="overflow-y-auto grid gap-5 pr-2" style={{ maxHeight: '100vh' }}>
              {resultData.CategoryScores.map((item: CategoryScore, index: number) => {
                const percentage = Math.round(item.Percentage);
                const level = getRatingLevel(percentage);
                const label = getRatingLabel(percentage);
                const { bg, text } = getBadgeStyle(level);

                return (
                  <div
                    key={index}
                    className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
                      {item.CategoryName.replace(/-/g, ' ')}
                    </span>

                    {/* Progress Bar */}
                    <div className="w-full mb-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-2 ${getProgressColor(percentage)} transition-all duration-700`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Score + Badge */}
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-base font-bold ${getScoreColor(percentage)}`}>
                        {percentage}%
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
