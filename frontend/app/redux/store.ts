// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // slices to persist
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     auth: authReducer,
//   })
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
