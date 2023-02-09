import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWish: [],
};

export const wishListSlice = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    handleWishList: (state, actions) => {
      const { title, id, image, price } = actions.payload;
      const existingProductIndexs = state.showWish.findIndex(
        (product) => product.id === id
      );
      if (existingProductIndexs === -1) {
        state.showWish = [
          ...state.showWish,
          {
            title: title,
            id: id,
            image: image,
            price: price,
          },
        ];
      }
    },
    removeCarts: (state, actions) => {
      const indexs = state.showWish.findIndex((item) => {
        return item.id === actions.payload;
      });
      state.showWish.splice(indexs, 1);
    },
  },
});
export const { handleWishList, removeCarts } = wishListSlice.actions;
export default wishListSlice.reducer;
