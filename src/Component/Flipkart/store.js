import { configureStore } from "@reduxjs/toolkit";
import cartValueSlice from "./cartValueSlice";
import wishListSlice from "./wishListSlice";

export const MyFlipkartReducerStore = configureStore({
  reducer: {
    updateCart: cartValueSlice,
    wishList: wishListSlice,
  },
});
