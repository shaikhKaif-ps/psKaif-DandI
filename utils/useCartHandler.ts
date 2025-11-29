// utils/useCartHandler.ts
import { isLoggedIn } from '@/utils/auth';
import { addToCart as addLocalToCart } from '@/redux/slices/cart/cartLocalStrogeSlice';
import { useAddToCartMutation } from '@/redux/slices/cart/cartApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getCookie } from './cookies';

export const useCartHandler = () => {
  const dispatch = useDispatch();
  const [addToCartApi] = useAddToCartMutation();

  const addItem = async (item: { id: string; name?: string; price?: number }) => {
    const userId = getCookie('UserId');
    if (isLoggedIn() && userId) {
      // Authorized user → Backend call
      try {
        const res = await addToCartApi({
          OwnerType: 'user',
          OwnerId: userId,
          AppId: item.id,
          Quantity: 1,
        }).unwrap();
        if (res.status) {
          toast.success(res.message);
          dispatch(addLocalToCart({ ...item, qty: 1, subtotal: item.price || 0 }));
        }
      } catch (err) {
        toast.error('Failed to add item to cart');
      }
    } else {
      // Unauthorized user → Local storage
      dispatch(addLocalToCart({ ...item, qty: 1, subtotal: item.price || 0 }));
      toast.success('Added to local cart');
    }
  };

  return { addItem };
};
