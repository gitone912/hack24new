import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from '../services/userAuthApi';
import { productApi } from '../services/productServiceApi';
import authSlice from '../features/authSlice';
import { cartApi } from '../services/courseServiceApi';
import { userAccountApi } from '../services/userAccountApi';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer, 
    [cartApi.reducerPath]: cartApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAuthApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(userAccountApi.middleware)
});

setupListeners(store.dispatch);
