// //path : app/(dashboard)/dashboard/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// // import DepartmentBarChart from '@/components/dashboard/DepartmentBarChart';
// import MultiRadialChart from '@/components/dashboard/MultiRadialChart';
// import { useGetUserSubscriptionByUserQuery } from '@/redux/slices/subscription/subscriptionSlice';
// export default function Dashboard() {
//   const [windowWidth, setWindowWidth] = useState(0);
//   const { data: subscriptionData } = useGetUserSubscriptionByUserQuery();
//   console.log(subscriptionData);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setWindowWidth(window.innerWidth);
//       const resizeHandler = () => setWindowWidth(window.innerWidth);
//       window.addEventListener('resize', resizeHandler);
//       return () => window.removeEventListener('resize', resizeHandler);
//     }
//   }, []);
//   void windowWidth;

//   const appIcons: Record<string, string> = {
//     leadership: '/dashboard/leadership.svg',
//     culture: '/dashboard/culture.svg',
//     diversity: '/dashboard/diversity.svg',
//     equity: '/dashboard/equity.svg',
//     inclusion: '/dashboard/inclusion.svg',
//     organization: '/dashboard/diversity.svg',
//     swot: '/dashboard/swot.svg',
//     talentdevelopment: '/dashboard/teamdev.svg',
//     belongings: '/dashboard/belongingicon.svg',
//   };

//   const cards = [
//     { title: 'Diversity', score: '3/10', bgColor: 'bg-[#E68A5C]', icon: appIcons.diversity },
//     { title: 'Inclusion', score: '1/10', bgColor: 'bg-[#6DC7A6]', icon: appIcons.inclusion },
//     { title: 'SWOT Analysis', score: '5/10', bgColor: 'bg-[#4F8885]', icon: appIcons.swot },
//     { title: 'Equity App', score: '2/10', bgColor: 'bg-[#9FAF75]', icon: appIcons.equity },
//     { title: 'Culture', score: '6/10', bgColor: 'bg-[#6B7FB2]', icon: appIcons.culture },
//     { title: 'Leadership', score: '4/10', bgColor: 'bg-[#8E4B3E]', icon: appIcons.leadership },
//     {
//       title: 'Talent Development',
//       score: '2/10',
//       bgColor: 'bg-[#56B8C9]',
//       icon: appIcons.talentdevelopment,
//     },
//     { title: 'Belongings', score: '8/10', bgColor: 'bg-[#9B8FBF]', icon: appIcons.belongings },
//   ];
//   return (
//     <div>
//       <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
//       <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>
//       {/* Quick Overview */}
//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 md:gap-3">
//           <MultiRadialChart />
//           <div className="md:col-span-2 space-y-4">
//             {/* First row */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 pb-[11px]">
//               {cards.slice(0, 2).map((card, idx) => (
//                 <div
//                   key={idx}
//                   className={` h-[120px]  relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//                 >
//                   <h4 className="lg:text-[18px] md:text-[11px] font-semibold">{card.title}</h4>
//                   <p className="lg:text-[20px] md:text-[13px] font-bold">{card.score}</p>
//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3  w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             {/* Second row */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
//               {cards.slice(2).map((card, idx) => (
//                 <div
//                   key={idx}
//                   className={` h-[120px]  relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//                 >
//                   <h4 className="lg:text-[18px] md:text-[11px] font-semibold">{card.title}</h4>
//                   <p className="lg:text-[20px] md:text-[13px] font-bold">{card.score}</p>
//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-15 lg:h-15 md:w-10 md:h-10">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Departmental Results */}
//       {/* <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Departmental Results</h3>
//         <DepartmentBarChart />
//       </section> */}
//     </div>
//   );
// ================================
// ================================
// ================================
// app/(dashboard)/dashboard/page.tsx
// app/(dashboard)/dashboard/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import MultiRadialChart from '@/components/dashboard/MultiRadialChart';
// import { useGetUserSubscriptionByUserQuery } from '@/redux/slices/subscription/subscriptionSlice';

// export default function Dashboard() {
//   const [windowWidth, setWindowWidth] = useState(0);
//   const { data: subscriptionData, isLoading } = useGetUserSubscriptionByUserQuery();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setWindowWidth(window.innerWidth);
//       const resizeHandler = () => setWindowWidth(window.innerWidth);
//       window.addEventListener('resize', resizeHandler);
//       return () => window.removeEventListener('resize', resizeHandler);
//     }
//   }, []);
//   void windowWidth;

//   // Icon mapping - keys must match backend AppId.Name exactly
//   const appIcons: Record<string, string> = {
//     Diversity: '/dashboard/diversity.svg',
//     Inclusion: '/dashboard/inclusion.svg',
//     Equity: '/dashboard/equity.svg',
//     Culture: '/dashboard/culture.svg',
//     Leadership: '/dashboard/leadership.svg',
//     Swot: '/dashboard/swot.svg',
//     TalentDevelopment: '/dashboard/teamdev.svg',
//     Belongings: '/dashboard/belongingicon.svg',
//   };

//   const appBgColors: Record<string, string> = {
//     Diversity: 'bg-[#E68A5C]',
//     Inclusion: 'bg-[#6DC7A6]',
//     Equity: 'bg-[#9FAF75]',
//     Culture: 'bg-[#6B7FB2]',
//     Leadership: 'bg-[#8E4B3E]',
//     Swot: 'bg-[#4F8885]',
//     TalentDevelopment: 'bg-[#56B8C9]',
//     Belongings: 'bg-[#9B8FBF]',
//   };

//   // Temporary scores (replace with real data later)
//   const tempScores: Record<string, string> = {
//     Diversity: '3/10',
//     Inclusion: '1/10',
//     Equity: '2/10',
//     Culture: '6/10',
//     Leadership: '4/10',
//     Swot: '5/10',
//     TalentDevelopment: '2/10',
//     Belongings: '8/10',
//   };

//   // Extract active app names from subscriptions
//   const activeAppNames = new Set(
//     subscriptionData?.data
//       ?.filter((sub: any) => sub.Status === 'active')
//       .flatMap((sub: any) => sub.Apps.map((app: any) => app.AppId.Name)) || []
//   );

//   // Define ALL possible cards (in your desired order)
//   const allCards = [
//     { key: 'Diversity', title: 'Diversity' },
//     { key: 'Inclusion', title: 'Inclusion' },
//     { key: 'Swot', title: 'SWOT Analysis' },
//     { key: 'Equity', title: 'Equity App' },
//     { key: 'Culture', title: 'Culture' },
//     { key: 'Leadership', title: 'Leadership' },
//     { key: 'TalentDevelopment', title: 'Talent Development' },
//     { key: 'Belongings', title: 'Belongings' },
//   ].map(({ key, title }) => ({
//     key,
//     title,
//     score: tempScores[key] || '0/10',
//     bgColor: appBgColors[key] || 'bg-gray-500',
//     icon: appIcons[key],
//     isActive: activeAppNames.has(key),
//   }));

//   if (isLoading) return <p>Loading dashboard...</p>;

//   return (
//     <div>
//       <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
//       <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>

//       {/* Quick Overview */}
//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 md:gap-3">
//           <MultiRadialChart />

//           <div className="md:col-span-2 space-y-4">
//             {/* First row: first 2 cards */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 pb-[11px]">
//               {allCards.slice(0, 2).map((card) => (
//                 <div
//                   key={card.key}
//                   className={`
//                     h-[120px] relative rounded-xl text-white p-4 flex flex-col justify-between
//                     ${card.bgColor}
//                     transition-all duration-300
//                     ${card.isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
//                   `}
//                 >
//                   {/* Grey overlay + lock icon for inactive apps */}
//                   {!card.isActive && (
//                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center z-10">
//                       <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                         />
//                       </svg>
//                     </div>
//                   )}

//                   <h4 className="lg:text-[18px] md:text-[11px] font-semibold relative z-20">
//                     {card.title}
//                   </h4>
//                   <p className="lg:text-[20px] md:text-[13px] font-bold relative z-20">
//                     {card.isActive ? card.score : '--'}
//                   </p>

//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10 z-20">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         fill
//                         className={`object-contain ${!card.isActive ? 'opacity-60' : ''}`}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Second row: remaining cards */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
//               {allCards.slice(2).map((card) => (
//                 <div
//                   key={card.key}
//                   className={`
//                     h-[120px] relative rounded-xl text-white p-4 flex flex-col justify-between
//                     ${card.bgColor}
//                     transition-all duration-300
//                     ${card.isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
//                   `}
//                 >
//                   {/* Grey overlay + lock for inactive */}
//                   {!card.isActive && (
//                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center z-10">
//                       {/* <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                         />
//                       </svg> */}
//                     </div>
//                   )}

//                   <h4 className="lg:text-[18px] md:text-[11px] font-semibold relative z-20">
//                     {card.title}
//                   </h4>
//                   <p className="lg:text-[20px] md:text-[13px] font-bold relative z-20">
//                     {card.isActive ? card.score : '--'}
//                   </p>

//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10 z-20">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         fill
//                         className={`object-contain ${!card.isActive ? 'opacity-60' : ''}`}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// ======================
// app/(dashboard)/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MultiRadialChart from '@/components/dashboard/MultiRadialChart';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setAssetId } from '@/redux/slices/global/globalSlice';
import {
  useGetUserSubscriptionByUserQuery,
  Subscription,
  SubscriptionApp,
} from '@/redux/slices/subscription/subscriptionSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const { data: subscriptionData, isLoading } = useGetUserSubscriptionByUserQuery();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const resizeHandler = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }
  }, []);
  void windowWidth;

  const appIcons: Record<string, string> = {
    Diversity: '/dashboard/diversity.svg',
    Inclusion: '/dashboard/inclusion.svg',
    Equity: '/dashboard/equity.svg',
    Culture: '/dashboard/culture.svg',
    Leadership: '/dashboard/leadership.svg',
    Swot: '/dashboard/swot.svg',
    TalentDevelopment: '/dashboard/teamdev.svg',
    Belongings: '/dashboard/belongingicon.svg',
  };

  const appBgColors: Record<string, string> = {
    Diversity: 'bg-[#E68A5C]',
    Inclusion: 'bg-[#6DC7A6]',
    Equity: 'bg-[#9FAF75]',
    Culture: 'bg-[#6B7FB2]',
    Leadership: 'bg-[#8E4B3E]',
    Swot: 'bg-[#4F8885]',
    TalentDevelopment: 'bg-[#56B8C9]',
    Belongings: 'bg-[#9B8FBF]',
  };

  const tempScores: Record<string, string> = {
    Diversity: '3/10',
    Inclusion: '1/10',
    Equity: '2/10',
    Culture: '6/10',
    Leadership: '4/10',
    Swot: '5/10',
    TalentDevelopment: '2/10',
    Belongings: '8/10',
  };

  // Get map of active app names (lowercased) to their AppId._id
  const activeAppsMap = new Map(
    subscriptionData?.data
      ?.filter((sub: Subscription) => sub.Status === 'active')
      .flatMap((sub: Subscription) =>
        sub.Apps.map((app: SubscriptionApp) => [app.AppId.Name.toLowerCase(), app.AppId._id]),
      ) || [],
  );

  // All cards in desired order
  const allCards = [
    { key: 'diversity', title: 'Diversity' },
    { key: 'inclusion', title: 'Inclusion' },
    { key: 'swot', title: 'SWOT Analysis' },
    { key: 'equity', title: 'Equity App' },
    { key: 'culture', title: 'Culture' },
    { key: 'leadership', title: 'Leadership' },
    { key: 'talentdevelopment', title: 'Talent Development' },
    { key: 'belongings', title: 'Belongings' },
  ].map(({ key, title }) => {
    const appId = activeAppsMap.get(key.toLowerCase());
    const displayKey = key.charAt(0).toUpperCase() + key.slice(1);

    return {
      key,
      title,
      score: tempScores[displayKey] || '0/10',
      bgColor: appBgColors[displayKey] || 'bg-gray-500',
      icon: appIcons[displayKey],
      isActive: !!appId,
      appId,
      slug: key.toLowerCase(),
    };
  });

  const handleCardClick = (card: (typeof allCards)[0]) => {
    if (!card.isActive || !card.appId) return;

    // Set assetId in Redux
    dispatch(setAssetId(card.appId));

    // Navigate to module
    router.push(`/dynamicApps/${card.slug}`);
  };

  if (isLoading) return <p>Loading dashboard...</p>;

  return (
    <div className="pt-[80px] w-full px-6">
      <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
      <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>

      <section className="mb-6">
        <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 md:gap-3">
          <MultiRadialChart />

          <div className="md:col-span-2 space-y-4">
            {/* First row: first 2 cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 pb-[11px]">
              {allCards.slice(0, 2).map((card) => (
                <div
                  key={card.key}
                  onClick={() => handleCardClick(card)}
                  className={`
                    h-[120px] relative rounded-xl text-white p-4 flex flex-col justify-between overflow-hidden
                    ${card.bgColor}
                    transition-all duration-300
                    ${card.isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {/* Subtle grey overlay for locked apps */}
                  {!card.isActive && (
                    <div className="absolute inset-0 bg-gray-400 bg-opacity-10 rounded-xl z-10" />
                  )}

                  <h4 className="lg:text-[18px] md:text-[11px] font-semibold relative z-20">
                    {card.title}
                  </h4>
                  <p className="lg:text-[20px] md:text-[13px] font-bold relative z-20">
                    {card.isActive ? card.score : '--'}
                  </p>

                  {card.icon && (
                    <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10 z-20">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        fill
                        className={`object-contain transition-opacity ${!card.isActive ? 'opacity-50' : 'opacity-100'}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Second row: remaining cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
              {allCards.slice(2).map((card) => (
                <div
                  key={card.key}
                  onClick={() => handleCardClick(card)}
                  className={`
                    h-[120px] relative rounded-xl text-white p-4 flex flex-col justify-between overflow-hidden
                    ${card.bgColor}
                    transition-all duration-300
                    ${card.isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {/* Subtle grey overlay for locked apps */}
                  {!card.isActive && (
                    <div className="absolute inset-0 bg-gray-400 bg-opacity-10 rounded-xl z-10" />
                  )}

                  <h4 className="lg:text-[18px] md:text-[11px] font-semibold relative z-20">
                    {card.title}
                  </h4>
                  <p className="lg:text-[20px] md:text-[13px] font-bold relative z-20">
                    {card.isActive ? card.score : '--'}
                  </p>

                  {card.icon && (
                    <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10 z-20">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        fill
                        className={`object-contain transition-opacity ${!card.isActive ? 'opacity-50' : 'opacity-100'}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
