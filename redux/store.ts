import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { authApi } from '@/redux/slices/Auth/authSlice';
import { appAppApi } from '@/redux/slices/allApp/allAppSlice';
import cartReducer from '@/redux/slices/cart/cartLocalStrogeSlice';
import { subscriptionApi } from '@/redux/slices/subscription/subscriptionSlice';
import { paymentApi } from '@/redux/slices/payment/paymentSlice';
import { cartApi } from './slices/cart/cartApiSlice';
import { assesmentApi } from './slices/assesment/assesmentSlice';
import { questionApi } from '@/redux/slices/questions/questionSlice';
import { categoryApi } from '@/redux/slices/category/categorySlice';
import { resultApi } from '@/redux/slices/result/resultSlice';

import globalReducer from '@/redux/slices/global/globalSlice';

// ✅ 1. Configure persist for global slice
const persistConfig = {
  key: 'global',
  storage,
  whitelist: ['assetId', 'assessmentId', 'categoryIds', 'stepInfo', 'resultData', 'questions'],
  // only these keys will be persisted
};

const persistedGlobalReducer = persistReducer(persistConfig, globalReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [appAppApi.reducerPath]: appAppApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [assesmentApi.reducerPath]: assesmentApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,

    global: persistedGlobalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore redux-persist actions to avoid warnings
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      authApi.middleware,
      appAppApi.middleware,
      subscriptionApi.middleware,
      cartApi.middleware,
      paymentApi.middleware,
      assesmentApi.middleware,
      questionApi.middleware,
      categoryApi.middleware,
      resultApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
