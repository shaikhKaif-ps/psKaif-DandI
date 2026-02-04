// ======================= ts
// path: components/dashboard/PageHeading.tsx
'use client';

import { useClearUserAssessmentMutation } from '@/redux/slices/assesment/assesmentSlice';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookies';

import { FaBars } from 'react-icons/fa';

const routeToLabel: Record<string, string> = {
  dashboard: 'Dashboard',
  organization: 'My Organization',
  diversity: 'Diversity',
  inclusion: 'Inclusion',
  swot: 'SWOT',
  'swot-result': 'SWOT',
  equity: 'Equity',
  culture: 'Culture',
  talent: 'Talent',
  leadership: 'Leadership',
  belonging: 'Belonging',
  settings: 'Settings',
  result: 'Results',
};

const allowedUserIds = [
  '69088c7a00c8821643858925',
  '69315275cd8c3beb46a9ea78',
  '6931528bcd8c3beb46a9ea7e',
];

interface PageHeadingProps {
  toggleSidebar?: () => void;
  isDesktop: boolean;
}

export default function PageHeading({ isDesktop }: PageHeadingProps) {
  // const [clearUserAssessment, { isLoading, isSuccess, error }] = useClearUserAssessmentMutation();
  const [clearUserAssessment] = useClearUserAssessmentMutation();
  const router = useRouter();

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
    // Helper to check if string is MongoDB ID
    const isId = (s: string) => /^[0-9a-fA-F]{24}$/.test(s);
    const isNumber = (s: string) => !isNaN(Number(s));

    // Filter segments to find meaningful labels (skip IDs and Numbers)
    const meaningfulSegments = pathSegments.filter(
      (segment) => !isId(segment) && !isNumber(segment),
    );

    // Skip 'dynamicApps' as it's just a path container
    const labels =
      meaningfulSegments[0] === 'dynamicApps' ? meaningfulSegments.slice(1) : meaningfulSegments;

    const mainLabel: string = routeToLabel[mainRoute] || 'Dashboard';

    if (labels.length > 0) {
      const topSegment = labels[0];
      const subLabel: string =
        routeToLabel[topSegment] ||
        topSegment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

      return `${mainLabel} - ${subLabel}`;
    }

    return mainLabel;
  };

  const handleClear = async () => {
    try {
      const userId = getCookie('UserId');
      if (!userId) {
        alert('User ID not found in cookies');
        return;
      }
      await clearUserAssessment(userId).unwrap();
      alert('Assessment cleared successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to clear assessment:', err);
    }
  };

  return (
    <header className="w-full px-4 py-3 md:px-6 md:py-4 text-white brandBg fixed top-0 z-40 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 w-[calc(100%-400px)]">
          {!isDesktop && (
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          )}

          <div className="min-w-0 flex-1 md:flex items-center justify-between ">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white truncate">
              {getPageTitle()}
            </h1>

            {allowedUserIds.includes(getCookie('UserId') || '') && (
              <button
                onClick={handleClear}
                className="hidden md:block ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Reset User
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
