'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to handle mobile sidebar state
 * This separates the mobile sidebar logic from the main sidebar component
 */
export function useMobileSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Listen for mobile sidebar toggle events
    const handleToggle = () => {
      setIsMobileOpen((prev) => !prev);
    };

    // Listen for route changes to close mobile sidebar
    const handleRouteChange = () => {
      setIsMobileOpen(false);
    };

    // Listen for escape key to close mobile sidebar
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };

    // Add event listeners
    window.addEventListener('toggleMobileSidebar', handleToggle);
    window.addEventListener('popstate', handleRouteChange);

    if (isMobileOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup
    return () => {
      window.removeEventListener('toggleMobileSidebar', handleToggle);
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const openMobile = () => setIsMobileOpen(true);
  const closeMobile = () => setIsMobileOpen(false);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return {
    isMobileOpen,
    openMobile,
    closeMobile,
    toggleMobile,
  };
}
