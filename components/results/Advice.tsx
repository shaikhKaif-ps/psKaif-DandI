//path - \components\results\Advice.jsx

// 'use client';
// import React, { useState } from 'react';

// const Advice = () => {
//   const [data, setData] = useState([
//     {
//       category: 'Recognition and appreciation',
//       score: 'low',
//       advice:
//         'Share best practices across teams, embed recognition into performance reviews and onboarding, and track appreciation through pulse surveys.',
//       percentage: '25%',
//     },
//     {
//       category: 'Equal',
//       score: 'good',
//       advice:
//         'Use equality practices in employer branding, conduct regular paygap analyses, and benchmark against sector standards.',
//       percentage: '75%',
//     },
//     {
//       category: 'Respect for diversity',
//       score: 'average',
//       advice:
//         'Leverage diversity for innovation, integrate diversity goals into strategy, and position the organization as a leader in D&I.',
//       percentage: '50%',
//     },
//   ]);

//   const [sortOrder, setSortOrder] = useState('none');

//   const handleSort = (order) => {
//     const newData = [...data];
//     if (order === 'asc') {
//       newData.sort((a, b) => parseInt(a.percentage) - parseInt(b.percentage));
//     } else if (order === 'desc') {
//       newData.sort((a, b) => parseInt(b.percentage) - parseInt(a.percentage));
//     }
//     setData(newData);
//     setSortOrder(order);
//   };

//   return (
//     <div className="min-h-screen  p-6">
//       <h1 className="text-3xl font-bold text-center text-black mb-6">
//         Performance Review Dashboard
//       </h1>

//       <div className="bg-white  shadow-lg ">
//         <div className="flex flex-col gap-4">
//           {/* Header */}
//           <div className="flex items-center bg-[#490000] text-white p-4 rounded-t-lg">
//             <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
//               Category
//             </div>
//             <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
//               Score
//             </div>
//             <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
//               Advice for You
//             </div>
//             <div className="md:text-lg flex-1 text-xs font-bold uppercase tracking-wider flex items-center justify-center">
//               Percentage
//               <button
//                 onClick={() => handleSort('asc')}
//                 className="ml-4 text-xl font-bold cursor-pointer text-white hover:text-gray-200"
//               >
//                 ↑
//               </button>
//               <button
//                 onClick={() => handleSort('desc')}
//                 className="ml-2 text-xl font-bold cursor-pointer text-white hover:text-gray-200"
//               >
//                 ↓
//               </button>
//             </div>
//           </div>

//           {/* Table Rows */}
//           {data.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center p-4 bg-white hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
//             >
//               <div className="flex-1  md:text-lg  text-sm font-medium text-gray-900  ">
//                 {item.category}
//               </div>
//               <div className="flex-1 px-6 text-sm  ">
//                 <span
//                   className={`md:text-[15px] capitalize inline-flex px-5 py-1 rounded-full text-xs font-semibold ${
//                     item.score === 'low'
//                       ? 'bg-red-100 text-red-800'
//                       : item.score === 'good'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                   }`}
//                 >
//                   {item.score}
//                 </span>
//               </div>
//               <div className="flex-1 text-md text-gray-500">{item.advice}</div>
//               <div
//                 className={`font-bold md:text-lg flex-1  text-sm ${
//                   item.score === 'low'
//                     ? 'text-red-800'
//                     : item.score === 'good'
//                       ? ' text-green-800'
//                       : ' text-yellow-800'
//                 }`}
//               >
//                 {item.percentage}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advice;
// =========================
// =========================
// =========================
// components/results/Advice.tsx
// 'use client';
// import React, { useState, useMemo } from 'react';
// import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

// type CategoryAdvice = {
//   CategoryName: string;
//   PercentageLevel: 'high' | 'medium' | 'low';
//   AdviceMessage: string;
//   Percentage: number;
// };

// type AdviceProps = {
//   categories: CategoryAdvice[];
// };

// const Advice: React.FC<AdviceProps> = ({ categories: initialData }) => {
//   const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

//   const sortedData = useMemo(() => {
//     if (sortOrder === 'none') return initialData;

//     const sorted = [...initialData];
//     if (sortOrder === 'asc') {
//       sorted.sort((a, b) => a.Percentage - b.Percentage);
//     } else {
//       sorted.sort((a, b) => b.Percentage - a.Percentage);
//     }
//     return sorted;
//   }, [initialData, sortOrder]);

//   const handleSort = (order: 'asc' | 'desc') => {
//     setSortOrder(sortOrder === order ? 'none' : order);
//   };

//   const getScoreColor = (level: string) => {
//     switch (level) {
//       case 'high':
//         return 'bg-green-100 text-green-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPercentageColor = (level: string) => {
//     switch (level) {
//       case 'high':
//         return 'text-green-800';
//       case 'medium':
//         return 'text-yellow-800';
//       case 'low':
//         return 'text-red-800';
//       default:
//         return 'text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center text-black mb-6">Assessment Advice</h1>

//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-col gap-4">
//           {/* Header */}
//           <div className="flex items-center bg-[#490000] text-white p-4">
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Category
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Score
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Advice for You
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider flex items-center justify-center">
//               Percentage
//               <button
//                 onClick={() => handleSort('asc')}
//                 className="ml-2 text-xl font-bold cursor-pointer hover:text-gray-200"
//               >
//                 <TiArrowSortedUp />
//                 {/* Up */}
//               </button>
//               <button
//                 onClick={() => handleSort('desc')}
//                 className="ml-2 text-xl font-bold cursor-pointer hover:text-gray-200"
//               >
//                 <TiArrowSortedDown />
//                 {/* Down */}
//               </button>
//             </div>
//           </div>

//           {/* Rows */}
//           {sortedData.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No advice available for this assessment.
//             </div>
//           ) : (
//             sortedData.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center p-4 bg-white hover:bg-gray-50 transition-colors border-b last:border-b-0"
//               >
//                 <div className="flex-1 text-sm md:text-lg font-medium text-gray-900 capitalize">
//                   {item.CategoryName.replace(/-/g, ' ')}
//                 </div>
//                 <div className="flex-1 ">
//                   <span
//                     className={`inline-flex px-5 py-1 rounded-full text-xs md:text-sm font-semibold capitalize ${getScoreColor(
//                       item.PercentageLevel,
//                     )}`}
//                   >
//                     {item.PercentageLevel}
//                   </span>
//                 </div>
//                 <div className="flex-1 text-sm md:text-md text-gray-600">{item.AdviceMessage}</div>
//                 <div
//                   className={`flex-1 text-sm md:text-lg font-bold text-center ${getPercentageColor(
//                     item.PercentageLevel,
//                   )}`}
//                 >
//                   {Math.round(item.Percentage)}%
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advice;
// ===================
// ===================
// ===================
// 'use client';
// import React, { useState, useMemo } from 'react';
// import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

// // type CategoryAdvice = {
// //   CategoryName: string;
// //   PercentageLevel: 'high' | 'medium' | 'low'; // will be recalculated
// //   AdviceMessage: string;
// //   Percentage: number;
// // };

// // Define the expected shape from backend
// type BackendCategory = {
//   CategoryName: string;
//   Percentage: number;
//   AdviceMessage: string;
//   PercentageLevel?: string; // optional, will be ignored
// };

// type AdviceProps = {
//   categories: BackendCategory[]; // raw data from backend
// };

// const Advice: React.FC<AdviceProps> = ({ categories: rawData }) => {
//   console.log(rawData, '=== Advice Raw Data ===');

//   const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

//   // Helper to determine correct level based on percentage
//   const getCorrectLevel = (percentage: number): 'high' | 'medium' | 'low' => {
//     if (percentage >= 76) return 'high';
//     if (percentage >= 51) return 'medium';
//     return 'low';
//   };

//   // Transform raw data to correct format
//   const categories = useMemo(() => {
//     return rawData.map((item) => ({
//       CategoryName: item.CategoryName,
//       Percentage: item.Percentage,
//       AdviceMessage: item.AdviceMessage,
//       PercentageLevel: getCorrectLevel(item.Percentage), // override backend's wrong value
//     }));
//   }, [rawData]);

//   const sortedData = useMemo(() => {
//     if (sortOrder === 'none') return categories;

//     const sorted = [...categories];
//     if (sortOrder === 'asc') {
//       sorted.sort((a, b) => a.Percentage - b.Percentage);
//     } else {
//       sorted.sort((a, b) => b.Percentage - a.Percentage);
//     }
//     return sorted;
//   }, [categories, sortOrder]);

//   const handleSort = (order: 'asc' | 'desc') => {
//     setSortOrder(sortOrder === order ? 'none' : order);
//   };

//   const getScoreColor = (level: string) => {
//     switch (level) {
//       case 'high':
//         return 'bg-green-100 text-green-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPercentageColor = (level: string) => {
//     switch (level) {
//       case 'high':
//         return 'text-green-800';
//       case 'medium':
//         return 'text-yellow-800';
//       case 'low':
//         return 'text-red-800';
//       default:
//         return 'text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center text-black mb-6">Assessment Advice</h1>

//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-col gap-4">
//           {/* Header */}
//           <div className="flex items-center bg-[#490000] text-white p-4">
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Category
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Score
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
//               Advice for You
//             </div>
//             <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider flex items-center justify-center">
//               Percentage
//               <button
//                 onClick={() => handleSort('asc')}
//                 className="ml-2 text-xl font-bold cursor-pointer hover:text-gray-200"
//               >
//                 <TiArrowSortedUp />
//               </button>
//               <button
//                 onClick={() => handleSort('desc')}
//                 className="ml-2 text-xl font-bold cursor-pointer hover:text-gray-200"
//               >
//                 <TiArrowSortedDown />
//               </button>
//             </div>
//           </div>

//           {/* Rows */}
//           {sortedData.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No advice available for this assessment.
//             </div>
//           ) : (
//             sortedData.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center p-4 bg-white hover:bg-gray-50 transition-colors border-b last:border-b-0"
//               >
//                 <div className="flex-1 text-sm md:text-lg font-medium text-gray-900 capitalize">
//                   {item.CategoryName.replace(/-/g, ' ')}
//                 </div>
//                 <div className="flex-1">
//                   <span
//                     className={`inline-flex px-5 py-1 rounded-full text-xs md:text-sm font-semibold capitalize ${getScoreColor(
//                       item.PercentageLevel,
//                     )}`}
//                   >
//                     {item.PercentageLevel}
//                   </span>
//                 </div>
//                 <div className="flex-1 text-sm md:text-md text-gray-600">{item.AdviceMessage}</div>
//                 <div
//                   className={`flex-1 text-sm md:text-lg font-bold text-center ${getPercentageColor(
//                     item.PercentageLevel,
//                   )}`}
//                 >
//                   {Math.round(item.Percentage)}%
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advice;
// ============
// ============
// ============ 01-Nov
'use client';

import React, { useState, useMemo } from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

type BackendCategory = {
  CategoryId: string;
  CategoryName: string;
  Score: number;
  MaxScore: number;
  Percentage?: number;
  PercentageLevel: string; // Use exactly as sent from backend
  AdviceMessage: string;
  _id: string;
};

type CategoryDisplay = {
  CategoryName: string;
  Percentage: number; // recalculated
  PercentageLevel: string; // from backend (as-is)
  AdviceMessage: string;
};

type AdviceProps = {
  categories: BackendCategory[];
};

const Advice: React.FC<AdviceProps> = ({ categories: rawData }) => {
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  // Transform: recalculate Percentage, keep PercentageLevel as-is
  const categories = useMemo<CategoryDisplay[]>(() => {
    return rawData.map((item) => {
      const score = item.Score || 0;
      const maxScore = item.MaxScore || 100;
      const calculatedPct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
      return {
        Percentage: calculatedPct,
        PercentageLevel: item.PercentageLevel || 'Unknown',
        AdviceMessage: item.AdviceMessage || 'No advice provided.',
        CategoryName: item?.CategoryName || 'Unknown Category',
      };
    });
  }, [rawData]);

  // Sort by recalculated Percentage
  const sortedData = useMemo(() => {
    if (sortOrder === 'none') return categories;

    const copy = [...categories];
    if (sortOrder === 'asc') {
      copy.sort((a, b) => a.Percentage - b.Percentage);
    } else {
      copy.sort((a, b) => b.Percentage - a.Percentage);
    }
    return copy;
  }, [categories, sortOrder]);

  const toggleSort = (order: 'asc' | 'desc') => {
    setSortOrder((prev) => (prev === order ? 'none' : order));
  };

  // UI color helpers (based on backend PercentageLevel)
  const getScoreColor = (level: string) => {
    if (!level) return 'bg-gray-100 text-gray-800';
    const l = level.toLowerCase();
    if (l === 'high') return 'bg-green-100 text-green-800';
    if (l === 'medium') return 'bg-yellow-100 text-yellow-800';
    if (l === 'low') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPercentageColor = (level: string) => {
    if (!level) return 'text-gray-800';
    const l = level.toLowerCase();
    if (l === 'high') return 'text-green-800';
    if (l === 'medium') return 'text-yellow-800';
    if (l === 'low') return 'text-red-800';
    return 'text-gray-800';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">Assessment Advice</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center bg-[#490000] text-white p-4">
            <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
              Category
            </div>
            <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
              Score
            </div>
            <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider">
              Advice for You
            </div>
            <div className="flex-1 text-xs md:text-lg font-bold uppercase tracking-wider flex items-center justify-center">
              Percentage
              <button
                onClick={() => toggleSort('asc')}
                className="ml-2 text-xl cursor-pointer hover:text-gray-200"
                title="Sort ascending"
              >
                <TiArrowSortedUp />
              </button>
              <button
                onClick={() => toggleSort('desc')}
                className="ml-2 text-xl cursor-pointer hover:text-gray-200"
                title="Sort descending"
              >
                <TiArrowSortedDown />
              </button>
            </div>
          </div>

          {/* Rows */}
          {sortedData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No advice available for this assessment.
            </div>
          ) : (
            sortedData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 bg-white hover:bg-gray-50 transition-colors border-b last:border-b-0"
              >
                {/* Category Name */}
                <div className="flex-1 text-sm md:text-lg font-medium text-gray-900 capitalize">
                  {item.CategoryName?.replace(/-/g, ' ') || 'N/A'}
                </div>

                {/* Score Badge (from backend PercentageLevel) */}
                <div className="flex-1">
                  <span
                    className={`inline-flex px-5 py-1 rounded-full text-xs md:text-sm font-semibold capitalize ${getScoreColor(
                      item.PercentageLevel,
                    )}`}
                  >
                    {item.PercentageLevel}
                  </span>
                </div>

                {/* Advice */}
                <div className="flex-1 text-sm md:text-base text-gray-600">
                  {item.AdviceMessage}
                </div>

                {/* Percentage (recalculated) */}
                <div
                  className={`flex-1 text-sm md:text-lg font-bold text-center ${getPercentageColor(
                    item.PercentageLevel,
                  )}`}
                >
                  {item.Percentage}%
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Advice;
