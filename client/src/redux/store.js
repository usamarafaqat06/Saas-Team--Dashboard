import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiCalls/apiSlice";
import adminSlice from "./slice/adminSlice";
import AuthSlice from "./slice/AuthSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  adminSlice: adminSlice,
  AuthSlice: AuthSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
