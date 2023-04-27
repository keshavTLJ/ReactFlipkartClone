import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/products/productSlice";
import cartReducer from "../reducers/cart/cartSlice";
import wishlistReducer from "../reducers/wishlist/wishlistSlice";
import authReducer from "../reducers/auth/authSlice"
import loadingReducer from "../reducers/loadingSlice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      products: productReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      loading: loadingReducer
    }
  });