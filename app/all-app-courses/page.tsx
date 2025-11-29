// app/all-app-courses/page.tsx
'use client';
import React, { useState } from 'react';
import { Asset, useGetAssetsQuery } from '@/redux/slices/allApp/allAppSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/slices/cart/cartLocalStrogeSlice';
import Link from 'next/link';
import Image from 'next/image';
import { deleteCookie, setCookie, getCookie } from '@/utils/cookies';
import { RootState } from '@/redux/store';
import { isLoggedIn } from '@/utils/auth';
import toast from 'react-hot-toast';
import { useAddToCartMutation } from '@/redux/slices/cart/cartApiSlice';
import { getErrorMessage } from '@/utils/errorHandler';

export default function AssetsList() {
  const { data, error, isLoading } = useGetAssetsQuery();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  // 🔹 API mutation hook
  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const handleSelect = async (asset: Asset) => {
    const isSelected = selectedAssets.includes(asset._id);

    if (isSelected) {
      // --- Deselect ---
      dispatch(removeFromCart(asset._id));
      deleteCookie(`asset_${asset._id}`);
      setSelectedAssets((prev) => prev.filter((id) => id !== asset._id));
      toast('Item removed from cart');
      return;
    }

    if (isLoggedIn()) {
      try {
        // ✅ Authorized user → API call
        const OwnerId = getCookie('UserId') || '';
        if (!OwnerId) throw new Error('UserId missing. Please login again.');

        const body = {
          OwnerType: 'user',
          OwnerId,
          AppId: asset._id,
          Quantity: 1,
        };

        const res = await addToCartApi(body).unwrap();
        if (res.status) {
          toast.success('Item added to cart (Server)');
          dispatch(
            addToCart({
              id: asset._id,
              name: asset.Name,
              price: asset.PricePerMonth,
              qty: 1,
            }),
          );
        } else {
          toast.error(res.message || 'Failed to add');
        }
      } catch (err: unknown) {
        console.error(err);
        // toast.error(err.message || 'Error adding to cart');
        toast.error(getErrorMessage(err));
      }
    } else {
      // ❌ Unauthorized → localStorage + cookie
      dispatch(
        addToCart({
          id: asset._id,
          name: asset.Name,
          price: asset.PricePerMonth,
          qty: 1,
        }),
      );
      setCookie(`asset_${asset._id}`, JSON.stringify(asset));
      toast('Login to save your cart permanently');
    }

    setSelectedAssets((prev) => [...prev, asset._id]);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex py-5 items-center  px-[15px] justify-between ">
        <h2 className="text-xl font-bold">Assets</h2>
        <Link
          href="/cart"
          className={`relative bg-red-300 px-2 py-2 cursor-pointer ${
            cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Cart Page
        </Link>
      </div>

      <div className="space-y-2 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-7 w-[90%] mx-auto lg:w-full ">
        {data?.data
          ?.slice() // make a shallow copy so we don’t mutate original data
          .sort((a, b) => (a.Name === 'Inclusion' ? -1 : b.Name === 'Inclusion' ? 1 : 0)) // Inclusion first
          .map((asset) => {
            const isSelected = selectedAssets.includes(asset._id);

            return (
              <div key={asset._id} className="border border-[#D0D5DD] rounded-lg">
                <div className="imgCon h-[186px] w-full relative">
                  <Image
                    src="/appCardBanner.png"
                    alt="App banner"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="px-3 py-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold w-[50%] text-xl">{asset.Name}</h3>
                    <div className="w-[50%] flex flex-col justify-end items-end">
                      <p className="text-[#7F0000] text-2xl leading-[24px] font-semibold">
                        {asset.PricePerMonth}
                      </p>
                      <p className="text-[#475467] text-base leading-5">/user/month</p>
                    </div>
                  </div>
                  <div className="pt-6 pb-4 flex items-center justify-center">
                    <button
                      onClick={() => handleSelect(asset)}
                      disabled={isAdding}
                      className={`cursor-pointer text-base font-bold py-2 w-[200px] border border-[#D0D5DD] rounded 
                      ${isSelected ? 'bg-red-500 text-white' : 'text-black'}
                      ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSelected ? 'Selected' : isAdding ? 'Adding...' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
