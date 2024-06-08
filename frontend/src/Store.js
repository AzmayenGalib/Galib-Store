import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { productReducer } from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { productApi } from "./Api/productApi";
import { userApi } from "./Api/userApi";
import { orderApi } from "./Api/orderApi";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart:cartReducer,

    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
   .concat(
    productApi.middleware,
    userApi.middleware,
    orderApi.middleware,


    ),
});

/*  setupListeners(store.dispatch) */
export default store;
