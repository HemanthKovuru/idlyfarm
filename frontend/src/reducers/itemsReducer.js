export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "ITEMS_REQUEST":
      return { loading: true, items: state };
    case "ITEMS_SUCCESS":
      return { loading: false, items: action.payload };
    case "ITEMS_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case "ITEM_REQUEST":
      return { loading: true, item: state };
    case "ITEM_SUCCESS":
      return { loading: false, item: action.payload };
    case "ITEM_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return action.payload;
    default:
      return state;
  }
};
