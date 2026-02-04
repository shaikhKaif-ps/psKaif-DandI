// // app/(dashboard)/layout.tsx
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import React, { ReactNode } from 'react';

// import PageHeading from '@/components/dashboard/PageHeading';
// import Sidebar from '@/components/dashboard/Sidebar';
// import { useWindowWidth } from '@/hooks/use-window-width'; // Import the new custom hook

// import { isUserSubscribed } from '@/utils/auth';

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function DashboardLayout({ children }: LayoutProps) {
//   const router = useRouter();
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     if (!isUserSubscribed()) {
//       router.replace('/cart'); // 👈 redirect to cart
//     } else {
//       setChecked(true);
//     }
//   }, [router]);

//   // State to manage whether the sidebar is expanded or collapsed.
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
//   const windowWidth = useWindowWidth();

//   const isDesktop = windowWidth >= 768;

//   // Effect to automatically collapse the sidebar on smaller desktop screens for better viewing.
//   useEffect(() => {
//     if (windowWidth > 768 && windowWidth < 1024) {
//       setIsSidebarExpanded(false);
//     } else if (windowWidth >= 1024) {
//       setIsSidebarExpanded(true);
//     }
//   }, [windowWidth]);

//   // Single function to toggle the sidebar state.
//   const toggleSidebar = () => {
//     setIsSidebarExpanded((prev) => !prev);
//   };

//   // Dynamically calculate the left margin for the main content area.
//   const marginLeft = isDesktop ? (isSidebarExpanded ? '240px' : '64px') : '0px';

//   if (!checked) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   return (
//     // <div className="bg-gray-50 min-h-screen">
//     // <div className="bg-gray-50 min-h-screen md:min-h-0">
//     <div className="bg-gray-50 min-h-screen ">
//       {/*
//         The Sidebar component now receives all the state it needs to manage
//         both its desktop and mobile appearances.
//       */}
//       <Sidebar isExpanded={isSidebarExpanded} isDesktop={isDesktop} toggleSidebar={toggleSidebar} />

//       {/*
//         The main content area, including the PageHeading, is shifted to the right
//         to make space for the desktop sidebar.
//       */}
//       <div className="relative transition-all duration-300" style={{ marginLeft }}>
//         {/* The PageHeading is now part of the main content flow. */}
//         <div className="mb-[68px]">
//           <PageHeading isDesktop={isDesktop} toggleSidebar={toggleSidebar} />
//         </div>
//         {/* The page content is rendered here with padding. */}
//         {/* <main className="p-4 md:p-6">{children}</main> */}
//         <main className="p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
// =========================
// =========================
// =========================
// path app / (dashboard) / layout.tsx;
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import PageHeading from '@/components/dashboard/PageHeading';
import Sidebar from '@/components/dashboard/Sidebar';
import { useWindowWidth } from '@/hooks/use-window-width';
import { isUserSubscribed } from '@/utils/auth';
import { getCookie } from '@/utils/cookies';
import { setAssetId, setAssessmentId } from '@/redux/slices/global/globalSlice';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  // Sidebar state
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 768;
  const marginLeft = isDesktop ? (isSidebarExpanded ? '240px' : '73px') : '0px';

  // 1️⃣ Hydrate Redux from cookies on mount
  useEffect(() => {
    const assetId = getCookie('assetId');
    const assessmentId = getCookie('assessmentId');

    if (assetId) dispatch(setAssetId(assetId));
    if (assessmentId) dispatch(setAssessmentId(assessmentId));
  }, [dispatch]);

  // 2️⃣ Check subscription
  useEffect(() => {
    if (!isUserSubscribed()) {
      router.replace('/cart'); // redirect if not subscribed
    } else {
      setChecked(true);
    }
  }, [router]);

  // 3️⃣ Auto-collapse sidebar on medium screens
  useEffect(() => {
    if (windowWidth > 768 && windowWidth < 1024) {
      setIsSidebarExpanded(false);
    } else if (windowWidth >= 1024) {
      setIsSidebarExpanded(true);
    }
  }, [windowWidth]);

  // 4️⃣ Listen for sidebar close events
  useEffect(() => {
    const handleCloseSidebar = () => setIsSidebarExpanded(false);
    window.addEventListener('closeSidebar', handleCloseSidebar);
    return () => window.removeEventListener('closeSidebar', handleCloseSidebar);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);

  if (!checked) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 h-fit">
      {/* <div className="bg-gray-50 min-h-fsull"> */}
      <Sidebar isExpanded={isSidebarExpanded} isDesktop={isDesktop} toggleSidebar={toggleSidebar} />

      <div
        className="relative transition-all  duration-300 h-[calc(100vh-67px)] md:h-[calc(100vh-80px)]"
        style={{ marginLeft }}
      >
        <div className="">
          <PageHeading isDesktop={isDesktop} toggleSidebar={toggleSidebar} />
        </div>
        <main className="p-0 md:px-0  min-h-screen flex justify-center items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
