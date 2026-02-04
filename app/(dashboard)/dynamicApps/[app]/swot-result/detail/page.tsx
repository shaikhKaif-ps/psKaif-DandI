// // path : app/(dashboard)/dynamicApps/[app]/swot-result/detail/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useSearchParams } from 'next/navigation';
// import { FaChevronDown, FaChevronUp, FaBars } from 'react-icons/fa';
// import { RootState } from '@/redux/store';
// import { useGetSwotTabularDataQuery } from '@/redux/slices/result/sowtResultSlice';

// export default function SwotPersonnelPage() {
//   const assetId = useSelector((state: RootState) => state.global.assetId);
//   // const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
//   const searchParams = useSearchParams();
//   console.log(searchParams);

//   const quadrantFilter = searchParams.get('quadrant') || 'all';
//   const urlChildAssetId = searchParams.get('childAssetId') || 'all';
//   console.log(urlChildAssetId, '--------- childAssetId --------' );

//   const { data, isLoading } = useGetSwotTabularDataQuery(
//     {
//       assetId: assetId!,
//       childAssetId: urlChildAssetId,
//       quadrantFilter,
//     },
//     {
//       skip: !assetId,
//     },
//   );

//   const tabularData = data?.data?.results || [];
//   const firstResult = tabularData[0];
//   const categories = firstResult?.categories || [];

//   const scoreCards = [
//     {
//       label: 'STRENGTH',
//       value: `${Math.round(
//         categories
//           .filter((c) => c.quadrant === 'strength')
//           .reduce((acc, c) => acc + c.percentage, 0) /
//           Math.max(categories.filter((c) => c.quadrant === 'strength').length, 1),
//       )}%`,
//       color: 'bg-[#95A768]',
//     },
//     {
//       label: 'WEAKNESS',
//       value: `${Math.round(
//         categories
//           .filter((c) => c.quadrant === 'weakness')
//           .reduce((acc, c) => acc + c.percentage, 0) /
//           Math.max(categories.filter((c) => c.quadrant === 'weakness').length, 1),
//       )}%`,
//       color: 'bg-[#DEB441]',
//     },
//     {
//       label: 'OPPORTUNITY',
//       value: `${Math.round(
//         categories
//           .filter((c) => c.quadrant === 'opportunity')
//           .reduce((acc, c) => acc + c.percentage, 0) /
//           Math.max(categories.filter((c) => c.quadrant === 'opportunity').length, 1),
//       )}%`,
//       color: 'bg-[#65B9A6]',
//     },
//     {
//       label: 'THREAT',
//       value: `${Math.round(
//         categories
//           .filter((c) => c.quadrant === 'threat')
//           .reduce((acc, c) => acc + c.percentage, 0) /
//           Math.max(categories.filter((c) => c.quadrant === 'threat').length, 1),
//       )}%`,
//       color: 'bg-[#DE7041]',
//     },
//   ];

//   const opportunityCategories = categories.filter((c) => c.quadrant === 'opportunity');

//   const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
//     opportunityCategories.reduce((acc, cat) => ({ ...acc, [cat.categoryId]: false }), {}),
//   );

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     try {
//       window.dispatchEvent(new CustomEvent('closeSidebar'));
//     } catch (e) {
//       // ignore for server-side or strict environments
//     }
//   }, []);

//   const toggleExpand = (item: string) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [item]: !prev[item],
//     }));
//   };

//   if (isLoading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#FAFBFC] ">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-[#5A0C0C] mb-8">
//         SWOT / <span className="font-normal">{firstResult?.childAssetName || 'Detail'}</span>
//       </h1>

//       {/* Open filters button when sidebar is closed */}
//       {!isSidebarOpen && (
//         <div className="mb-4">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="inline-flex items-center gap-2 px-3 py-2 bg-[#5A0C0C] text-white rounded-md text-sm font-semibold"
//             aria-label="Open filters"
//           >
//             <FaBars />
//             Filters
//           </button>
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* MAIN CONTENT */}
//         <div className="flex-1">
//           {/* SCORE CARDS */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {scoreCards.map((card) => (
//               <div
//                 key={card.label}
//                 className={`${card.color} text-white rounded-lg px-4 py-6 shadow-md hover:shadow-lg transition-shadow`}
//               >
//                 <p className="text-sm  font-medium  uppercase">{card.label}</p>
//                 <p className="text-3xl font-semibold mt-2">{card.value}</p>
//               </div>
//             ))}
//           </div>

//           {/* OPPORTUNITY CATEGORIES */}
//           {opportunityCategories.map((category) => (
//             <div key={category.categoryId}>
//               <h2 className="text-2xl font-bold text-[#65B9A6] mb-5 mt-12 uppercase tracking-wide">
//                 {category.quadrant}
//               </h2>

//               <div className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200 py-6 px-5 mb-4">
//                 <button
//                   onClick={() => toggleExpand(category.categoryId)}
//                   className="w-full flex justify-between items-center gap-4 cursor-pointer"
//                 >
//                   <div className="text-left">
//                     <h3 className="font-medium text-xl">{category.categoryName}</h3>
//                   </div>
//                   <div className="flex items-center gap-6">
//                     <span className="font-semibold text-xl">{category.percentage}%</span>
//                     <div className="text-gray-500">
//                       {expandedItems[category.categoryId] ? (
//                         <FaChevronUp size={16} />
//                       ) : (
//                         <FaChevronDown size={16} />
//                       )}
//                     </div>
//                   </div>
//                 </button>

//                 {expandedItems[category.categoryId] && (
//                   <>
//                     <div className="w-full h-1.5 bg-gray-200 rounded-full my-5">
//                       <div
//                         className="h-2 bg-[#65B9A6] rounded-full"
//                         style={{ width: `${category.percentage}%` }}
//                       />
//                     </div>

//                     <div className="space-y-2 text-[18px] mb-6">
//                       <p>
//                         <strong className="font-semibold text-gray-900">Team:</strong>{' '}
//                         {category.adviceMessage.team}
//                       </p>
//                       <p>
//                         <strong className="font-semibold text-gray-900">TeamLeader:</strong>{' '}
//                         {category.adviceMessage.teamLeader}
//                       </p>
//                       <p>
//                         <strong className="font-semibold text-gray-900">Organization:</strong>{' '}
//                         {category.adviceMessage.organization}
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-3">
//                       <button className="bg-[#5A0C0C] text-white px-5 py-4 rounded-md text-sm font-medium uppercase tracking-wide hover:bg-[#4a0909] transition-colors">
//                         View Related Course
//                       </button>
//                       <button className="border border-gray-300 px-5 py-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                         RE-ATTEMPT
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* SIDEBAR */}
//         <aside className="w-full lg:w-48 bg-white rounded-lg shadow-sm border border-gray-200 h-fit overflow-hidden relative">
//           {categories
//             .map((cat) => cat.categoryName)
//             .filter((name, index, arr) => arr.indexOf(name) === index)
//             .map((item, index) => (
//               <button
//                 key={item}
//                 className={`w-full text-left px-5 py-5 text-sm font-medium transition ${
//                   index === 0
//                     ? 'bg-[#5A0C0C] text-white'
//                     : 'border-b border-gray-200 last:border-none hover:bg-gray-50 text-gray-700'
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//         </aside>
//       </div>
//     </div>
//   );
// =============
// =============
// =============
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { RootState } from '@/redux/store';
// import { useGetSwotTabularDataQuery } from '@/redux/slices/result/sowtResultSlice';

// export default function SwotPersonnelPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const assetId = useSelector((state: RootState) => state.global.assetId);

//   // ✅ URL-DRIVEN STATE
//   const quadrantFilter = searchParams.get('quadrant') || 'all';
//   const urlChildAssetId = searchParams.get('childAssetId') || 'all';

//   const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

//   const { data, isLoading } = useGetSwotTabularDataQuery(
//     {
//       assetId: assetId!,
//       childAssetId: urlChildAssetId, // ✅ COMING FROM URL
//       quadrantFilter,
//     },
//     { skip: !assetId },
//   );

//   const tabularData = data?.data?.results || [];

//   // ✅ SELECTED CHILD ASSET DERIVED FROM URL
//   const selectedChildAsset =
//     urlChildAssetId === 'all'
//       ? tabularData[0]
//       : tabularData.find((item) => item.childAssetId === urlChildAssetId);

//   const categories = selectedChildAsset?.categories || [];

//   // ✅ RESET EXPAND STATE WHEN CHILD ASSET CHANGES
//   useEffect(() => {
//     const initialExpanded = categories.reduce(
//       (acc, cat) => ({ ...acc, [cat.categoryId]: false }),
//       {},
//     );
//     setExpandedItems(initialExpanded);
//   }, [categories]);

//   const toggleExpand = (id: string) => {
//     setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // const scoreCards = ['strength', 'weakness', 'opportunity', 'threat'].map(
//   //   (q) => {
//   //     const items = categories.filter((c) => c.quadrant === q);
//   //     const avg =
//   //       items.reduce((acc, c) => acc + c.percentage, 0) /
//   //       Math.max(items.length, 1);

//   //     return {
//   //       label: q.toUpperCase(),
//   //       value: `${Math.round(avg)}%`,
//   //       color:
//   //         q === 'strength'
//   //           ? 'bg-[#95A768]'
//   //           : q === 'weakness'
//   //           ? 'bg-[#DEB441]'
//   //           : q === 'opportunity'
//   //           ? 'bg-[#65B9A6]'
//   //           : 'bg-[#DE7041]',
//   //     };
//   //   },
//   // );

//   if (isLoading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   const swotCount = selectedChildAsset?.swotCount ?? {
//     s: 0,
//     w: 0,
//     o: 0,
//     t: 0,
//   };

//   // const scoreCards = [
//   //   { key: 's', label: 'Strength', value: swotCount.s, color: 'bg-[#95A768]' },
//   //   { key: 'w', label: 'Weakness', value: swotCount.w, color: 'bg-[#DEB441]' },
//   //   { key: 'o', label: 'Opportunity', value: swotCount.o, color: 'bg-[#65B9A6]' },
//   //   { key: 't', label: 'Threat', value: swotCount.t, color: 'bg-[#DE7041]' },
//   // ];

//   const scoreCards = [
//     {
//       key: 's',
//       label: 'Strength',
//       value: swotCount.s,
//       color: 'bg-[#95A768]',
//     },
//     {
//       key: 'w',
//       label: 'Weakness',
//       value: swotCount.w,
//       color: 'bg-[#DEB441]',
//     },
//     {
//       key: 'o',
//       label: 'Opportunity',
//       value: swotCount.o,
//       color: 'bg-[#65B9A6]',
//     },
//     {
//       key: 't',
//       label: 'Threat',
//       value: swotCount.t,
//       color: 'bg-[#DE7041]',
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-[#FAFBFC]">
//       {/* HEADER */}
//       <h1 className="text-3xl font-bold text-[#5A0C0C] mb-8">
//         SWOT /{' '}
//         <span className="font-normal">
//           {selectedChildAsset?.childAssetName || 'Detail'}
//         </span>
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* MAIN CONTENT */}
//         <div className="flex-1">
//           {/* SCORE CARDS */}
//           {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {scoreCards.map((card) => (
//               <div
//                 key={card.label}
//                 className={`${card.color} text-white rounded-lg px-4 py-6 shadow`}
//               >
//                 <p className="text-sm uppercase">{card.label}</p>
//                 <p className="text-3xl font-semibold mt-2">{card.value}</p>
//               </div>
//             ))}
//           </div> */}
//           {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {scoreCards.map((card) => (
//               <div
//                 key={card.key}
//                 className={`${card.color} text-white rounded-lg px-4 py-6 shadow`}
//               >
//                 <p className="text-sm font-semibold uppercase">{card.label}</p>
//                 <p className="text-3xl font-bold mt-2">{card.value}</p>
//               </div>
//             ))}
//           </div> */}

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {scoreCards.map((card) => (
//               <button
//                 key={card.key}
//                 onClick={() => {
//                   const params = new URLSearchParams(searchParams.toString());
//                   params.set('quadrant', card.key); // ✅ s | w | o | t
//                   router.replace(`?${params.toString()}`);
//                 }}
//                 className={`${card.color} text-white rounded-lg px-4 py-6 shadow text-left hover:opacity-90 transition`}
//               >
//                 <p className="text-sm font-semibold uppercase">{card.label}</p>
//                 <p className="text-3xl font-bold mt-2">{card.value}</p>
//               </button>
//             ))}
//           </div>

//           {/* CATEGORIES */}
//           {categories.length === 0 ? (
//             <p className="text-gray-500">No data available</p>
//           ) : (
//             categories.map((category) => (
//               <div
//                 key={category.categoryId}
//                 className="bg-white rounded-lg border shadow-sm mb-5 p-6"
//               >
//                 <button
//                   className="w-full flex justify-between items-center"
//                   onClick={() => toggleExpand(category.categoryId)}
//                 >
//                   <h3 className="text-xl font-semibold">
//                     {category.categoryName}
//                   </h3>
//                   <div className="flex items-center gap-4">
//                     <span className="font-semibold">
//                       {category.percentage}%
//                     </span>
//                     {expandedItems[category.categoryId] ? (
//                       <FaChevronUp />
//                     ) : (
//                       <FaChevronDown />
//                     )}
//                   </div>
//                 </button>

//                 {expandedItems[category.categoryId] && (
//                   <>
//                     <div className="w-full h-2 bg-gray-200 rounded-full my-4">
//                       <div
//                         className="h-2 bg-[#65B9A6] rounded-full"
//                         style={{ width: `${category.percentage}%` }}
//                       />
//                     </div>

//                     <div className="space-y-2 text-[16px]">
//                       <p>
//                         <strong>Team:</strong> {category.adviceMessage.team}
//                       </p>
//                       <p>
//                         <strong>Team Leader:</strong>{' '}
//                         {category.adviceMessage.teamLeader}
//                       </p>
//                       <p>
//                         <strong>Organization:</strong>{' '}
//                         {category.adviceMessage.organization}
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* SIDEBAR */}
//         <aside className="w-full lg:w-56 bg-white rounded-lg border shadow-sm h-fit">
//           {tabularData.map((item) => (
//             <button
//               key={item.childAssetId}
//               onClick={() => {
//                 const params = new URLSearchParams(searchParams.toString());
//                 params.set('childAssetId', item.childAssetId);
//                 router.replace(`?${params.toString()}`);
//               }}
//               className={`w-full text-left px-5 py-4 text-sm font-medium transition
//                 ${
//                   selectedChildAsset?.childAssetId === item.childAssetId
//                     ? 'bg-[#5A0C0C] text-white'
//                     : 'border-b hover:bg-gray-50 text-gray-700'
//                 }`}
//             >
//               {item.childAssetName}
//             </button>
//           ))}
//         </aside>
//       </div>
//     </div>
//   );
// }
// ======================
// ======================
// ====================== q
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { FaChevronDown, FaChevronUp, FaArrowLeft } from 'react-icons/fa';
import { RootState } from '@/redux/store';
import {
  useGetSwotTabularDataQuery,
  SwotTabularResult,
  SwotQuadrant,
} from '@/redux/slices/result/sowtResultSlice';

export default function SwotPersonnelPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  const assetId = useSelector((state: RootState) => state.global.assetId);

  // ✅ URL-DRIVEN STATE
  const quadrantFilter = (searchParams.get('quadrant') || 'all') as SwotQuadrant | 'all';
  const urlChildAssetId = searchParams.get('childAssetId') || 'all';

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // ✅ API call for SIDEBAR - always fetch ALL childAssets without quadrant filter
  const { data: sidebarData, isLoading: sidebarLoading } = useGetSwotTabularDataQuery(
    {
      assetId: assetId!,
      childAssetId: 'all',
      quadrantFilter: 'all', // 🔑 Always 'all' to get ALL childAssets for sidebar
    },
    { skip: !assetId },
  );

  // ✅ API call for CATEGORIES - use the actual quadrant filter
  const { data: categoriesData, isLoading: categoriesLoading } = useGetSwotTabularDataQuery(
    {
      assetId: assetId!,
      childAssetId: 'all',
      quadrantFilter, // 🔑 Use actual filter for categories
    },
    { skip: !assetId },
  );

  // ✅ Sidebar uses sidebarData (always has ALL childAssets)
  const allChildAssets = sidebarData?.data?.results || [];

  // ✅ Categories use categoriesData (filtered by quadrant)
  const tabularData = categoriesData?.data?.results || [];

  // ✅ Find the selected childAsset for CATEGORIES from filtered data (tabularData)
  const selectedChildAssetForCategories =
    urlChildAssetId === 'all'
      ? tabularData[0] // Default to first if 'all'
      : tabularData.find((item: SwotTabularResult) => item.childAssetId === urlChildAssetId) ||
        null;

  // ✅ Find the selected childAsset for SWOT COUNT & HEADER from unfiltered data (allChildAssets)
  const selectedChildAssetForSidebar =
    urlChildAssetId === 'all'
      ? allChildAssets[0]
      : allChildAssets.find((item: SwotTabularResult) => item.childAssetId === urlChildAssetId) ||
        null;

  const categories = selectedChildAssetForCategories?.categories || [];

  // ✅ RESET EXPAND STATE WHEN CHILD ASSET CHANGES
  useEffect(() => {
    if (categories.length > 0) {
      const initialExpanded = categories.reduce(
        (acc, cat, index) => ({ ...acc, [cat.categoryId]: index === 0 }),
        {} as Record<string, boolean>,
      );
      setExpandedItems(initialExpanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlChildAssetId, quadrantFilter, categoriesLoading]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      // If the clicked item is already expanded, do nothing (keep it open)
      if (prev[id]) return prev;

      // Otherwise, close all others and open the clicked one
      return {
        ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
        [id]: true,
      };
    });
  };

  if (sidebarLoading || categoriesLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ✅ Use swotCount from UNFILTERED data (allChildAssets) so it always shows correct values
  const swotCount = selectedChildAssetForSidebar?.swotCount ?? {
    s: 0,
    w: 0,
    o: 0,
    t: 0,
  };

  const scoreCards = [
    {
      key: 's',
      label: 'Strength',
      value: swotCount.s,
      color: 'bg-[#95A768]',
    },
    {
      key: 'w',
      label: 'Weakness',
      value: swotCount.w,
      color: 'bg-[#DEB441]',
    },
    {
      key: 'o',
      label: 'Opportunity',
      value: swotCount.o,
      color: 'bg-[#65B9A6]',
    },
    {
      key: 't',
      label: 'Threat',
      value: swotCount.t,
      color: 'bg-[#DE7041]',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAFBFC] py-[90px] md:px-6 px-4 ">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#5A0C0C] mb-8 flex items-center gap-3">
        <button
          onClick={() => {
            const backParams = new URLSearchParams();
            if (urlChildAssetId !== 'all') {
              backParams.set('childAssetId', urlChildAssetId);
            }
            router.push(`/dynamicApps/${params.app}/swot-result?${backParams.toString()}`);
          }}
          className="hover:bg-gray-200 p-2 rounded-full transition-colors"
          aria-label="Back to SWOT Result"
        >
          <FaArrowLeft className="text-2xl" />
        </button>
        SWOT /{' '}
        <span className="font-normal">
          {selectedChildAssetForSidebar?.childAssetName ||
            (urlChildAssetId === 'all' ? 'All' : 'Detail')}
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* MAIN CONTENT */}
        <div className="flex-1">
          {/* SCORE CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {scoreCards.map((card) => {
              const isActive = quadrantFilter === card.key;
              return (
                <button
                  key={card.key}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('quadrant', card.key); // ✅ s | w | o | t
                    router.replace(`?${params.toString()}`);
                  }}
                  className={`${card.color} text-white rounded-lg px-4 py-6 shadow text-left transition-all cursor-pointer
                    ${
                      isActive
                        ? 'ring-2 ring-offset-1 ring-[#5A0C0C] scale-105 shadow-[0_14px_24px_0_rgba(123,183,162,0.55)]'
                        : 'hover:opacity-90 hover:scale-[1.02]'
                    }`}
                >
                  <p className="text-lg font-semibold uppercase">{card.label}</p>
                  <p className="text-4xl font-bold mt-2">{card.value}</p>
                </button>
              );
            })}
          </div>

          {/* CATEGORIES */}
          {categories.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            categories.map((category) => (
              // <div
              // onClick={() => toggleExpand(category.categoryId)}
              // key={category.categoryId}
              //   className="rounded-[10px] border border-[#EBEBEB] bg-white shadow-[4px_4px_14px_0_rgba(127,86,217,0.10)] mb-5 px-5 py-6 cursor-pointer"
              // >
              //   <button className="w-full flex justify-between items-center cursor-pointer">
              //     <h3 className="text-xl font-semibold">{category.categoryName}</h3>
              //     <div className="flex items-center gap-4">
              //       <span className="text-xl font-semibold">{category.percentage}%</span>
              //       {expandedItems[category.categoryId] ? <FaChevronUp /> : <FaChevronDown />}
              //     </div>
              //   </button>

              //   <div
              //     className={`grid transition-all duration-300 ease-in-out ${
              //       expandedItems[category.categoryId]
              //         ? 'grid-rows-[1fr] opacity-100 mt-4'
              //         : 'grid-rows-[0fr] opacity-0 mt-0'
              //     }`}
              //   >
              //     <div className="overflow-hidden">
              //       <div className="w-full h-2 bg-gray-200 rounded-full my-4">
              //         <div
              //           className="h-2 bg-[#65B9A6] rounded-full"
              //           style={{ width: `${category.percentage}%` }}
              //         />
              //       </div>

              //       <div className="space-y-2 text-[16px]">
              //         <p>
              //           <strong>Team:</strong> {category.adviceMessage.team}
              //         </p>
              //         <p>
              //           <strong>Team Leader:</strong> {category.adviceMessage.teamLeader}
              //         </p>
              //         <p>
              //           <strong>Organization:</strong> {category.adviceMessage.organization}
              //         </p>
              //       </div>

              //       <div className="flex flex-wrap gap-3 mt-9">
              //         <button className="bg-[#5A0C0C] text-white px-4 py-3.5 rounded-md text-sm font-medium uppercase tracking-wide hover:bg-[#4a0909] transition-colors">
              //           View Related Course
              //         </button>

              //         <button className="border border-gray-300 px-4 py-3.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              //           RE-ATTEMPT
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
              //==== new methods
              <div
                key={category.categoryId}
                onClick={() => toggleExpand(category.categoryId)}
                className="rounded-[10px] border border-[#EBEBEB] bg-white shadow-[4px_4px_14px_0_rgba(127,86,217,0.10)] mb-5 px-5 py-4 cursor-pointer"
              >
                {/* Header */}
                <button className="w-full flex justify-between items-center cursor-pointer">
                  <div>
                    <h3 className="text-xl font-semibold text-left">P1 — PRIORITY</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      From stated importance to governed reality
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold">85%</span>
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                {/* Expand Section */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    expanded ? 'grid-rows-[1fr] opacity-100 mt-0' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Progress */}
                    <div className="w-full h-2 bg-gray-200 rounded-full my-6">
                      <div className="h-2 bg-[#65B9A6] rounded-full w-[85%]" />
                    </div>

                    {/* Strength */}
                    <span className="inline-block mb-4 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      🟢 Strength (Score 4.0–5.0)
                    </span>

                    {/* Content */}
                    <div className="space-y-4 text-[16px]">
                      <p>
                        <strong>Diagnosis:</strong>
                        <br />
                        DEIT consistently guides strategic decisions, even under time pressure,
                        commercial tension, or political resistance.
                      </p>

                      <p>
                        <strong>Governance Meaning:</strong>
                        <br />
                        Priority functions as an active and reliable decision filter.
                      </p>

                      <p>
                        <strong>Typical Leadership Pattern:</strong>
                        <br />
                        Leaders protect direction under pressure and close choices explicitly.
                      </p>

                      <p>
                        <strong>Learning Need:</strong>
                        <br />
                        Sustaining direction during escalation.
                      </p>

                      {/* Interventions */}
                      <div>
                        <strong>Interventions:</strong>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>
                            <strong>Team:</strong> Explicitly name decisions where DEIT was
                            decisive.
                          </li>
                          <li>
                            <strong>Team Leader:</strong> Link DEIT visibly to performance,
                            investment, and people decisions.
                          </li>
                          <li>
                            <strong>Organisation:</strong> Use DEIT as a formal criterion in
                            strategic and executive reviews.
                          </li>
                        </ul>
                      </div>

                      {/* Related Governance Module */}
                      <div>
                        <strong>Related Governance Module:</strong>
                        <p className="text-gray-600 mt-2 text-sm">
                          How priorities become real through attention, allocation, and authority
                        </p>

                        <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
                          {/* Header */}
                          <div className="grid grid-cols-3 bg-gray-100 text-sm font-semibold">
                            <div className="px-3 py-2 border-r border-gray-200">Module No.</div>
                            <div className="px-3 py-2 border-r border-gray-200">Module Title</div>
                            <div className="px-3 py-2">Module Link</div>
                          </div>

                          {/* Row */}
                          <div className="grid grid-cols-3 text-sm hover:bg-gray-50">
                            <div className="px-3 py-2 border-t border-r border-gray-200">
                              Module 1
                            </div>
                            <div className="px-3 py-2 border-t border-r border-gray-200">
                              Priority as Governance
                            </div>
                            <div className="px-3 py-2 border-t border-gray-200">
                              <a
                                href="#"
                                className="text-[#5A0C0C] font-medium underline hover:opacity-80"
                              >
                                View Module
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-9">
                      <button className="bg-[#5A0C0C] text-white px-4 py-3.5 rounded-md text-sm font-medium uppercase tracking-wide hover:bg-[#4a0909] transition-colors">
                        View Governance Module
                      </button>

                      <button className="border border-gray-300 px-4 py-3.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        RE-ATTEMPT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SIDEBAR */}
        {/* <aside className="w-full lg:w-56 bg-white border-[#EAECF0] shadow shrink-0 h-fit">
          {allChildAssets.map((item: SwotTabularResult) => {
            const isSelected = urlChildAssetId === item.childAssetId;
            const isCompleted = item.isCompleted;

            return (
              <button
                key={item.childAssetId}
                onClick={() => {
                  if (!isCompleted) return; // ❌ Don't allow click on incomplete
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('childAssetId', item.childAssetId);
                  router.replace(`?${params.toString()}`);
                }}
                disabled={!isCompleted}
                className={`w-full  text-left px-4 py-5  uppercase text-sm  font-medium transition border-b border-[#EAECF0] last:border-b-0
                  ${
                    isSelected && isCompleted
                      ? 'bg-[#5A0C0C] text-white'
                      : isCompleted
                        ? 'hover:bg-gray-50 text-gray-700 cursor-pointer'
                        : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  }`}
              >
                {item.childAssetName}
                {!isCompleted && (
                  <span className="ml-2 text-xs text-gray-400">(Not completed)</span>
                )}
              </button>
            );
          })}
        </aside> */}
        <aside className="w-full lg:w-56 bg-white border-[#EAECF0] shadow-md shrink-0 h-fit">
          {allChildAssets.map((item: SwotTabularResult) => {
            const isSelected = urlChildAssetId === item.childAssetId;
            const isCompleted = item.isCompleted;

            return (
              <button
                key={item.childAssetId}
                onClick={() => {
                  if (!isCompleted) return;
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('childAssetId', item.childAssetId);
                  router.replace(`?${params.toString()}`);
                }}
                disabled={!isCompleted}
                className={`
                  group w-full text-left px-4 py-5 uppercase text-sm font-medium
                  transition-colors duration-300 border-b border-[#EAECF0] last:border-b-0
                  ${
                    isSelected
                      ? 'bg-[#5A0C0C] text-white'
                      : isCompleted
                        ? 'bg-white text-gray-700 hover:bg-[#5A0C0C] hover:text-white'
                        : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  }
                `}
              >
                {item.childAssetName}
                {!isCompleted && (
                  <span className="ml-2 text-xs text-gray-400">(Not completed)</span>
                )}
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
