import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "./../actions/itemsAction";

import "./../scss/SingleItem.scss";

import IncDec from "./IncDec";
import Error from "./../pages/Error";

const SingleItem = ({ match }) => {
  const dispatch = useDispatch();

  const singleItem = useSelector((state) => state.item);
  const { loading, err, item } = singleItem;

  useEffect(() => {
    dispatch(getItem(match.params.id));
  }, [dispatch, match.params.id]);

  const renderSingleItem = (item) => {
    if (!item) {
      return <Error message="Item not found" />;
    }
    return (
      <div className="single__item">
        <div className="single__left">
          <img
            className="single__img"
            src={`/images/idlyfarm/${item.coverImage}`}
            alt="single item"
          />
        </div>

        <div className="single__right">
          <div>
            <div className="heading-terinary">{item.name}</div>
          </div>
          <div>
            <div className="heading-terinary">Price: {item.price}</div>
          </div>

          <div className="heading-terinary">
            Average Rating: {item.averageRating}
          </div>
          <div>
            <div className="heading-terinary">
              Description: {item.description}
            </div>
          </div>
          <IncDec item={item} />
        </div>
        <div className="ratings-reviews">
          <div className="heading-secondary">Ratings and Reviews</div>
          <div></div>
          <div className="heading-tertiary">Add a review</div>

          <div className="box">
            <div className="form__group">
              <label htmlFor="rating">Rating</label>
              <select className="form__item" id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="review">Review</label>
              <textarea
                rows="4"
                columns="50"
                id="review"
                type="text"
                className="form__item"
              />
            </div>
            <div className="btn btn-orange btn-step1">Submit</div>
          </div>

          {/*  review box */}
          {item.reviews.map((r) => (
            <div className="review-box">
              <div className="review-img">
                <img
                  src={`images/users/${r.review.user.photo}`}
                  alt={r.review}
                />
              </div>
              <div className="user-name">{r.user.firstname}</div>
              <div className="item-review">{r.review}</div>
            </div>
          ))}

          <div className="mb">&nbsp;</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loader">&nbsp;</div>
      ) : err ? (
        <Error message={err} />
      ) : (
        renderSingleItem(item)
      )}
    </>
  );
};

export default SingleItem;
