export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { loading: false, order: action.payload };
    case "ORDER_CREATE_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_GET_REQUEST":
      return { loading: true };
    case "ORDER_GET_SUCCESS":
      return { loading: false, order: action.payload };
    case "ORDER_GET_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const getOrdersHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDERS_HISTORY_REQUEST":
      return { loading: true };
    case "ORDERS_HISTORY_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDERS_HISTORY_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { loading: true };
    case "ORDER_PAY_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PAY_FAIL":
      return { loading: false, err: action.payload };
    case "ORDER_PAY_RESET":
      return {};
    default:
      return state;
  }
};
