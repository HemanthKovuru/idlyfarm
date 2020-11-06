import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    // get data
    const { data } = await axios.post(
      "/api/v1/users/signin",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // dispatch
    dispatch({ type: "LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userinfo", JSON.stringify(data));

    if (data.status === "success") {
      window.location.replace("/");
    }
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: "LOGIN_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/users/signout");

    if (data.status === "success") {
      localStorage.removeItem("userinfo");
      alert(data.message);
      window.location.reload();
    }
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export const signup = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNUP_REQUEST" });
    // get data
    const { data } = await axios.post(
      "/api/v1/users/signup",
      { firstname, lastname, email, password, confirmPassword },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    // dispatch
    dispatch({ type: "SIGNUP_SUCCESS", payload: data });

    localStorage.setItem("userinfo", JSON.stringify(data));

    if (data.status === "success") {
      window.location.replace("/");
    }
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: "SIGNUP_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updatemeAction = (type, profiledata) => async (dispatch) => {
  try {
    if (type === "updateme") {
      const { data } = await axios.patch("/api/v1/users/updateme", profiledata);
      if (data.status === "success")
        localStorage.setItem("userinfo", JSON.stringify(data));
      alert("updated settings");
    } else if (type === "updatemypassword") {
      await axios.patch("/api/v1/users/updatemypassword", profiledata);
      alert("password updated successfully");
      localStorage.removeItem("userinfo");
      window.location.reload();
    }
  } catch (err) {
    alert(err.response.data.message);
    console.log(err.response.data);
  }
};
