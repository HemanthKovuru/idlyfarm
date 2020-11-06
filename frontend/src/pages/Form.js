import React, { useState } from "react";
import "./../scss/Form.scss";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./../actions/userActions";

const Form = () => {
  // for login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for signup state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [spasswprd, ssetPasswprd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, err } = userLogin;

  // requesting and dispatching login
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  // reqesting and dispatching signup
  const handleSignUp = (evt) => {
    evt.preventDefault();
    dispatch(
      signup(firstname, lastname, emailAddress, spasswprd, confirmPassword)
    );
  };

  return (
    <div className="form-auth">
      <div className="form__left">
        {/* signup */}
        {userSignup.err ? <div className="message">{userSignup.err}</div> : ""}
        <form onSubmit={handleSignUp} className="form__signup">
          <div className="heading-tertiary">Sign Up</div>
          <div className="form__group custom-1">
            <input
              onChange={(evt) => setFirstname(evt.target.value)}
              type="text"
              placeholder="First Name"
              className="form__item"
            />
          </div>
          <div className="form__group custom-2">
            <input
              onChange={(evt) => setLastname(evt.target.value)}
              type="text"
              placeholder="Last Name"
              className="form__item"
            />
          </div>
          <div className="form__group">
            <input
              onChange={(evt) => setEmailAddress(evt.target.value)}
              type="email"
              placeholder="Email Address"
              className="form__item"
            />
          </div>
          <div className="form__group">
            <input
              onChange={(evt) => ssetPasswprd(evt.target.value)}
              type="password"
              placeholder="Password"
              className="form__item"
            />
          </div>
          <div className="form__group">
            <input
              onChange={(evt) => setConfirmPassword(evt.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="form__item"
            />
          </div>
          <button className="btn-white">
            {userSignup.loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* signin */}

      <div className="form__right">
        <form onSubmit={handleSubmit} className="form__signin">
          {err ? <div className="message">{err}</div> : ""}
          <div className="form__signup">
            <div className="heading-tertiary">Sign In</div>

            <div className="form__group">
              <input
                onChange={(evt) => setEmail(evt.target.value)}
                type="email"
                placeholder="Email Address"
                className="form__item"
              />
            </div>
            <div className="form__group">
              <input
                onChange={(evt) => setPassword(evt.target.value)}
                type="password"
                placeholder="Password"
                className="form__item"
              />
            </div>
            <button className="btn-white">
              {loading ? "loading..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
