//path components\global\addToCart.tsx

'use client';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { RootState } from '@/redux/store';
import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
import {
  setCart,
  addToCart,
  removeFromCart,
  clearCart,
  decrementItem,
} from '@/redux/slices/cart/cartLocalStrogeSlice';
import { getCookie } from '@/utils/cookies';
import { getErrorMessage } from '@/utils/errorHandler';
import { FiShoppingCart, FiPlus } from 'react-icons/fi'; // Feather Icons

import {
  useAddToCartMutation,
  useRemoveQuantityMutation,
  useGetAllAssetsQuery,
  useClearAllCartMutation,
  CartItemResponse,
} from '@/redux/slices/cart/cartApiSlice';
import Link from 'next/link';

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [createSubscription] = useCreateSubscriptionMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const userId = getCookie('UserId');

  // Move API hooks to top level
  const [addToCartApi] = useAddToCartMutation();
  const [removeQuantityApi] = useRemoveQuantityMutation();
  const [clearAllCartApi] = useClearAllCartMutation();

  // Helper function (can be in utils or inline)
  const isCartEmptyError = (error: unknown): boolean => {
    const err = error as FetchBaseQueryError;
    return (
      !!err?.data &&
      typeof err.data === 'object' &&
      'message' in err.data &&
      (err.data as { message?: string }).message === 'Cart is empty'
    );
  };

  // Backend cart query
  const {
    data: backendData,
    refetch,
    isLoading,
    error,
  } = useGetAllAssetsQuery({ OwnerType: 'user', OwnerId: userId || '' }, { skip: !userId });

  console.log(backendData, '======== backendData ==========');

  // Sync backend cart to Redux
  useEffect(() => {
    if (userId && backendData?.Items) {
      const formattedCart = backendData.Items.map((item: CartItemResponse) => ({
        id: item.App._id,
        name: item.App.Name,
        price: item.App.PricePerMonth || 0,
        qty: item.Quantity,
        subtotal: item.TotalPrice || (item.App.PricePerMonth || 0) * item.Quantity,
      }));
      dispatch(setCart(formattedCart));
    }
  }, [backendData, userId, dispatch]);

  // Merge local cart to backend on login
  useEffect(() => {
    const mergeLocalCartToBackend = async () => {
      if (userId && !isLoading && backendData?.Items?.length === 0 && cartItems.length > 0) {
        // If backend cart is empty, sync local cart to backend
        for (const item of cartItems) {
          try {
            await addToCartApi({
              OwnerType: 'user',
              OwnerId: userId,
              AppId: item.id,
              Quantity: item.qty,
            }).unwrap();
          } catch (err) {
            toast.error('Failed to sync local cart to backend');
            console.error('Sync error:', err);
          }
        }
        refetch();
      }
    };

    mergeLocalCartToBackend();
  }, [userId, cartItems, backendData, isLoading, addToCartApi, refetch]);

  // Handle add item - with optimistic update
  const handleAdd = async (id: string) => {
    if (!userId) {
      dispatch(addToCart({ id, qty: 1 }));
      toast.success('Item added to local cart');
      return;
    }

    // Optimistic update first
    dispatch(addToCart({ id, qty: 1 }));

    try {
      await addToCartApi({
        OwnerType: 'user',
        OwnerId: userId,
        AppId: id,
        Quantity: 1,
      }).unwrap();
      toast.success('Item added to cart');
      // refetch() will sync via the sync useEffect
    } catch (err) {
      // Revert optimistic update
      dispatch(removeFromCart(id));
      toast.error('Failed to add item');
      console.error('Add to cart error:', err);
    }
  };

  // Handle remove item - with optimistic update
  // const handleRemove = async (id: string) => {
  //   if (!userId) {
  //     dispatch(removeFromCart(id));
  //     toast.success('Item removed from local cart');
  //     return;
  //   }

  //   // Optimistic update first
  //   dispatch(removeFromCart(id));

  //   try {
  //     await removeQuantityApi({
  //       OwnerType: 'user',
  //       OwnerId: userId,
  //       AppId: id,
  //     }).unwrap();
  //     toast.success('Item quantity reduced');
  //   } catch (err) {
  //     // Revert optimistic update
  //     dispatch(addToCart({ id, qty: 1 }));
  //     toast.error('Failed to remove item');
  //     console.error('Remove from cart error:', err);
  //   }
  // };

  // const handleRemove = async (id: string) => {
  //   const item = cartItems.find((i) => i.id === id);
  //   if (!item) return;

  //   if (!userId) {
  //     dispatch(removeFromCart(id));
  //     toast.success('Item removed from local cart');
  //     return;
  //   }

  //   // Optimistic: reduce quantity (or remove if qty would be 0)
  //   const willBeZero = item.qty <= 1;
  //   dispatch(removeFromCart(id));

  //   try {
  //     await removeQuantityApi({
  //       OwnerType: 'user',
  //       OwnerId: userId,
  //       AppId: id,
  //     }).unwrap();

  //     toast.success('Item quantity reduced');
  //   } catch (err) {
  //     // Revert properly: restore the exact previous state
  //     dispatch(
  //       addToCart({
  //         id: item.id,
  //         qty: 1,
  //         name: item.name,
  //         price: item.price,
  //         subtotal: item.subtotal || item.price,
  //       }),
  //     );
  //     toast.error('Failed to remove item');
  //   }
  // };

  const handleRemove = async (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (!userId) {
      dispatch(decrementItem(id));
      toast.success('Quantity reduced');
      return;
    }

    // Optimistic update
    dispatch(decrementItem(id));

    try {
      await removeQuantityApi({
        OwnerType: 'user',
        OwnerId: userId,
        AppId: id,
      }).unwrap();

      toast.success('Quantity reduced');
    } catch (err) {
      console.log(err);

      // Safe revert: add back 1 with full data
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
        }),
      );
      toast.error('Failed to update quantity');
    }
  };

  // Handle clear cart
  const handleClear = async () => {
    try {
      if (userId) {
        await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
        refetch();
        toast.success('Cart cleared');
      }
      dispatch(clearCart());
    } catch (err) {
      toast.error('Failed to clear cart');
      console.error('Clear cart error:', err);
    }
  };

  // Calculate total
  const total = useMemo(() => {
    if (userId && backendData?.GrandTotal) {
      return backendData.GrandTotal;
    }
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
  }, [cartItems, backendData, userId]);

  const handleProceed = async () => {
    if (!isLoggedIn()) {
      router.push('/ind-login?redirect=cart');
      return;
    }

    if (!userId || cartItems.length === 0) {
      toast.error('Cart is empty or user not found');
      return;
    }

    try {
      const subRes = await createSubscription({
        SubscriberType: 'user',
        SubscriberId: userId,
        Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
      }).unwrap();

      if (!subRes.status || !subRes.data?._id) {
        throw new Error('Subscription creation failed');
      }

      const checkoutRes = await createCheckoutSession({
        subscriptionId: subRes.data._id,
      }).unwrap();

      if (!checkoutRes.status || !checkoutRes.data?.url) {
        throw new Error('Checkout session creation failed');
      }

      window.location.href = checkoutRes.data.url;
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <p>Loading cart...</p>;
  // if (error) return <p>Error loading cart: {getErrorMessage(error)}</p>;

  // Only show error when it’s a *real* failure
  // if (error && !(error as any)?.data?.message?.includes('Cart is empty')) {
  //   return <p>Error loading cart: {getErrorMessage(error)}</p>;
  // }

  if (error && !isCartEmptyError(error)) {
    return (
      <div>
        <p>Error loading cart: {getErrorMessage(error)}</p>
        <Link href="/cart">if you want to add app</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      {cartItems.length === 0 ? (
        // <div>
        //   <p>No items in cart</p>
        //   <Link href="/all-app-courses">Add App to your Cart</Link>
        // </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Icon Container */}
          <div className="mb-6 rounded-full bg-[#FFEECA] p-6">
            <FiShoppingCart className="h-12 w-12 text-[#8B4513]" />
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-2xl font-medium text-gray-800">Your cart is empty</h2>

          {/* Description */}
          <p className="mb-8 max-w-md text-base text-gray-600">
            Looks like you haven’t added any apps yet. Browse our catalog and start building your
            subscription today!
          </p>

          {/* CTA Button */}
          <Link
            href="/all-app-courses"
            className="inline-flex items-center gap-2 rounded-md bg-red-500 text-white  px-6 py-3 font-medium  transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4513] focus-visible:ring-offset-2"
          >
            <FiPlus className="h-5 w-5" />
            Add Apps to Cart
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Table */}
          <div className="lg:col-span-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#D0D5DD] text-lg">
                  <th className="text-left py-3 font-normal">Product Details</th>
                  <th className="text-left py-3 font-normal">Price</th>
                  <th className="text-left py-3 font-normal">Quantity</th>
                  <th className="text-left py-3 font-normal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#D0D5DD]">
                    <td className="flex items-center gap-3 py-4">
                      <div className="w-16 h-16 bg-red-900"></div>
                      <span className="text-base font-normal">{item.name || 'Unknown'}</span>
                    </td>
                    <td className="text-base font-normal">${item.price || 0}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
                          // disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-[#D0D5DD] min-w-[2rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleAdd(item.id)}
                          className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.subtotal || (item.price || 0) * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
            <h2 className="text-3xl font-normal mb-4">
              Cart Total <span className="ml-1">({cartItems.length})</span>
            </h2>
            <div className="flex justify-between flex-col py-2 border-b pb-7">
              <span className="text-xl">SubTotal</span>
              <span className="text-lg">${total}</span>
            </div>
            <div className="flex justify-between flex-col py-2 mt-5 pb-4">
              <span className="text-xl">Total</span>
              <span className="text-lg">${total}</span>
            </div>
            <button
              onClick={handleProceed}
              className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClear}
              className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600 disabled:bg-gray-400"
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
