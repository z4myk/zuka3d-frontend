import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../store/products/productSlice";
import { categorySlice } from "../store/categorys/categorySlice";
import {uiSlice} from "../store/UI/uiSlice";
import {authSlice} from '../store/auth/authSlice';
import {orderSlice} from '../store/orders/orderSlice';
import {paymentSlice} from '../store/payment/paymentSlice';
export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: {
    product: productSlice.reducer,
    category: categorySlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    order: orderSlice.reducer,
    payment: paymentSlice.reducer,
  }
}) 