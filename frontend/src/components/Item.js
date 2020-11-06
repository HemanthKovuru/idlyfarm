import React from "react";
import IncDec from "./IncDec";
import { Link } from "react-router-dom";
import "./../scss/Item.scss";

const Item = ({ item }) => {
  return (
    <div className="item">
      <div className="item__img-box">
        {item.coverImage ? (
          <img
            className="item__img"
            src={`/images/idlyfarm/${item.coverImage}`}
            alt={item.name}
          />
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <div className="item__bottom">
        <Link to={`/items/${item._id}`}>
          <h4 className="item__heading">{item.name}</h4>
        </Link>
        <div className="item__detail">
          <div className="price">&#x20b9; {item.price}</div>
          <IncDec item={item} />
        </div>
      </div>
    </div>
  );
};

export default Item;
