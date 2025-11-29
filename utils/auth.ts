// utils/auth.ts
import { deleteCookie, getCookie } from './cookies';

export const getUserToken = (): string | null => {
  return getCookie('UserToken') || null;
};

export const isLoggedIn = (): boolean => {
  const token = getCookie('UserToken');
  const userId = getCookie('UserId');
  return !!(token && userId); // dono hone chahiye
};

export const isUserSubscribed = (): boolean => {
  const token = getUserToken();
  const isSubscribed = getCookie('isSubscribed') === 'true';
  return !!token && isSubscribed;
};

// utils/auth.ts
export const logout = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  // Save backend cart to local storage before logout
  deleteCookie('UserToken');
  deleteCookie('UserId');
  localStorage.setItem('cart', JSON.stringify(cartItems));
};
