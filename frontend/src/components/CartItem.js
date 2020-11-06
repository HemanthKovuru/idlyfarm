import React from "react";

import IncDec from "./IncDec";
import "./../scss/CartItem.scss";

const CartItem = ({ item }) => {
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  return (
    <div className="box__container">
      <div className="box__image-box">
        <img
          className="box__img"
          src={`/images/idlyfarm/${item.coverImage}`}
          alt={item.name}
        />
        {/* <div className="loader"></div> */}
      </div>
      <div className="box__right">
        <div className="box__title">{item.name}</div>
        <IncDec key={item._id} item={item} />
        <div className="box__math">
          {item.nofItems} x {item.price}
        </div>
        <div className="box__total">
          Item Total = {item.nofItems * item.price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
