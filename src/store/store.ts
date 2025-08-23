import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "@/api/products/productsApi.ts";
import { newsApi } from "@/api/news/newsApi.ts";
import { eventsApi } from "@/api/events/eventsApi.ts";

let middlewareList = [
  productsApi.middleware,
  newsApi.middleware,
  eventsApi.middleware,
];

export const store = configureStore({
  reducer: {
    // products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareList),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
