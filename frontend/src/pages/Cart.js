import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./../components/CartItem";
import "./../scss/Cart.scss";

import {
  addDeliveryAddress,
  checkoutSessionAction,
} from "./../actions/cartActions";
import { createOrder } from "./../actions/orderActions";

const Cart = () => {
  // const localAddress = JSON.parse(localStorage.getItem("deliveryAddress"));

  // get addres from state
  const deliveryAddress = useSelector((state) => state.deliveryAddress);

  // delivery address
  const [city, setcity] = useState(deliveryAddress.city);
  const [address, setaddress] = useState(deliveryAddress.address);
  const [postalCode, setpostalCode] = useState(deliveryAddress.postalCode);
  const [country, setcountry] = useState(deliveryAddress.country);
  const [phoneNumber, setPhoneNumber] = useState(deliveryAddress.phoneNumber);
  const [step, setstep] = useState("step1");

  // dispatch delivery address
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      addDeliveryAddress({ city, address, postalCode, country, phoneNumber })
    );
    setstep("step2");
  };

  // items that are in the cart: cartitems
  const cartItems = useSelector((state) => state.cartItems);
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  // calculate total price
  let total = 0;
  cartItems.forEach((item) => {
    total = total + item.nofItems * item.price;
  });

  // create order

  const deliveryPrice = 0;

  let order = {
    deliveryAddress,
    orderItems: cartItems,
    deliveryPrice,
    totalPrice: Number(total + deliveryPrice),
  };

  // currently placed order
  const placeOrder = () => {
    dispatch(createOrder(order));
    setstep("step3");
    alert("Order placed successfully.");
  };

  // checkout session
  const handleCheckoutSession = () => {
    dispatch(checkoutSessionAction());
  };

  return (
    <div className="cart">
      <div className={cartItems.length <= 0 ? "bg1" : "cart__left"}>
        {cartItems.length > 0 && cartItems !== [] ? (
          cartItems.map((item) => <CartItem key={item._id} item={item} />)
        ) : (
          <div className="cart__placeholder">Your cart is Empty :(</div>
        )}

        <div className="mb">&nbsp;</div>
      </div>
      <div className={cartItems.length <= 0 ? "bg2" : "cart__right"}>
        {/* step1 */}
        {cartItems.length >= 1 && step === "step1" ? (
          <>
            <div className="heading-tertiary mb3">Delivery Details</div>
            <form onSubmit={handleSubmit}>
              {/*  city */}
              <div className="form__group">
                <label className="mb2" htmlFor="city">
                  Enter your city
                </label>
                <input
                  onChange={(evt) => setcity(evt.target.value)}
                  id="city"
                  type="text"
                  placeholder="Ex: Hyderabad"
                  className="form__item"
                  required
                  value={city}
                />
              </div>
              {/*  address */}
              <div className="form__group">
                <label className="mb2" htmlFor="address">
                  Address
                </label>
                <input
                  onChange={(evt) => setaddress(evt.target.value)}
                  id="address"
                  type="text"
                  placeholder="Ex: Street / House no / Flat no / Floor / Building"
                  className="form__item"
                  required
                  value={address}
                />
              </div>
              {/*  postal code */}
              <div className="form__group">
                <label className="mb2" htmlFor="code">
                  Postal Code
                </label>
                <input
                  onChange={(evt) => setpostalCode(evt.target.value)}
                  id="code"
                  type="number"
                  placeholder="Ex: 517501"
                  className="form__item"
                  required
                  value={postalCode}
                />
              </div>
              {/*  country */}
              <div className="form__group">
                <label className="mb2" htmlFor="country">
                  Country
                </label>
                <input
                  onChange={(evt) => setcountry(evt.target.value)}
                  id="country"
                  type="text"
                  placeholder="Ex: India"
                  className="form__item"
                  required
                  value={country}
                />
              </div>
              {/*  phone number */}
              <div className="form__group">
                <label className="mb2" htmlFor="number">
                  Phone Number
                </label>
                <input
                  onChange={(evt) => setPhoneNumber(evt.target.value)}
                  id="number"
                  type="number"
                  placeholder="Ex: 7634564646"
                  className="form__item"
                  required
                  value={phoneNumber}
                />
              </div>
              <div className="cart__total">
                <div>Total Items = {cartItems.length}</div>
                <div>Sub Total = {total}</div>
                <button type="submit" className="btn btn-green">
                  Continue
                </button>
              </div>
            </form>
          </>
        ) : (
          ""
        )}
        {/* end of step one */}

        {/* step2 */}
        {cartItems.length > 0 && step === "step2" && (
          <div className="step2">
            <div
              onClick={() => setstep("step1")}
              className="btn btn-orange btn-step1"
            >
              Back to Step-1
            </div>
            <div className="heading-tertiary">Delivery Address </div>
            <div className="cart__total">
              <div className="mb2">
                Address: {deliveryAddress.address}, {deliveryAddress.city},{" "}
                {deliveryAddress.postalCode}, {deliveryAddress.country}
              </div>
              <div className="mb2">
                Phone Number: {deliveryAddress.phoneNumber}
              </div>
              <div className="heading-tertiary">Order Items </div>
              {cartItems.map((item) => (
                <div className="cp mb2">
                  {item.name} &mdash; {item.nofItems} x {item.price} ={" "}
                  {item.price * item.nofItems}
                </div>
              ))}
              <div className="heading-tertiary">Order Summary </div>
              <div>Total Items = {cartItems.length}</div>
              <div>Sub Total = {total}</div>
              <div>Devivery charges = {deliveryPrice}</div>
              <div>Total = {order.totalPrice}</div>
              <button onClick={placeOrder} className="btn btn-green">
                Place Order
              </button>
            </div>
          </div>
        )}
        {/* end of step 2 */}

        {/* step3 */}
        {cartItems.length > 0 && step === "step3" && (
          <>
            <div className="btn btn-green btn-step2">
              Order placed Successfully.
            </div>
            <div></div>
            <button onClick={handleCheckoutSession} className="btn btn-orange">
              Proceed to checkout
            </button>
          </>
        )}
        {/* end of step 3 */}
      </div>
    </div>
  );
};

export default Cart;
