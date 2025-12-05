// // app/(dashboard)/dynamicApps/[app]/questions/page.tsx
// 'use client';

// import { useState } from 'react';

// import { useSelector } from 'react-redux';
// import { Question, useGetAllQuestionByAssetIdQuery } from '@/redux/slices/questions/questionSlice';
// import { RootState } from '@/redux/store';

// export default function QuestionPage() {
//   // ✅ Get assetId from Redux
//   // const { assetId } = useSelector((state: any) => state.assesmentSession);
//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   // ✅ Fetch questions
//   const { data, isLoading } = useGetAllQuestionByAssetIdQuery(assetId!, {
//     skip: !assetId,
//   });

//   // ✅ Local state to track which question we’re on
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (isLoading) return <p>Loading questions...</p>;
//   if (!data?.status) return <p>No questions found</p>;

//   const questions: Question[] = data.data.flatMap((cat) => cat.Questions);
//   console.log(questions, '================ questions');

//   const currentQuestion = questions[currentIndex];

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">{currentQuestion?.Question}</h2>

//       <ul className="mt-4 space-y-2">
//         {currentQuestion?.Options?.map((opt, idx) => (
//           <li key={idx} className="border p-2 rounded hover:bg-gray-100 cursor-pointer">
//             Option {idx + 1}: {opt}
//           </li>
//         ))}
//       </ul>

//       {/* Navigation buttons */}
//       <div className="mt-6 flex justify-between">
//         {currentIndex > 0 && (
//           <button
//             onClick={() => setCurrentIndex(currentIndex - 1)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Previous
//           </button>
//         )}
//         {currentIndex < questions.length - 1 && (
//           <button
//             onClick={() => setCurrentIndex(currentIndex + 1)}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
import React from 'react';

const page = () => {
  return <div>sdf</div>;
};

export default page;
