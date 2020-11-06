export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return [...state, { ...action.payload, nofItems: 1 }];

    case "INCREMENT_ITEM_IN_CART":
      let cartItems = state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, nofItems: 1 + item.nofItems };
        } else {
          return item;
        }
      });
      return cartItems;
    case "DECREMENT_ITEM_IN_CART":
      let newState = state
        .map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, nofItems: item.nofItems - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.nofItems > 0);
      if (newState.length <= 0 || newState === []) {
        localStorage.removeItem("orderItems");
      }
      return newState;
    default:
      return state;
  }
};

export const deliveryAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_DELIVERY_ADDRESS":
      return action.payload;
    default:
      return state;
  }
};
