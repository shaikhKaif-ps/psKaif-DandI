'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to track the window width.
 * This ensures that window-related logic is client-side only and is reusable.
 * @returns {number} The current inner width of the window.
 */
export function useWindowWidth() {
  // Initialize state with 0, as the window object is not available on the server.
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // This effect runs only on the client, where `window` is defined.
    if (typeof window !== 'undefined') {
      // Set the initial width.
      setWindowWidth(window.innerWidth);

      // Define the event handler for window resize.
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add the event listener.
      window.addEventListener('resize', handleResize);

      // Cleanup function to remove the event listener when the component unmounts.
      // This is crucial to prevent memory leaks.
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount and unmount.

  return windowWidth;
}
