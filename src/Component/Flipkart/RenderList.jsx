import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementQuantity,
  handleClearCart,
  incrementCartVal,
  incrementQuantity,
  removeCart,
} from "./cartValueSlice";
import { handleWishList } from "./wishListSlice";

const RenderList = () => {
  const [list, setList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const { cartValue, addCartList, totalAmount } = useSelector(
    (state) => state.updateCart
  );

  const myDispatchHandleCart = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  const handleWish = (title, id, image, price) => {
    myDispatchHandleCart(
      handleWishList({ title: title, id: id, image: image, price: price })
    );
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            position: "relative",
            top: "25px",
            left: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 11,
              marginLeft: 800,
              marginBottom: 29,
            }}
          >
            <Link to="wishlist">
              <button>WishList</button>
            </Link>

            <button>Cart : {cartValue}</button>
            <button>Amt : {totalAmount}</button>
            {addCartList.length > 0 ? (
              <button onClick={() => myDispatchHandleCart(handleClearCart())}>
                Clear Cart
              </button>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div>
            {list.map((item) => {
              return (
                <ul
                  style={{
                    marginLeft: "54px",
                    background: "olive",
                    borderRadius: "12px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    width: "650px",
                    border: "1px solid white",
                  }}
                >
                  <div>
                    <img width={110} src={item.image} alt="" />
                    <li style={{ marginBottom: "7px", marginTop: "7px" }}>
                      Rs : {item.price}
                    </li>
                    <li>{item.title}</li>
                    <div style={{ display: "flex", gap: 36 }}>
                      <div>
                        <button
                          style={{ marginTop: "12px" }}
                          onClick={() =>
                            myDispatchHandleCart(
                              incrementCartVal({
                                title: item.title,
                                price: item.price,
                                id: item.id,
                                image: item.image,
                                showMsg: "",
                              })
                            )
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div style={{ position: "relative", top: 18 }}>
                        <svg
                          onClick={() =>
                            handleWish(
                              item.title,
                              item.id,
                              item.image,
                              item.price
                            )
                          }
                          height="24"
                          fill="black"
                          cursor="pointer"
                          style={
                            selectedIds.includes(item.id)
                              ? { backgroundColor: "red" }
                              : { backgroundColor: "white" }
                          }
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      </div>
                    </div>
                    {addCartList.map((cartItem) => {
                      if (cartItem.productId === item.id) {
                        return (
                          <h4
                            style={{
                              color: "black",
                              marginBottom: -16,
                              position: "relative",
                              top: -8,
                            }}
                          >
                            {cartItem.showMsg}
                          </h4>
                        );
                      }
                    })}
                  </div>
                </ul>
              );
            })}
          </div>
          <div>
            {addCartList.map((items) => {
              return (
                <div
                  style={{
                    marginLeft: "70px",
                    marginTop: "16px",
                    background: "darkolivegreen",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid white",
                  }}
                >
                  <p>Name :{items.productName}</p>
                  <p> Price :{items.productPrice}</p>
                  <img
                    style={{ width: "80px", marginRight: "18px" }}
                    src={items.image}
                    alt=""
                  />
                  <button
                    onClick={() =>
                      myDispatchHandleCart(
                        incrementQuantity({
                          prices: items.productPrice,
                          id: items.productId,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button style={{ marginLeft: "4px", marginRight: "4px" }}>
                    {items.quantity}
                  </button>
                  <button
                    onClick={() =>
                      myDispatchHandleCart(
                        decrementQuantity({
                          prices: items.productPrice,
                          id: items.productId,
                        })
                      )
                    }
                  >
                    -
                  </button>

                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() =>
                      myDispatchHandleCart(
                        removeCart({
                          id: items.productId,
                          price: items.productPrice,
                          quantity: items.quantity,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default RenderList;
