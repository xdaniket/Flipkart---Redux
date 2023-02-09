import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartValue: 0,
  addCartList: [],
  totalAmount: 0,
};
const cartValSlice = createSlice({
  name: "Flipkart",
  initialState,
  reducers: {
    incrementCartVal: (state, actions) => {
      const { title, price, id, image, showMsg } = actions.payload;
      const existingProductIndex = state.addCartList.findIndex(
        (product) => product.productId === id
      );

      if (existingProductIndex === -1) {
        state.cartValue += 1;
        state.totalAmount += price;
        state.addCartList = [
          ...state.addCartList,
          {
            productName: title,
            productPrice: price,
            productId: id,
            image: image,
            quantity: 1,
            showMsg: "",
          },
        ];
      } else if (existingProductIndex !== -1) {
        {
          state.addCartList.map((nxtItems) => {
            if (nxtItems.productId === id) {
              nxtItems.showMsg = "This product is already added in your cart";
            }
          });
        }
      }
    },
    handleClearCart: (state) => {
      state.addCartList = [];
      state.cartValue = 0;
      state.totalAmount = 0;
    },
    removeCart: (state, actions) => {
      const { id, price, quantity } = actions.payload;

      const indexs = state.addCartList.findIndex((item) => {
        return item.productId === id;
      });
      state.addCartList.splice(indexs, 1);

      state.totalAmount =
        state.totalAmount - quantity * Number(Math.floor(price));
      state.cartValue -= 1;
    },
    incrementQuantity: (state, actions) => {
      const { prices, id } = actions.payload;

      {
        state.addCartList.map((items) => {
          if (items.productId === id) {
            items.quantity += 1;
          }
        });
      }

      state.totalAmount += Number(Math.floor(prices));
    },
    decrementQuantity: (state, actions) => {
      const { prices, id } = actions.payload;

      {
        state.addCartList.map((itemms) => {
          if (itemms.productId === id && itemms.quantity !== 1) {
            itemms.quantity -= 1;
            state.totalAmount -= Number(Math.round(prices));
          } else {
            itemms.quantity === 1;
            state.totalAmount = Number(Math.round(state.totalAmount));
          }
        });
      }
    },
  },
});

export const {
  incrementCartVal,
  handleClearCart,
  incrementQuantity,
  decrementQuantity,
  removeCart,
} = cartValSlice.actions;

export default cartValSlice.reducer;
