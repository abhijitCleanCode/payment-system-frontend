import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./state/authSlice";
import { apiCore } from "./api/apiCore";

export const store = configureStore({
  reducer: {
    [apiCore.reducerPath]: apiCore.reducer, // it gives us the ability to access data in redux
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiCore.middleware), // ensure api mgmt: hooks generation, caching and endpoint injection.
});
