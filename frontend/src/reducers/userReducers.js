//  signin reducer
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true };
    case "LOGIN_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, err: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

// signup reducer
export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return { loading: true };
    case "SIGNUP_SUCCESS":
      return { loading: false, userinfo: action.payload };
    case "SIGNUP_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

// logout

export const signoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGNOUT_REQUEST":
      return { loading: true };
    case "SIGNOUT_SUCCESS":
      if (action.payload.userinfo.status === "success") {
        alert(action.payload.userinfo.message);
        localStorage.removeItem("userinfo");
      }
      return { loading: false, userinfo: action.payload };
    case "SIGNOUT_FAIL":
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
