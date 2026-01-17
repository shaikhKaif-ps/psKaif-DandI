// // path - app\(dashboard)\dynamicApps\[app]\[childAppscreen]\page.tsx
// // here is render all child app screens under dynamicApps/[app] route

// 'use client';

// import { useParams } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';
// import StartCompo from '@/components/dynamicAppsComponents/StartCompo';

// export default function ChildAppPage() {
//   const params = useParams();
//   const parentSlug = params.app as string;
//     const childSlug = params.child as string;

//     const assetId = useSelector((state: RootState) => state.global.assetId); // parent
//     console.log(assetId, '================= ChildAppPage parent assetId ===================');
//     const childAssetId = useSelector((state: RootState) => state.global.childAssetId);
//     console.log(childAssetId, '================= ChildAppPage child assetId ===================');

//   const { data, isLoading } = useGetAssetWithChildrenQuery(assetId!, {
//     skip: !assetId,
//   });

//     console.log(data,"================= ChildAppPage data ===================");

//   if (isLoading) return <div>Loading module...</div>;
//   if (!data?.data) return <div>Module not found</div>;

//   const childApp = data.data.Children;

//   if (!childApp) return <div>Child app not found</div>;

//   return (
//       <div className="pt-24 ">
//           {
//               childApp && childApp.map((child) => {
//                   return (
//                       <>

//                       <h1 className="text-4xl font-bold mb-4">{child.Name}</h1>
//                           <p className="text-lg text-gray-600 mb-8">{child.Description}</p>
//                           <button>start now</button>
//                       </>

//                   )
//               })
//           }

//     </div>
//   );
// }
// ==================================================================
// ==================================================================
// ==================================================================
// 'use client';

// import { useParams } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';
// import StartCompo from '@/components/dynamicAppsComponents/StartCompo';
// import { useState } from 'react';

// export default function ChildAppPage() {
//   const params = useParams();
//   const parentSlug = params.app as string;
//   const childSlug = params.childAppscreen as string; // ← fixed param name

//   const parentAssetId = useSelector((state: RootState) => state.global.assetId);
//   const childAssetId = useSelector((state: RootState) => state.global.childAssetId);

//   const { data, isLoading, error } = useGetAssetWithChildrenQuery(parentAssetId!, {
//     skip: !parentAssetId,
//   });

//   const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

//   if (isLoading) return <div className="pt-24 text-center">Loading modules...</div>;
//   if (error || !data?.data) return <div className="pt-24 text-red-600">Failed to load modules</div>;

//   const parentAsset = data.data;
//   const children = parentAsset.Children || [];

//   // Find the current child by slug or ID
//   const currentChild = children.find(
//     (c: any) => c._id === childAssetId || c.Name.toLowerCase().replace(/\s+/g, '') === childSlug,
//   );

//   // Optional: show all children or just the current one
//   const childToShow = currentChild || children[0];

//   if (!childToShow) {
//     return <div className="pt-24">Child module not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-5xl font-bold text-gray-900">{childToShow.Name}</h1>
//           <p className="text-xl text-gray-600 mt-4">{childToShow.Description}</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Add-on module under <strong>{parentAsset.Name}</strong>
//           </p>
//         </div>

//         {/* Start Assessment for THIS Child */}
//         {selectedChildId === childToShow._id ? (
//           <div className="mt-10">
//             <StartCompo assetId={childToShow._id} />
//           </div>
//         ) : (
//           <div className="flex flex-col items-start">
//             <button
//               onClick={() => setSelectedChildId(childToShow._id)}
//               className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//             >
//               Start {childToShow.Name} Assessment Now
//             </button>

//             <p className="mt-6 text-gray-600">
//               This assessment will be linked to the <strong>{childToShow.Name}</strong> module.
//             </p>
//           </div>
//         )}

//         {/* Optional: List all child modules */}
//         {children.length > 1 && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Modules</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {children
//                 .filter((c: any) => c._id !== childToShow._id)
//                 .map((child: any) => (
//                   <div key={child._id} className="p-6 bg-white rounded-xl shadow border">
//                     <h3 className="text-xl font-bold text-gray-800">{child.Name}</h3>
//                     <p className="text-gray-600 mt-2">{child.Description}</p>
//                     <button
//                       onClick={() => setSelectedChildId(child._id)}
//                       className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                     >
//                       Start Assessment
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// ==================================================================
// ==================================================================
// ==================================================================
// 'use client';

// import { useParams } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';
// import StartCompo from '@/components/dynamicAppsComponents/StartCompo';
// import { useState } from 'react';

// export default function ChildAppPage() {
//   const params = useParams();
//   const parentSlug = params.app as string;

//   const parentAssetId = useSelector((state: RootState) => state.global.assetId);

//   const { data, isLoading, error } = useGetAssetWithChildrenQuery(parentAssetId!, {
//     skip: !parentAssetId,
//   });

//   const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

//   if (isLoading) return <div className="pt-24 text-center">Loading child modules...</div>;
//   if (error || !data?.data) return <div className="pt-24 text-red-600">Failed to load modules</div>;

//   const parentName = data.data.Name;
//     const children = data.data.Children || [];
//     console.log(children, '================= ChildAppPage children ===================');

//   if (children.length === 0) {
//     return <div className="pt-24 text-center">No child modules found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-6">
//       <div className="max-w-4xl mx-auto">
//         {selectedChildId ? (
//           <div>
//             <button
//               onClick={() => setSelectedChildId(null)}
//               className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
//             >
//               ← Back to Modules
//             </button>
//             <StartCompo assetId={selectedChildId} />
//           </div>
//         ) : (
//           <>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">{parentName} — Add-on Modules</h1>
//             <p className="text-lg text-gray-600 mb-10">Select a module to start your assessment</p>

//             <div className="space-y-6">
//               {children.map((child: any) => (
//                 <div
//                   key={child._id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h2 className="text-2xl font-bold text-gray-800">{child.Name}</h2>
//                       <p className="text-gray-600 mt-2">
//                         {child.Description || 'No description available.'}
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => setSelectedChildId(child._id)}
//                       className="ml-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition whitespace-nowrap"
//                     >
//                       Start Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// ========================
// ========================  dec 03
// ========================
// //path - app\(dashboard)\dynamicApps\[app]\[childAppscreen]\page.tsx
// 'use client';

// // import { useParams } from 'next/navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';

// import { setChildAssetId, setCompletedChildren } from '@/redux/slices/global/globalSlice';
// import StartCompo from '@/components/dynamicAppsComponents/StartCompo';
// import { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';

// interface Child {
//   _id: string;
//   Name: string;
//   Description?: string;
//   isCompleted?: boolean;
// }

// export default function ChildAppPage() {
//   const parentAssetId = useSelector((state: RootState) => state.global.assetId);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { data, isLoading, error } = useGetAssetWithChildrenQuery(parentAssetId!, {
//     skip: !parentAssetId,
//   });

//   const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

//   const parentName = data?.data?.Name;
//   const children = useMemo(() => data?.data?.Children || [], [data?.data?.Children]);

//   useEffect(() => {
//     if (children.length > 0) {
//       const completed = children
//         .filter((child: Child) => child.isCompleted)
//         .map((child: Child) => ({
//           _id: child._id,
//           Name: child.Name,
//           isCompleted: child.isCompleted!,
//         }));
//       dispatch(setCompletedChildren(completed));
//     }
//   }, [children, dispatch]);

//   console.log(selectedChildId, 'selectedChildId');

//   const handleViewResult = (childId: string) => {
//     dispatch(setChildAssetId(childId));
//     router.push(`/dynamicApps/${parentAssetId}/swot-result`);
//   };

//   if (isLoading) return <div className="pt-24 text-center">Loading child modules...</div>;
//   if (error || !data?.data) return <div className="pt-24 text-red-600">Failed to load modules</div>;
//   console.log(children, '================= ChildAppPage children ===================');

//   if (children.length === 0) {
//     return <div className="pt-24 text-center">No child modules found.</div>;
//   }

//   return (
//     <div className=" bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         {selectedChildId ? (
//           <div>
//             <button
//               onClick={() => setSelectedChildId(null)}
//               className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
//             >
//               ← Back to Modules
//             </button>

//             <StartCompo assetId={selectedChildId} />
//           </div>
//         ) : (
//           <>
//             <div className="text-center mb-10">
//               <h1 className="text-5xl font-bold text-gray-900 mb-1">{parentName}</h1>
//               <p className="text-xl text-gray-600">Select a category to begin or resume</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//               {children.map((child: Child, index: number) => (
//                 <div
//                   key={child._id}
//                   className={`bg-white rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow ${
//                     children.length % 3 !== 0 && index === children.length - 1
//                       ? 'lg:col-start-2'
//                       : ''
//                   }`}
//                 >
//                   <div className="py-6 flex flex-col items-center justify-center ">
//                     <h2 className="text-2xl font-bold text-gray-900  ">{child.Name}</h2>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {child.Description || 'Lorem ipsum dolor sit amet, consectetur adipiscing'}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() =>
//                       child.isCompleted
//                         ? handleViewResult(child._id)
//                         : setSelectedChildId(child._id)
//                     }
//                     className="w-full cursor-pointer py-3 bg-[#490000] text-white font-semibold rounded hover:bg-red-800 transition flex items-center justify-center gap-2"
//                   >
//                     {child.isCompleted ? 'View Result' : 'Start'}
//                     <span>→</span>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
//path - app\(dashboard)\dynamicApps\[app]\[childAppscreen]\page.tsx
// path - app/(dashboard)/dynamicApps/[app]/[childAppscreen]/page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetAssetWithChildrenQuery } from '@/redux/slices/assesment/assesmentSlice';
import {
  setChildAssetId,
  setCompletedChildren,
} from '@/redux/slices/global/globalSlice';
import StartCompo from '@/components/dynamicAppsComponents/StartCompo';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';

/* ---------------- TYPES ---------------- */

interface Child {
  _id: string;
  Name: string;
  Description?: string;
  isCompleted?: boolean;
  inProgress?: boolean;
}

/* ---------------- STATUS BADGE ---------------- */

const StatusBadge = ({ child }: { child: Child }) => {
  if (child.isCompleted) {
    return (
      <span className="absolute top-3 right-3 text-xs px-2 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
        <Image src="/completed.svg" alt="Completed" width={20} height={20} />
      </span>
    );
  }

  if (child.inProgress) {
    return (
      <span className="absolute top-3 right-3 text-xs px-2 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
        <Image src="/pending.svg" alt="Pending" width={20} height={20} />
      </span>
    );
  }

  return (
    <span className="absolute top-3 right-3 text-xs px-2 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold">
      <Image src="/startnow.svg" alt="Start Now" width={20} height={20} /> 
    </span>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function ChildAppPage() {
  const parentAssetId = useSelector(
    (state: RootState) => state.global.assetId
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading, error } =
    useGetAssetWithChildrenQuery(parentAssetId!, {
      skip: !parentAssetId,
    });

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const parentName = data?.data?.Name;

  const children: Child[] = useMemo(
    () => data?.data?.Children || [],
    [data?.data?.Children]
  );

  /* ---------------- SAVE COMPLETED MODULES ---------------- */

  useEffect(() => {
    if (children.length > 0) {
      const completed = children
        .filter((child) => child.isCompleted)
        .map((child) => ({
          _id: child._id,
          Name: child.Name,
          isCompleted: child.isCompleted!,
        }));

      dispatch(setCompletedChildren(completed));
    }
  }, [children, dispatch]);

  /* ---------------- HANDLERS ---------------- */

  const handleViewResult = (childId: string) => {
    dispatch(setChildAssetId(childId));
    router.push(`/dynamicApps/${parentAssetId}/swot-result`);
  };

  const getButtonConfig = (child: Child) => {
    if (child.isCompleted) {
      return {
        text: 'View Result',
        className: 'bg-green-600 hover:bg-green-700',
        onClick: () => handleViewResult(child._id),
      };
    }

    if (child.inProgress) {
      return {
        text: 'Continue',
        className: 'bg-yellow-500 hover:bg-yellow-600',
        onClick: () => setSelectedChildId(child._id),
      };
    }

    return {
      text: 'Start Now',
      className: 'bg-[#490000] hover:bg-red-800',
      onClick: () => setSelectedChildId(child._id),
    };
  };

  /* ---------------- LOADING & ERROR ---------------- */

  if (isLoading)
    return <div className="pt-24 text-center">Loading modules...</div>;

  if (error || !data?.data)
    return (
      <div className="pt-24 text-center text-red-600">
        Failed to load modules
      </div>
    );

  if (children.length === 0)
    return <div className="pt-24 text-center">No modules found.</div>;

  /* ---------------- RENDER ---------------- */

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {selectedChildId ? (
          <>
            <button
              onClick={() => setSelectedChildId(null)}
              className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              ← Back to Modules
            </button>

            <StartCompo assetId={selectedChildId} />
          </>
        ) : (
          <>
            {/* HEADER */}
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold text-gray-900">{parentName}</h1>
              <p className="text-xl text-gray-600 mt-1">Select a category to begin or resume</p>
            </div>

            {/* STATUS LEGEND */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 px-3 py-1 rounded bg-green-100 text-green-700 text-lg border">
                <Image src="/completed.svg" alt="Completed" width={20} height={20} /> Completed
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded bg-yellow-100 text-yellow-700 text-lg border">
                <Image src="/pending.svg" alt="Pending" width={20} height={20} /> In Progress
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded bg-gray-100 text-gray-600 text-lg border">
                <Image src="/startnow.svg" alt="Start Now" width={20} height={20} /> Not Started
              </span>
            </div>

            {/* GRID */}
            <div className="flex flex-wrap justify-center gap-9 max-w-5xl mx-auto">
              {children.map((child) => {
                const btn = getButtonConfig(child);

                return (
                  <div
                    key={child._id}
                    className="
                      relative bg-white rounded border border-gray-200 shadow-sm hover:shadow-md transition
                      w-full
                      h-38
                      md:w-[calc(50%-12px)]
                      lg:w-[calc(30.333%-16px)]
                    "
                  >
                    <StatusBadge child={child} />

                    <div className="py-6 px-4 text-center">
                      <h2 className="text-2xl font-bold text-gray-900">{child.Name}</h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {child.Description || 'SWOT Analysis'}
                      </p>
                    </div>

                    <button
                      onClick={btn.onClick}
                      className={`cursor-pointer relative overflow-hidden group w-full h-[54px] rounded-b-xl text-white font-semibold ${btn.className}`}
                    >
                      {/* Default */}
                      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full uppercase">
                        {btn.text}
                      </span>

                      {/* Hover */}
                      <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 uppercase">
                        {btn.text} <GoArrowUpRight className="text-2xl ml-1" />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
