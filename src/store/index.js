import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cart from "./cart";
import productReducer from "./product";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    cart,
    category: {},
    products: productReducer,
    ui: {},
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export * from "./product";
export * from "./user";
