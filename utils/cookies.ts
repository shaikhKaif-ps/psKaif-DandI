// utils/cookies.ts

import Cookies from 'js-cookie';

/**
 * Set a cookie
 * @param {string} key - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiry in days (default: 7 days)
 */
export const setCookie = (key: string, value: string, days: number = 7): void => {
  Cookies.set(key, value, {
    expires: days, // Cookie expiry in days
    secure: true, // Ensures the cookie is sent over HTTPS
    sameSite: 'strict', // Protects against CSRF attacks
  });
};

/**
 * Get a cookie
 * @param {string} key - Cookie name
 * @returns {string | undefined} - Cookie value or undefined if not found
 */
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

/**
 * Remove a cookie
 * @param {string} key - Cookie name
 */
export const deleteCookie = (key: string): void => {
  Cookies.remove(key, { secure: true, sameSite: 'strict' });
};

// utils/cookies.ts
export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
