import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import {
  itemsReducer,
  itemReducer,
  searchReducer,
} from "./reducers/itemsReducer";
import { cartReducer, deliveryAddressReducer } from "./reducers/cartReducer";
import {
  loginReducer,
  signoutReducer,
  signupReducer,
} from "./reducers/userReducers";
import {
  getOrderReducer,
  getOrdersHistoryReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const reducers = combineReducers({
  items: itemsReducer,
  item: itemReducer,
  cartItems: cartReducer,
  search: searchReducer,
  userLogin: loginReducer,
  userSignup: signupReducer,
  deliveryAddress: deliveryAddressReducer,
  placedOrders: getOrderReducer,
  ordersHistory: getOrdersHistoryReducer,
  orderPay: orderPayReducer,
  signout: signoutReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// const userinfoFromStorage = localStorage.getItem("userinfo")
//   ? JSON.parse(localStorage.getItem("userinfo"))
//   : null;

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};
const placedOrdersFromStorage = localStorage.getItem("placedOrder")
  ? JSON.parse(localStorage.getItem("placedOrder"))
  : [];

const initailState = {
  cartItems: cartItemsFromStorage,
  // userinfo: userinfoFromStorage,
  deliveryAddress: deliveryAddressFromStorage,
  placedOrders: placedOrdersFromStorage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initailState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
