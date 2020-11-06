import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    order.user = userinfo.data.user._id;

    const { data } = await axios.post("/api/v1/orders", order);
    localStorage.setItem("currentOrderId", JSON.stringify(data.data.doc._id));

    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data.data.doc });
  } catch (err) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_GET_REQUEST" });

    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { data } = await axios.get(
      `/api/v1/orders?$user=${user.data.user._id}&isPaid=true&isDelivered=false`
    );
    localStorage.setItem("placedOrders", JSON.stringify(data.data.data.doc));

    dispatch({ type: "ORDER_GET_SUCCESS", payload: data.data.doc });
  } catch (err) {
    dispatch({
      type: "ORDER_GET_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrdersHistory = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDERS_HISTORY_REQUEST" });

    const userinfo = JSON.parse(localStorage.getItem("userinfo"));

    const { data } = await axios.get(
      `/api/v1/orders?user=${userinfo.data.user._id}&isPaid=true&isDelivered=true`
    );

    dispatch({ type: "ORDERS_HISTORY_SUCCESS", payload: data.data.data.doc });
  } catch (err) {
    alert(err.response.data.message);
    dispatch({
      type: "ORDERS_HISTORY_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
