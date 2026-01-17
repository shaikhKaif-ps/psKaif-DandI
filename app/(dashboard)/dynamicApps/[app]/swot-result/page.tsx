// // // app/dynamicApps/[app]/swot-result/page.tsx

// 'use client';

// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetSwotCategoriesByChildAssetQuery } from '@/redux/slices/result/sowtResultSlice';

// export default function SwotResultPage() {
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   console.log(assessmentId , "====== assessmentId ======");
//   console.log(childAssetId , "====== childAssetId ======s");
//   console.log(assetId , "====== assetId ======s");

//   // Fetch SWOT specific data using the new API
//   // Using assessmentId as assessmentResultId per common usage in this project
//   const {
//     data: swotData,
//     error: swotError,
//     isLoading: swotLoading,
//   } = useGetSwotCategoriesByChildAssetQuery(
//     {
//       assetId: assetId || '',
//       childAssetId: childAssetId || '',
//     },
//     { skip: !assetId }
//   );

//   console.log(swotData , "====== swotData ======");

//   // useEffect(() => {
//   //   if (swotData) {
//   //     console.log('SWOT Response Data:', swotData);
//   //   }
//   //   if (swotError) {
//   //     console.error('SWOT Error:', swotError);
//   //   }
//   // }, [swotData, swotError]);

//   // if (swotLoading) {
//   //   return (
//   //     <div className="flex flex-col items-center justify-center min-h-screen">
//   //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A0C0C] mb-4"></div>
//   //       <p className="text-gray-600">Loading SWOT analysis...</p>
//   //     </div>
//   //   );
//   // }

//   // if (swotError) {
//   //   return (
//   //     <div className="flex flex-col items-center justify-center min-h-screen">
//   //       <p className="text-red-600 font-semibold mb-2">Error loading SWOT results.</p>
//   //       <p className="text-gray-500 text-sm">Please ensure the assessment is complete and try again.</p>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
//           SWOT Analysis Results
//         </h1>

//       </div>
//     </div>
//   );
// }
// ===========================
// ===========================
// ===========================

// // path app/(dashboard)/dynamicApps/[app]/swot-result/page.tsx
// 'use client';

// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { RootState } from '@/redux/store';
// import { useGetSwotCategoriesByChildAssetQuery, SwotCategory } from '@/redux/slices/result/sowtResultSlice';

// // Helper to define styles for each quadrant
// const QUADRANT_CONFIG = {
//   strength: { title: 'S', bgColor: 'bg-[#E38054]', label: 'STRENGTHS' },
//   weakness: { title: 'W', bgColor: 'bg-[#9B89B6]', label: 'WEAKNESSES' },
//   opportunity: { title: 'O', bgColor: 'bg-[#61B0A1]', label: 'OPPORTUNITIES' },
//   threat: { title: 'T', bgColor: 'bg-[#99A96E]', label: 'THREATS' },
// };

// export default function SwotResultPage() {
//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);

//   // Close sidebar when component mounts
//   useEffect(() => {
//     const event = new CustomEvent('closeSidebar');
//     window.dispatchEvent(event);
//   }, []);

//   const { data: swotResponse, isLoading: swotLoading } = useGetSwotCategoriesByChildAssetQuery(
//     { assetId: assetId || '', childAssetId: childAssetId || '' },
//     { skip: !assetId }
//   );

//   console.log(swotResponse, "swot Response" );

//   const categories = swotResponse?.data?.categories || [];

//   // Grouping categories by their quadrant
//   const groupedData = {
//     strength: categories.filter((c: SwotCategory) => c.quadrant === 'strength'),
//     weakness: categories.filter((c: SwotCategory) => c.quadrant === 'weakness'),
//     opportunity: categories.filter((c: SwotCategory) => c.quadrant === 'opportunity'),
//     threat: categories.filter((c: SwotCategory) => c.quadrant === 'threat'),
//   };

//   if (swotLoading) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="w-full min-h-screen bg-gray-50 ">
//       <div className="">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-[#5A0C0C]">Swot Analysis</h1>
//           <button className="text-gray-600 flex items-center gap-1">Filter <span>▼</span></button>
//         </div>

//         {/* The Grid Container */}
//         <div className="relative grid grid-cols-1 md:grid-cols-2  bg-white rounded-2xl overflow-hidden">

//           {/* Central SWOT Badge */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:grid grid-cols-2  pointer-events-none">
//              {['S','W','O','T'].map((char) => (
//                <div key={char} className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg text-white font-bold text-2xl border border-white/30">
//                  {char}
//                </div>
//              ))}
//           </div>

//           <Quadrant type="strength" items={groupedData.strength} />

//           {/* RIGHT ALIGNED */}
//           <Quadrant type="weakness" items={groupedData.weakness} align="right" />

//           {/* LEFT ALIGNED */}
//           <Quadrant type="opportunity" items={groupedData.opportunity} />

//           {/* RIGHT ALIGNED */}
//           <Quadrant type="threat" items={groupedData.threat} align="right" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Quadrant({ type, items, align }: { type: keyof typeof QUADRANT_CONFIG; items: SwotCategory[]; align?: 'left' | 'right' }) {
//   const config = QUADRANT_CONFIG[type];

//   return (

//     <div className={`${config.bgColor} p-8 max-h-[300px] h-[300px]  no-scrollbar overflow-y-auto transition-all flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
//       <div className={`space-y-6 w-[70%] ${align === 'right' ? 'text-right' : 'text-left'}`}>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <div key={item.id} className="text-white">
//               {/* Header: Name and Percentage */}
//               <div className={`flex justify-between text-sm font-bold mb-1 capitalize tracking-wider ${align === 'right' ? '' : 'flex-row'}`}>
//                 <span>{item.name}</span>
//                 <span>{item.averageScore}/5</span>
//               </div>

//               {/* Progress Bar Container */}
//               <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
//                 {/* Inner Bar: uses flex-row-reverse parent to grow from right if needed */}
//                 <div className={`flex h-full w-full ${align === 'right' ? 'justify-end ' : 'justify-start'} `}>
//                    <div
//                     className="bg-white h-full transition-all duration-1000"
//                     style={{ width: `${(item.averageScore / 5) * 100}%`}}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white/50 italic text-sm">No {type} identified</p>
//         )}
//       </div>
//     </div>
//   );
// }

// ========================= Q ===================
// ========================= Q ===================
// path app/(dashboard)/dynamicApps/[app]/swot-result/page.tsx
// 'use client';

// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { RootState } from '@/redux/store';
// import { useGetSwotCategoriesByChildAssetQuery, SwotCategory } from '@/redux/slices/result/sowtResultSlice';

// // Helper to define styles for each quadrant
// const QUADRANT_CONFIG = {
//   strength: { title: 'S', bgColor: 'bg-[#E38054]', label: 'STRENGTHS' },
//   weakness: { title: 'W', bgColor: 'bg-[#9B89B6]', label: 'WEAKNESSES' },
//   opportunity: { title: 'O', bgColor: 'bg-[#61B0A1]', label: 'OPPORTUNITIES' },
//   threat: { title: 'T', bgColor: 'bg-[#99A96E]', label: 'THREATS' },
// };

// export default function SwotResultPage() {
//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);

//   // Close sidebar when component mounts
//   useEffect(() => {
//     const event = new CustomEvent('closeSidebar');
//     window.dispatchEvent(event);
//   }, []);

//   const { data: swotResponse, isLoading: swotLoading } = useGetSwotCategoriesByChildAssetQuery(
//     { assetId: assetId || '', childAssetId: childAssetId || '' },
//     { skip: !assetId }
//   );

//   console.log(swotResponse, "swot Response" );

//   const categories = swotResponse?.data?.categories || [];

//   // Grouping categories by their quadrant
//   const groupedData = {
//     strength: categories.filter((c: SwotCategory) => c.quadrant === 'strength'),
//     weakness: categories.filter((c: SwotCategory) => c.quadrant === 'weakness'),
//     opportunity: categories.filter((c: SwotCategory) => c.quadrant === 'opportunity'),
//     threat: categories.filter((c: SwotCategory) => c.quadrant === 'threat'),
//   };

//   if (swotLoading) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="w-full min-h-screen bg-gray-50 ">
//       <div className="">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-[#5A0C0C]">Swot Analysis</h1>
//           <button className="text-gray-600 flex items-center gap-1">Filter <span>▼</span></button>
//         </div>

//         {/* The Grid Container */}
//         <div className="relative grid grid-cols-1 md:grid-cols-2  bg-white rounded-2xl overflow-hidden">

//           {/* Central SWOT Badge */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:grid grid-cols-2  pointer-events-none">
//              {['S','W','O','T'].map((char) => (
//                <div key={char} className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-lg text-white font-bold text-2xl border border-white/30">
//                  {char}
//                </div>
//              ))}
//           </div>

//           <Quadrant type="strength" items={groupedData.strength} />

//           {/* RIGHT ALIGNED */}
//           <Quadrant type="weakness" items={groupedData.weakness} align="right" />

//           {/* LEFT ALIGNED */}
//           <Quadrant type="opportunity" items={groupedData.opportunity} />

//           {/* RIGHT ALIGNED */}
//           <Quadrant type="threat" items={groupedData.threat} align="right" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Quadrant({ type, items, align }: { type: keyof typeof QUADRANT_CONFIG; items: SwotCategory[]; align?: 'left' | 'right' }) {
//   const config = QUADRANT_CONFIG[type];

//   return (

//     <div className={`${config.bgColor} p-8 max-h-[300px] h-[300px]  no-scrollbar overflow-y-auto transition-all flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
//       <div className={`space-y-6 w-[70%] ${align === 'right' ? 'text-right' : 'text-left'}`}>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <div key={item.id} className="text-white">
//               {/* Header: Name and Percentage */}
//               <div className={`flex justify-between text-sm font-bold mb-1 capitalize tracking-wider ${align === 'right' ? '' : 'flex-row'}`}>
//                 <span>{item.name}</span>
//                 <span>{item.averageScore}/5</span>
//               </div>

//               {/* Progress Bar Container */}
//               <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
//                 {/* Inner Bar: uses flex-row-reverse parent to grow from right if needed */}
//                 <div className={`flex h-full w-full ${align === 'right' ? 'justify-end ' : 'justify-start'} `}>
//                    <div
//                     className="bg-white h-full transition-all duration-1000"
//                     style={{ width: `${(item.averageScore / 5) * 100}%`}}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white/50 italic text-sm">No {type} identified</p>
//         )}
//       </div>
//     </div>
//   );
// }

// ========================= chat ===================
// ========================= chat ===================
// 'use client';

// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { RootState } from '@/redux/store';
// import {
//   useGetSwotCategoriesByChildAssetQuery,
//   SwotCategory,
// } from '@/redux/slices/result/sowtResultSlice';

// /* ===============================
//    Quadrant UI Configuration
// ================================ */
// const QUADRANT_CONFIG = {
//   strength: { title: 'STRENGTH', bgColor: 'bg-[#9DB07B]' },
//   weakness: { title: 'WEAKNESS', bgColor: 'bg-[#E1B647]' },
//   opportunity: { title: 'OPPORTUNITY', bgColor: 'bg-[#66B6A4]' },
//   threat: { title: 'THREAT', bgColor: 'bg-[#D87445]' },
// };

// const FILTERS = [
//   'ALL',
//   'PERSONNEL',
//   'PRODUCT',
//   'PROMOTION',
//   'PARTICIPATION',
//   'PRIORITY KPIE',
//   'PERCEPTION',
//   'PLACE',
//   'PERFORMANCE',
//   'PROCEDURE',
//   'PRICE',
// ];

// /* ===============================
//    Page Component
// ================================ */
// export default function SwotResultPage() {
//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);

//   useEffect(() => {
//     window.dispatchEvent(new CustomEvent('closeSidebar'));
//   }, []);

//   const { data, isLoading } = useGetSwotCategoriesByChildAssetQuery(
//     { assetId: assetId || '', childAssetId: childAssetId || '' },
//     { skip: !assetId },
//   );

//   const categories = data?.data?.categories || [];

//   const groupedData = {
//     strength: categories.filter((c) => c.quadrant === 'strength'),
//     weakness: categories.filter((c) => c.quadrant === 'weakness'),
//     opportunity: categories.filter((c) => c.quadrant === 'opportunity'),
//     threat: categories.filter((c) => c.quadrant === 'threat'),
//   };

//   if (isLoading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-[#5A0C0C]">SWOT Analysis</h1>
//       </div>

//       {/* Main Content */}
//       <div className="flex gap-6">
//         {/* SWOT CARDS */}
//         <div className="flex flex-wrap flex-1 gap-6">
//           <div className="flex flex-col md:flex-row w-full gap-6">
//             <div className="flex-1">
//               <Quadrant type="strength" items={groupedData.strength} />
//             </div>
//             <div className="flex-1">
//               <Quadrant type="weakness" items={groupedData.weakness} />
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row w-full gap-6">
//             <div className="flex-1">
//               <Quadrant type="opportunity" items={groupedData.opportunity} />
//             </div>
//             <div className="flex-1">
//               <Quadrant type="threat" items={groupedData.threat} />
//             </div>
//           </div>
//         </div>

//         {/* FILTER PANEL */}
//         <div className="w-56 bg-white rounded-xl shadow p-4 shrink-0">
//           {FILTERS.map((filter) => (
//             <button
//               key={filter}
//               className={`block w-full text-left text-sm px-3 py-2 rounded mb-1
//                 ${filter === 'ALL' ? 'bg-[#5A0C0C] text-white' : 'hover:bg-gray-100'}
//               `}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===============================
//    Quadrant Component
// ================================ */
// function Quadrant({ type, items }: { type: keyof typeof QUADRANT_CONFIG; items: SwotCategory[] }) {
//   const config = QUADRANT_CONFIG[type];

//   return (
//     <div className={`${config.bgColor} rounded-xl p-5 h-full`}>
//       <h2 className="text-white font-bold mb-4 uppercase">{config.title}</h2>

//       <div className="flex flex-wrap gap-2">
//         {items.length > 0 ? (
//           items.map((item) => (
//             <span
//               key={item.id}
//               className="bg-white/30 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
//             >
//               <span className="capitalize">{item.name}</span>
//               <span className="font-bold">{Math.round((item.averageScore / 5) * 100)}%</span>
//             </span>
//           ))
//         ) : (
//           <p className="text-white/70 italic text-sm">No {type} identified</p>
//         )}
//       </div>
//     </div>
//   );
// }
// ========================= chat ===================
// path app\(dashboard)\dynamicApps\[app]\swot-result\page.tsx
// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { RootState } from '@/redux/store';
// import {
//   useGetSwotCategoriesByChildAssetQuery,
//   SwotCategory,
// } from '@/redux/slices/result/sowtResultSlice';
// import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';
// import { setCompletedChildren } from '@/redux/slices/global/globalSlice';

// const QUADRANT_CONFIG = {
//   strength: {
//     title: 'STRENGTH',
//     bgColor: 'bg-[#95A768]',
//     borderColor: 'border-[#A6B77B]',
//   },
//   weakness: {
//     title: 'WEAKNESS',
//     bgColor: 'bg-[#DEB441]',
//     borderColor: 'border-[#E4D248]',
//   },
//   opportunity: {
//     title: 'OPPORTUNITY',
//     bgColor: 'bg-[#65B9A6]',
//     borderColor: 'border-[#77CCB8]',
//   },
//   threat: {
//     title: 'THREAT',
//     bgColor: 'bg-[#DE7041]',
//     borderColor: 'border-[#E48448]',
//   },
// };

// // Full list of parent categories to always display in the filter panel
// const PARENT_CATEGORIES = [
//   'ALL',
//   'PERSONNEL',
//   'PRODUCT',
//   'PROMOTION',
//   'PARTICIPATION',
//   'PRIORITY KPIE',
//   'PERCEPTION',
//   'PLACE',
//   'PERFORMANCE',
//   'PROCEDURE',
//   'PRICE',
// ];

// export default function SwotResultPage() {
//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
//   const completedChildren = useSelector((state: RootState) => state.global.completedChildren);
//   const dispatch = useDispatch();

//   // Fetch children data to populate completedChildren if empty
//   const { data: childrenData } = useGetAssetWithChildrenQuery(assetId!, {
//     skip: !assetId,
//   });

//   console.log(assetId, ' ==== assetId ========  ');
//   console.log(childAssetId, ' ==== childAssetId ========  ');

//   useEffect(() => {
//     window.dispatchEvent(new CustomEvent('closeSidebar'));
//   }, []);

//   // Update completedChildren if data is available and completedChildren is empty
//   useEffect(() => {
//     if (childrenData?.data?.Children && completedChildren.length === 0) {
//       const completed = childrenData.data.Children.filter((child: any) => child.isCompleted).map(
//         (child: any) => ({
//           _id: child._id,
//           Name: child.Name,
//           isCompleted: child.isCompleted,
//         }),
//       );
//       dispatch(setCompletedChildren(completed));
//     }
//   }, [childrenData, completedChildren.length, dispatch]);

//   const { data, isLoading } = useGetSwotCategoriesByChildAssetQuery(
//     { assetId: assetId || '', childAssetId: childAssetId || '' },
//     { skip: !assetId },
//   );

//   const categories = data?.data?.categories || [];

//   const groupedData = {
//     strength: categories.filter((c) => c.quadrant === 'strength'),
//     weakness: categories.filter((c) => c.quadrant === 'weakness'),
//     opportunity: categories.filter((c) => c.quadrant === 'opportunity'),
//     threat: categories.filter((c) => c.quadrant === 'threat'),
//   };

//   if (isLoading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50 ">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-[#5A0C0C]">SWOT Analysis</h1>
//       </div>

//       {/* Main Content */}
//       <div className="flex gap-1">
//         {/* SWOT CARDS */}
//         <div className="flex flex-wrap flex-1 gap-[1px]">
//           <Quadrant type="strength" items={groupedData.strength} />
//           <Quadrant type="weakness" items={groupedData.weakness} />
//           <Quadrant type="opportunity" items={groupedData.opportunity} />
//           <Quadrant type="threat" items={groupedData.threat} />
//         </div>

//         {/* FILTER PANEL */}

//         <div className="w-40 bg-white border border-[#EAECF0] rounded-xl shadow shrink-0">
//           {PARENT_CATEGORIES.map((cat) => {
//             const upper = cat.trim().toUpperCase();
//             const exists =
//               upper === 'ALL' ||
//               (completedChildren &&
//                 completedChildren.some(
//                   (child: any) =>
//                     String(child.Name || '')
//                       .trim()
//                       .toUpperCase()
//                       .localeCompare(upper, undefined, { sensitivity: 'base' }) === 0,
//                 ));

//             if (exists) {
//               return (
//                 <button
//                   key={cat}
//                     className="
//                       block
//                       w-full
//                       text-left
//                       text-sm
//                       px-4
//                       py-5
//                       border-b
//                       border-[#EAECF0]
//                       text-gray-700
//                       hover:bg-gray-100
//                   "
//                 >
//                   <div className="flex justify-between items-center gap-1">
//                     <span>
//                     {cat}

//                     </span>

//                   </div>
//                 </button>
//               );
//             }

//             return (
//             <div key={cat} className="border-b border-[#EAECF0]">
//               <button
//                 className="
//                 cursor-pointer
//                   relative
//                   overflow-hidden
//                   w-full
//                   rounded-md
//                   text-sm
//                   h-[54.5px]
//                   group
//                   ml-4
//                   text-left
//                 "
//               >
//                         <span
//                           className="
//                             absolute
//                             inset-0
//                             flex
//                             items-center
//                             transition-transform
//                             duration-300
//                             group-hover:-translate-y-full
//                           "
//                         >
//                           {cat}
//                         </span>

//                         <span
//                           className="
//                             absolute
//                             inset-0
//                             flex
//                             items-center
//                             translate-y-full
//                             transition-transform
//                             duration-300
//                             group-hover:translate-y-0
//                           "
//                         >
//                           START NOW
//                         </span>
//               </button>
//             </div>

//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===============================
//    Quadrant Component
// ================================ */
// function Quadrant({ type, items }: { type: keyof typeof QUADRANT_CONFIG; items: SwotCategory[] }) {
//   const config = QUADRANT_CONFIG[type];
//   const QUADRANT_RADIUS: Record<keyof typeof QUADRANT_CONFIG, string> = {
//     strength: 'rounded-l-xl',
//     opportunity: 'rounded-l-xl',
//     weakness: 'rounded-r-xl',
//     threat: 'rounded-r-xl',
//   };

//   const QUADRANT_HEADING_RADIUS: Record<keyof typeof QUADRANT_CONFIG, string> = {
//     strength: 'rounded-tl-xl',
//     weakness: 'rounded-tr-xl',
//     opportunity: 'rounded-tl-xl',
//     threat: 'rounded-tr-xl',
//   };

//   return (
//     <div
//       className={`
//         ${config.bgColor}
//         ${QUADRANT_RADIUS[type]}
//         w-full
//         h-auto
//         md:w-[49%]
//         md:h-[336px]
//         flex
//         flex-col
//       `}
//     >
//       <h2
//         className={` ${QUADRANT_HEADING_RADIUS[type]} w-full text-white text-2xl py-2 bg-[rgba(0,0,0,0.10)]  font-bold  uppercase text-center`}
//       >
//         {config.title}
//       </h2>

//       {/* Scroll if content overflows */}
//       <div className="flex flex-wrap gap-2 overflow-y-auto px-5 pt-4 pb-5 no-scrollbar justify-between">
//         {items.length > 0 ? (
//           items.map((item) => (
//             <span
//               key={item.id}
//               className={`bg-[rgba(0,0,0,0.10)] text-white text-sm p-[10px] rounded-[10px] flex items-center font-semibold justify-between w-[49%]  gap-2 border  ${config.borderColor}`}
//             >
//               <span className="capitalize">{item.name}</span>
//               {/* <span className="font-bold">{Math.round((item.averageScore / 5) * 100)}%</span> */}
//               <span>{item.averageScore}/5</span>
//             </span>
//           ))
//         ) : (
//           <p className="text-white/70 italic text-sm">No {type} identified</p>
//         )}
//       </div>
//     </div>
//   );
// }
// ===============
// ===============
// ===============
//path app\(dashboard)\dynamicApps\[app]\swot-result\page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { useRouter, useParams } from 'next/navigation';
import { RootState } from '@/redux/store';
import {
  useGetSwotCategoriesByChildAssetQuery,
  SwotCategory,
} from '@/redux/slices/result/sowtResultSlice';
import { useGetAssetWithChildrenQuery, useCreateAssesmentMutation } from '@/redux/slices/assesment/assesmentSlice';
import { setCompletedChildren, setChildAssetId, clearAssessmentId, setAssessmentId } from '@/redux/slices/global/globalSlice';

interface Child {
  _id: string;
  Name: string;
  Description?: string;
  isCompleted?: boolean;
}

interface ChildAsset {
  id: string;
  name: string;
  isCompleted: boolean;
  quadrantDistribution: {
    [key: string]: {
      count: number;
      percentage: number;
    };
  };
}

const QUADRANT_CONFIG = {
  strength: {
    title: 'STRENGTH',
    bgColor: 'bg-[#95A768]',
    borderColor: 'border-[#A6B77B]',
  },
  weakness: {
    title: 'WEAKNESS',
    bgColor: 'bg-[#DEB441]',
    borderColor: 'border-[#E4D248]',
  },
  opportunity: {
    title: 'OPPORTUNITY',
    bgColor: 'bg-[#65B9A6]',
    borderColor: 'border-[#77CCB8]',
  },
  threat: {
    title: 'THREAT',
    bgColor: 'bg-[#DE7041]',
    borderColor: 'border-[#E48448]',
  },
};

const PARENT_CATEGORIES = [
  'ALL',
  'PERSONNEL',
  'PRODUCT',
  'PROMOTION',
  'PARTICIPATION',
  'PRIORITY KPIE',
  'PERCEPTION',
  'PLACE',
  'PERFORMANCE',
  'PROCEDURE',
  'PRICE',
];

export default function SwotResultPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const assetId = useSelector((state: RootState) => state.global.assetId);
  const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
  const completedChildren = useSelector((state: RootState) => state.global.completedChildren);

  const [createAssesment] = useCreateAssesmentMutation();

  const isAllMode = childAssetId === null;

  console.log('Redux state values:', {
    assetId,
    childAssetId,
  });

  const { data: childrenData } = useGetAssetWithChildrenQuery(assetId!, {
    skip: !assetId,
  });

  // Get ALL children (not just completed) for START NOW buttons
  const allChildren = childrenData?.data?.Children || [];

  console.log(childrenData, " ==== childrenData ========  ");
  console.log(allChildren, " ==== allChildren ========  ");

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('closeSidebar'));
  }, []);

  // Populate completed children
  useEffect(() => {
    if (childrenData?.data?.Children) {
      const completed = childrenData.data.Children.filter((child: Child) => child.isCompleted).map(
        (child: Child) => ({
          _id: child._id,
          Name: child.Name,
          isCompleted: child.isCompleted!,
        }),
      );

      dispatch(setCompletedChildren(completed));
    }
  }, [childrenData, dispatch]);

  // 🔥 RTK Query (auto refetch on childAssetId change)
  const { data, isLoading } = useGetSwotCategoriesByChildAssetQuery(
    {
      assetId: assetId!,
      childAssetId, // can be null
    },
    {
      skip: !assetId,
      refetchOnMountOrArgChange: true,
    },
  );

  console.log(data, "======= useGetSwotCategoriesByChildAssetQuery ====");

  // const categories = data?.data?.categories || [];
  const normalizedItems: SwotCategory[] = (() => {
    if (!data?.data) return [];

    // =====================
    // ALL MODE (childAssets)
    // =====================
    if (isAllMode && 'childAssets' in data.data) {
      return (data.data.childAssets as ChildAsset[]).flatMap((child: ChildAsset) => {
        if (!child.quadrantDistribution) return [];

        return (['strength', 'weakness', 'opportunity', 'threat'] as const)
          .filter((q) => child.quadrantDistribution[q]?.count > 0)
          .map((q) => ({
            id: `${child.id}`,
            name: child.name,
            quadrant: q,
            averageScore: child.quadrantDistribution[q].percentage, // % shown
            isCompleted: child.isCompleted,
          }));
      });
    }

    // =====================
    // CHILD MODE (categories)
    // =====================
    if (!isAllMode && 'categories' in data.data) {
      return data.data.categories;
    }

    return [];
  })();


  const groupedData = {
    strength: normalizedItems.filter((c) => c.quadrant === 'strength'),
    weakness: normalizedItems.filter((c) => c.quadrant === 'weakness'),
    opportunity: normalizedItems.filter((c) => c.quadrant === 'opportunity'),
    threat: normalizedItems.filter((c) => c.quadrant === 'threat'),
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#5A0C0C]">SWOT Analysis</h1>
      </div>

      <div className="flex gap-1">
        {/* SWOT CARDS */}
        <div className="flex flex-wrap flex-1 gap-[1px]">
          <Quadrant type="strength" items={groupedData.strength} isAllMode={isAllMode} />
          <Quadrant type="weakness" items={groupedData.weakness} isAllMode={isAllMode} />
          <Quadrant type="opportunity" items={groupedData.opportunity} isAllMode={isAllMode} />
          <Quadrant type="threat" items={groupedData.threat} isAllMode={isAllMode} />
        </div>

        <div className="w-40 bg-white border h-fit border-[#EAECF0] shadow shrink-0">
          {PARENT_CATEGORIES.map((cat) => {
            const upper = cat.trim().toUpperCase();

            const matchedChild = completedChildren.find(
              (child) =>
                String(child.Name || '')
                  .trim()
                  .toUpperCase()
                  .localeCompare(upper, undefined, { sensitivity: 'base' }) === 0,
            );

            const exists = cat === 'ALL' || !!matchedChild;
            const isActive = (cat === 'ALL' && childAssetId === null) || (cat !== 'ALL' && childAssetId === matchedChild?._id);

            if (exists) {
              return (
                <div key={cat} className="border-b border-[#EAECF0] h-[54.5px]">
                  <button
                    onClick={() => {
                      const selectedChildAssetId = cat === 'ALL' ? null : matchedChild!._id;
                      dispatch(setChildAssetId(selectedChildAssetId));
                    }}
                    className={`
                      cursor-pointer relative overflow-hidden w-full  text-sm h-[54.5px] group text-left
                      ${isActive ? 'bg-[#5A0C0C] text-white' : 'text-gray-700'}
                    `}
                  >
                    <span className="h-[54.5px] absolute inset-0 flex items-center transition-transform duration-300 group-hover:-translate-y-full justify-center">
                      {cat}
                    </span>

                    <span
                      className={`
                      h-[54.5px] absolute inset-0 flex items-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white justify-center
                      ${isActive ? 'bg-[#8A1C1C]' : 'bg-[#5A0C0C]'}
                    `}
                    >
                      {cat === 'ALL' ? 'VIEW ALL' : 'VIEW RESULT'} <GoArrowUpRight className="text-2xl ml-1" />
                    </span>
                  </button>
                </div>
              );
            }

            return (
              <div key={cat} className="border-b border-[#EAECF0] h-[54.5px]">
                <button
                  onClick={async () => {
                    const foundChild = allChildren.find(
                      (child: Child) =>
                        String(child.Name || '')
                          .trim()
                          .toUpperCase()
                          .localeCompare(cat.trim().toUpperCase(), undefined, { sensitivity: 'base' }) === 0,
                    );
                    const selectedChildAssetId = foundChild?._id || '';

                    try {
                      const res = await createAssesment({ AssetId: selectedChildAssetId }).unwrap();
                      if (res?.data?._id) {
                        dispatch(setAssessmentId(res.data._id));
                        dispatch(setChildAssetId(selectedChildAssetId));
                        router.push(`/dynamicApps/${params.app}/startnow?childAssetId=${selectedChildAssetId}`);
                      }
                    } catch (err) {
                      console.error('Failed to create assessment:', err);
                    }
                  }}
                  className="cursor-pointer relative overflow-hidden w-full  text-sm h-[54.5px] group text-left text-gray-700"
                >
                  <span className="h-[54.5px] absolute inset-0 flex items-center transition-transform duration-300 group-hover:-translate-y-full justify-center">
                    {cat}
                  </span>

                  <span className="h-[54.5px] absolute inset-0 flex items-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-[#5A0C0C] text-white justify-center">
                    START NOW <GoArrowUpRight className="text-2xl ml-1" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Quadrant Component
================================ */
function Quadrant({
  type,
  items,
  isAllMode,
}: {
  type: keyof typeof QUADRANT_CONFIG;
  items: SwotCategory[];
  isAllMode: boolean;
}) {
  const config = QUADRANT_CONFIG[type];
  const router = useRouter();
  const params = useParams();
  const childAssetId = useSelector((state: RootState) => state.global.childAssetId);

  const QUADRANT_RADIUS = {
    strength: 'rounded-l-xl',
    opportunity: 'rounded-l-xl',
    weakness: 'rounded-r-xl',
    threat: 'rounded-r-xl',
  };

  const QUADRANT_HEADING_RADIUS = {
    strength: 'rounded-tl-xl',
    weakness: 'rounded-tr-xl',
    opportunity: 'rounded-tl-xl',
    threat: 'rounded-tr-xl',
  };

  return (
    <div
      className={`
        ${config.bgColor}
        ${QUADRANT_RADIUS[type]}
        w-full
        h-auto
        md:w-[49%]
        md:h-[336px]
        flex
        flex-col
      `}
    >
      <h2
        className={`${QUADRANT_HEADING_RADIUS[type]} w-full text-white text-2xl py-2 bg-[rgba(0,0,0,0.10)] font-bold uppercase text-center`}
      >
        {config.title}
      </h2>

      <div className="flex  flex-wrap gap-2 overflow-y-auto px-5 pt-4 pb-5 no-scrollbar justify-between">
        {items.length > 0 ? (
          items.filter((item) => item.averageScore > 0).map((item) => (

            // all cat name and % , child cat name and score /5
            <span
              key={item.id}
              onClick={() => {
                if (isAllMode) {
                  const quadrantFilter = type === 'strength' ? 's' : type === 'weakness' ? 'w' : type === 'opportunity' ? 'o' : 't';
                  const urlParams = new URLSearchParams({
                    quadrant: quadrantFilter,
                    childAssetId: item.id,
                  });
                  router.push(`/dynamicApps/${params.app}/swot-result/detail?${urlParams.toString()}`);
                }
              }}
              className={`bg-[rgba(0,0,0,0.10)] ${isAllMode ? 'cursor-pointer group' : 'cursor-default'} text-white text-sm p-[10px] rounded-[10px] ${isAllMode ? 'relative overflow-hidden' : 'flex items-center'} font-semibold justify-between w-[49%] gap-2 border ${config.borderColor}`}
            >
              {isAllMode ? (
                <>
                  {/* Default content - slides up on hover */}
                  <span
                    className="flex items-center justify-between w-full transition-transform duration-300 group-hover:-translate-y-[28px]"
                  >
                    <span className="capitalize">{item.name}</span>
                    {item.averageScore > 0 && <span>{`${Math.round(item.averageScore)}%`}</span>}
                  </span>

                  {/* Hover content - slides in from below */}
                  <span
                    className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 font-semibold"
                  >
                    VIEW MORE <GoArrowUpRight className='text-2xl ml-1' />
                  </span>
                </>
              ) : (
                <>
                  <span className="capitalize">{item.name}</span>
                  <span>{`${item.averageScore}/5`}</span>
                </>
              )}
            </span>
          ))
        ) : (
          <p className="text-white/70 italic text-sm">No {type} identified</p>
        )}
      </div>
    </div>
  );
}
