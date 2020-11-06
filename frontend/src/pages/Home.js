import React, { useEffect } from "react";
import Item from "./../components/Item";
import "./../scss/Home.scss";

import Error from "./Error";

import { useDispatch, useSelector } from "react-redux";
import { getItems, searchQuery } from "./../actions/itemsAction";

const Home = () => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state) => state.items);
  const search = useSelector((state) => state.search);
  const { items, loading, err } = itemsList;

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleClick = (evt) => {
    const type = evt.target.className.split(" ")[1];
    dispatch(searchQuery(type));
  };

  const renderItems = () => {
    if (items && items.length >= 1) {
      let filterItems = [...items];

      filterItems = filterItems.filter((item) => {
        if (item.name.includes(search)) return item;
        return "";
      });

      if (
        search === "general" ||
        search === "special" ||
        search === "favourite" ||
        search === "rice"
      ) {
        filterItems = items.filter((item) => item.type === search);
      }

      if (items.length === 0)
        return <div className="search-result">No Results Found : (</div>;
      return filterItems.map((item) => <Item key={item.name} item={item} />);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : err ? (
        <Error message={err} />
      ) : (
        <div className="container">
          <ul className="container__left">
            <li
              onClick={handleClick}
              className={`container__item general ${
                search === "general" ? "active" : ""
              }`}
            >
              General
            </li>
            <li
              onClick={handleClick}
              className={`container__item special ${
                search === "special" ? "active" : ""
              }`}
            >
              Special Idly's
            </li>
            <li
              onClick={handleClick}
              className={`container__item favourite ${
                search === "favourite" ? "active" : ""
              }`}
            >
              Favourite Dosas
            </li>
            <li
              onClick={handleClick}
              className={`container__item rice ${
                search === "rice" ? "active" : ""
              }`}
            >
              Breakfast Rice
            </li>
          </ul>
          <div className="container__right">
            <div className="container__right-items">{renderItems()}</div>
            <div className="mb">&nbsp;</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
