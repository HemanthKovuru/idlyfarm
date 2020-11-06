import React from "react";
import "./../scss/IncDec.scss";

import { addUpdateCart } from "./../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const IncDec = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const handleClick = () => {
    dispatch(addUpdateCart("ADD_ITEM_TO_CART", item));
  };

  const increment = () => {
    dispatch(addUpdateCart("INCREMENT_ITEM_IN_CART", item));
  };

  const decrement = () => {
    dispatch(addUpdateCart("DECREMENT_ITEM_IN_CART", item));
  };

  let cartItem = cartItems.find((cart) => {
    if (cart._id === item._id) return true;
    return false;
  });

  return (
    <>
      {!cartItem ? (
        <button onClick={handleClick} className="btn-add">
          Add
        </button>
      ) : (
        <div className="item-add">
          <div onClick={decrement} className="minus">
            -
          </div>
          <div className="count">{cartItem.nofItems}</div>
          <div onClick={increment} className="plus">
            +
          </div>
        </div>
      )}
    </>
  );
};

export default IncDec;
