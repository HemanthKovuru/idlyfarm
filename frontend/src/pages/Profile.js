import React, { useState } from "react";
import "./../scss/Profile.scss";

import Cog from "./../images/PNG/cog.png";
import HistoryLogo from "./../images/PNG/history.png";
import OrderLogo from "./../images/PNG/spoon-knife.png";
import StarLogo from "./../images/PNG/star-full.png";

import { getOrderDetails, getOrdersHistory } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { updatemeAction } from "../actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();

  // view for changing the settings orders history and reviews
  const [view, updateView] = useState("settings");

  // update user settings firstname lastname email photo
  const handleUpdateMe = (evt) => {
    evt.preventDefault();
    let form = new FormData();
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let photo = document.getElementById("photo").files[0];
    if (firstname) {
      form.append("firstname", firstname);
    }
    if (lastname) {
      form.append("lastname", lastname);
    }
    if (email) {
      form.append("email", email);
    }
    if (photo) {
      form.append("photo", photo);
    }
    dispatch(updatemeAction("updateme", form));
  };

  // updatemypassword  function
  const updateMyPassword = (evt) => {
    evt.preventDefault();

    const currentPassword = document.getElementById("currentpassword").value;
    const password = document.getElementById("newpassword").value;
    const confirmPassword = document.getElementById("confirmnewpassword").value;
    dispatch(
      updatemeAction("updatemypassword", {
        currentPassword,
        password,
        confirmPassword,
      })
    );
  };

  // userinfo
  let userinfo = JSON.parse(localStorage.getItem("userinfo"));

  // get orders history
  const ordersHistoryDisplay = useSelector((state) => state.ordersHistory);
  const { orders } = ordersHistoryDisplay;

  // update view handler
  const handleClick = (evt) => {
    updateView(evt.target.className);
  };

  // get placed order
  const placedOrders = JSON.parse(localStorage.getItem("placedOrders"));

  // get Order details for order page
  const handleClickForOrder = (evt) => {
    updateView(evt.target.className);
    dispatch(getOrderDetails());
  };

  // get orders history
  const ordersHistory = (evt) => {
    updateView(evt.target.className);
    dispatch(getOrdersHistory());
  };

  // render screens handler
  const renderProfileSettings = () => {
    if (view === "settings") {
      return (
        <div className="settings">
          <h2 className="heading-secondary">Account Settings</h2>
          {/* profile update settings */}
          <div className="form">
            <div className="image__box">
              <img
                className="image__box-img"
                src={`/images/users/${userinfo && userinfo.data.user.photo}`}
                alt="user"
              />
            </div>
            <input
              style={{ display: "none" }}
              name="photo"
              accept="image/*"
              type="file"
              id="photo"
            />
            <label className="upload" htmlFor="photo">
              Update Profile Photo
            </label>

            {/* form group */}
            <div className="mg-1 form__group">
              <label htmlFor="firstname">FirstName</label>
              <input
                id="firstname"
                className="form__item"
                type="text"
                name="firstname"
                placeholder={`${userinfo.data.user.firstname}`}
              />
            </div>

            {/* form group */}
            <div className="form__group">
              <label htmlFor="lastname">LastName</label>
              <input
                id="lastname"
                className="form__item"
                type="text"
                name="lastname"
                placeholder={`${userinfo.data.user.lastname}`}
              />
            </div>
            {/* form group */}
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form__item"
                type="text"
                name="email"
                placeholder={`${userinfo.data.user.email}`}
              />
            </div>
            <button
              type="submit"
              onClick={handleUpdateMe}
              className="btn btn-orange"
            >
              Update Settings
            </button>
            <div className="border">&nbsp;</div>
          </div>

          {/* profile password change */}
          <h2 className="heading-secondary">Change Password</h2>
          <div className="form">
            {/* form group */}
            <div className="mg-1 form__group">
              <label htmlFor="currentpassword">Current Password</label>
              <input
                id="currentpassword"
                className="form__item"
                type="password"
                name="currentpassword"
                placeholder="current password"
                required
              />
            </div>
            {/* form group */}
            <div className="form__group">
              <label htmlFor="newpassword">New Password</label>
              <input
                id="newpassword"
                className="form__item"
                type="password"
                name="newpassword"
                placeholder="new password"
                required
              />
            </div>
            {/* form group */}
            <div className="form__group">
              <label htmlFor="confirmnewpassword">Confirm New Password</label>
              <input
                id="confirmnewpassword"
                className="form__item"
                type="password"
                name="confirmnewpassword"
                placeholder="confirm new password"
                required
              />
            </div>
            <button onClick={updateMyPassword} className="btn btn-orange">
              Update Password
            </button>
          </div>
        </div>
      );
    } else if (view === "history") {
      return (
        <div className="history">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div className="history-items">
                <div>OrderId: {order._id}</div>
                <div>totalPrice: {order.totalPrice}</div>
                <div>Paid: {order.isPaid ? "Paid" : "Not Paid"}</div>
                <div>
                  Delivered: {order.isDelivered ? "Delivered" : "Not Delivered"}
                </div>
                <div>{order.createdAt}</div>
              </div>
            ))
          ) : (
            <div>No Orders History</div>
          )}
        </div>
      );
    } else if (view === "orders") {
      return (
        <>
          {placedOrders && placedOrders.length > 0 ? (
            placedOrders.map((placedOrder) => (
              <div>
                <div className="order-box">
                  <div className="order-heading">
                    OrderId: {placedOrder._id}
                  </div>
                  <div className="order-heading">Delivery Address</div>
                  <div className="cart__total">
                    <div className="mb2">
                      Address: {placedOrder.deliveryAddress.address},{" "}
                      {placedOrder.deliveryAddress.city},{" "}
                      {placedOrder.deliveryAddress.postalCode},{" "}
                      {placedOrder.deliveryAddress.country}
                    </div>
                    <div className="mb2">
                      Phone Number: {placedOrder.deliveryAddress.phoneNumber}
                    </div>
                    <div>
                      {placedOrder.deliveryAddress.isDelivered ? (
                        <div className="order-success"> Delivered</div>
                      ) : (
                        <div className="order-fail">Not Delivered</div>
                      )}
                    </div>
                    <div className="order-heading">Order Items </div>
                    {placedOrder.orderItems.map((item) => (
                      <div key={item._id} className="cp mb2">
                        {item.name} &mdash; {item.nofItems} x {item.price} ={" "}
                        {item.price * item.nofItems}
                      </div>
                    ))}
                    <div className="order-heading">Order Summary </div>
                    <div>Total Items = {placedOrder.orderItems.length}</div>
                    <div>Sub Total = {placedOrder.totalPrice}</div>
                    <div>Devivery charges = {placedOrder.deliveryPrice}</div>
                    <div>
                      Total ={" "}
                      {placedOrder.totalPrice + placedOrder.deliveryPrice}
                    </div>
                    <div>
                      {placedOrder.isPaid ? (
                        <div className="order-success">Paid</div>
                      ) : (
                        <div className="order-fail">Not Paid</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Orders</div>
          )}
        </>
      );
    } else if (view === "reviews") {
      return <div className="reviews">No reviews</div>;
    }
  };

  return (
    <div className="profile__container">
      <div className="profile__left">
        <div className="profile__item settings">
          <img className="profile__item-img" src={Cog} alt="settings logo" />
          <div onClick={handleClick} className="settings">
            settings
          </div>
        </div>
        <div className="profile__item history">
          <img
            className="profile__item-img"
            src={HistoryLogo}
            alt="History logo"
          />
          <div onClick={ordersHistory} className="history">
            Orders History
          </div>
        </div>
        <div className="profile__item orders">
          <img className="profile__item-img" src={OrderLogo} alt="order logo" />
          <div onClick={handleClickForOrder} className="orders">
            Orders{" "}
            <span className="store">
              {placedOrders ? placedOrders.length : 0}
            </span>
          </div>
        </div>
        <div className="profile__item reviews">
          <img className="profile__item-img" src={StarLogo} alt="star logo" />
          <div onClick={handleClick} className="reviews">
            Your Reviews
          </div>
        </div>
      </div>
      <div className="profile__right">
        {renderProfileSettings()}
        <div className="mb">&nbsp;</div>
      </div>
    </div>
  );
};

export default Profile;
