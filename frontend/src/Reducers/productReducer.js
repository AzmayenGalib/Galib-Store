import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  c: 6,
};

export const productReducer = createReducer(initialState, {
 /*  ALL_PRODUCT_REQUEST: (state, action) => {
    return {
      loading:  true,
      product: [],
    };
  },

  ALL_PRODUCT_SUCCESS: (state, action) => {
    return {
      loading: false,
      product: action.payload.products,
      productsCount: action.payload.productsCount,
    };
  },

  ALL_PRODUCT_FAIL: (state, action) => {
    return {
      loading: false,
      error: action.payload
 
      
    };
  },

    CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null

 
      
    };
  }, */

});
