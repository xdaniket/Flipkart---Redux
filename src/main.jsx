import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from "react-redux";
import { MyFlipkartReducerStore } from "./Component/Flipkart/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RenderList from "./Component/Flipkart/RenderList";
import WishList from "./Component/Flipkart/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderList />,
  },
  {
    path: "wishlist",
    element: <WishList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={MyFlipkartReducerStore}>
    <RouterProvider router={router}>
      <RenderList />
    </RouterProvider>
  </Provider>
);
