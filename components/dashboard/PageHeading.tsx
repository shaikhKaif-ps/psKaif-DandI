// ======================= ts
// path: components/dashboard/PageHeading.tsx
'use client';

import { usePathname } from 'next/navigation';

import { FaBars } from 'react-icons/fa';

const routeToLabel: Record<string, string> = {
  dashboard: 'Dashboard',
  organization: 'My Organization',
  diversity: 'Diversity',
  inclusion: 'Inclusion',
  swot: 'SWOT',
  equity: 'Equity',
  culture: 'Culture',
  talent: 'Talent',
  leadership: 'Leadership',
  belonging: 'Belonging',
  settings: 'Settings',
  result: 'Results',
};

interface PageHeadingProps {
  toggleSidebar?: () => void;
  isDesktop: boolean;
}

// export default function PageHeading({ toggleSidebar: ___, isDesktop }: PageHeadingProps) {
//   const pathname = usePathname();
//   const [_, __] = useState(false);

//   // Extract the main route and sub-route for breadcrumb-like functionality
//   const pathSegments: string[] = pathname.split('/').filter(Boolean);
//   const mainRoute: string = pathSegments[0] || 'dashboard';
//   const subRoute: string | undefined = pathSegments[1];

//   // Get main label
//   const mainLabel: string = routeToLabel[mainRoute] || 'Dashboard';

//   // Handle mobile menu toggle (for mobile devices only)
//   const handleMobileMenuToggle = () => {
//     if (!isDesktop) {
//       // Trigger mobile sidebar open - we need to communicate this to the parent
//       // For now, we'll use a custom event
//       window.dispatchEvent(new CustomEvent('toggleMobileSidebar'));
//     }
//   };

//   // Generate breadcrumb or page title
//   const getPageTitle = (): string => {
//     if (subRoute && !isNaN(Number(subRoute))) {
//       return `${mainLabel} - Question ${subRoute}`;
//     } else if (subRoute) {
//       const subLabel: string = routeToLabel[subRoute] || subRoute;
//       return `${mainLabel} - ${subLabel}`;
//     }
//     return mainLabel;
//   };

//   return (
//     <header className="w-full px-4 py-3 md:px-6 md:py-4 text-white brandBg fixed top-0 z-10 ">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           {/* Mobile Menu Button */}
//           {!isDesktop && (
//             <button
//               onClick={handleMobileMenuToggle}
//               className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors lg:hidden"
//               aria-label="Open menu"
//             >
//               <FaBars className="w-5 h-5" />
//             </button>
//           )}

//           {/* Page Title */}
//           <div className="min-w-0 flex-1">
//             <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white truncate">
//               {getPageTitle()}
//             </h1>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

export default function PageHeading({ isDesktop }: PageHeadingProps) {
  const pathname = usePathname();

  const pathSegments: string[] = pathname.split('/').filter(Boolean);
  const mainRoute: string = pathSegments[0] || 'dashboard';
  const subRoute: string | undefined = pathSegments[1];

  const mainLabel: string = routeToLabel[mainRoute] || 'Dashboard';

  const handleMobileMenuToggle = () => {
    if (!isDesktop) {
      window.dispatchEvent(new CustomEvent('toggleMobileSidebar'));
    }
  };

  const getPageTitle = (): string => {
    if (subRoute && !isNaN(Number(subRoute))) {
      return `${mainLabel} - Question ${subRoute}`;
    } else if (subRoute) {
      const subLabel: string = routeToLabel[subRoute] || subRoute;
      return `${mainLabel} - ${subLabel}`;
    }
    return mainLabel;
  };

  return (
    <header className="w-full px-4 py-3 md:px-6 md:py-4 text-white brandBg fixed top-0 z-40 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isDesktop && (
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
