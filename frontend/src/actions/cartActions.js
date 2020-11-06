import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// add and update cart
export const addUpdateCart = (type, item) => (dispatch, getState) => {
  dispatch({
    type,
    payload: item,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};

// shipping address
export const addDeliveryAddress = (data) => (dispatch, getState) => {
  dispatch({
    type: "SAVE_DELIVERY_ADDRESS",
    payload: data,
  });
  localStorage.setItem("deliveryAddress", JSON.stringify(data));
};

// checkout session action
export const checkoutSessionAction = () => async (dispatch) => {
  try {
    // get checkout sessio from api
    const placedOrderId = JSON.parse(localStorage.getItem("currentOrderId"));
    const session = await axios.get(
      `/api/v1/orders/checkout-session/${placedOrderId}`
    );

    // checkout form cahrge user
    const stripe = await loadStripe(
      "pk_test_51HjJTZJtodqx559CvFe3gDV400hwebHQGRj1lLrFpdsUGEVSmqM5oAePhos2NkPwhw2v7sBUORyvVtTRVRkMysxC00BkbzlU82"
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    alert(err.message);
    console.log(err.response);
  }
};
