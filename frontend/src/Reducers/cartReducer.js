import { createReducer } from "@reduxjs/toolkit";
import { useGetStripeApiKeyQuery } from "../Api/orderApi";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
    stripeApiKey:"", 
};

export const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cartItems.find((i) => i.product === item.product);
    if (isItemExist) {
      state.cartItems = state.cartItems.map(
        (i) => (i.product === isItemExist.product ? item : i)
        /* akhane zodi isItemExist.product === i.product 
            hoy tale state.cartItems a item assign hobe
            ar na hole i assig hobe  */
        /* akhane amra just cart a kono product age thaka
             exist korle setak new product diye replace kore dilam */
      );
    } else {
      state.cartItems = [...state.cartItems, item];
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    /* akhane zodi local storage a save na kori tale refresh dilai
    sob remove hoye zabbe tai refresh dilau zano  remove na hoy
    azonno local storage a save korsi */
  },

  REMOVE_CART_ITEM: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (i) => i.product !== action.payload
    );
  },

  SAVE_SHIPPING_INFO: (state, action) => {
    state.shippingInfo = action.payload;
    localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
  },

  STRIPEAPIKEY: (state, action) => {
    const { isLoading, isError, isSuccess, data, error } =
      useGetStripeApiKeyQuery();
    state.stripeApiKey = data.stripeApiKey;
  },
});
