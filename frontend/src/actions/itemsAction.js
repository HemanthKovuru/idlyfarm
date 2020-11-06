import axios from "axios";

// get all items
export const getItems = () => async (dispatch) => {
  try {
    dispatch({ type: "ITEMS_REQUEST" });
    // get data
    const { data } = await axios.get("/api/v1/items");
    dispatch({ type: "ITEMS_SUCCESS", payload: data.data.data.doc });
  } catch (err) {
    dispatch({
      type: "ITEMS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//  get single item
export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ITEM_REQUEST" });
    // get data
    const { data } = await axios.get(`/api/v1/items/${id}`);
    // console.log("data", data.data.doc);
    dispatch({ type: "ITEM_SUCCESS", payload: data.data.doc });
  } catch (err) {
    dispatch({
      type: "ITEM_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const searchQuery = (query) => {
  return {
    type: "SEARCH_QUERY",
    payload: query,
  };
};
