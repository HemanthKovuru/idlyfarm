import React from "react";
import { Link } from "react-router-dom";
import Logo from "./../images/logo.png";
import "./../scss/Navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchQuery } from "./../actions/itemsAction";
import { logout } from "./../actions/userActions";

import HomeLogo from "./../images/PNG/home.png";
import CartLogo from "./../images/PNG/cart.png";
import UserLogo from "./../images/PNG/user.png";
import ExitLogo from "./../images/PNG/exit.png";

const Navbar = (props) => {
  const cartItems = useSelector((state) => state.cartItems);
  const { location } = props;
  const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.userLogin);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));

  // search query
  const handleChange = (evt) => {
    dispatch(searchQuery(evt.target.value));
  };

  // search query
  const handleClick = () => {
    dispatch(searchQuery(""));
  };

  // logot action dispatch
  const handleLogout = () => {
    dispatch(logout());
  };

  const checkUser = () => {
    alert("Please login to get access to cart");
  };

  if (!userinfo || userinfo === [] || userinfo === null) {
    if (location.pathname === "/profile" || location.pathname === "/cart") {
      window.location.replace("/");
    }
  }

  return (
    <nav className="navbar">
      {/* navbar logo / brand */}
      <Link to="/" className="brand">
        <img
          onClick={handleClick}
          className="brand-logo"
          src={Logo}
          alt="company logo"
        />
      </Link>
      {/* search box */}
      {location.pathname === "/" ? (
        <input
          onChange={handleChange}
          type="text"
          className="search"
          placeholder="Search for your favourite breakfast"
        />
      ) : (
        <div></div>
      )}
      {/* navbar links */}

      {!userinfo || userinfo.length > 0 || userinfo === [] ? (
        <div className="navbar-links">
          <Link to="/form">Sign in</Link>
          <Link onClick={checkUser} to="/form">
            Cart <span className="store">{cartItems.length}</span>{" "}
          </Link>
        </div>
      ) : (
        <div className="navbar-links nav-log">
          <Link className="profile-box" to="/">
            <img
              className="profile-photo"
              src={`/images/users/${
                userinfo === [] ? "default.jpg" : userinfo.data.user.photo
              }`}
              alt="p"
            />
          </Link>
          <div className="dropdown-box" to="">
            <span className="name">
              {userinfo.data.user.firstname.slice(0, 8)}{" "}
              <span className="down">&nbsp;</span>
            </span>

            <div className="dropdown">
              <Link className="icon" to="/">
                <img className="icon-small" src={HomeLogo} alt="home logo" />
                <div>Home</div>
              </Link>
              <Link className="icon" to="/profile">
                <img className="icon-small" src={UserLogo} alt="profile logo" />
                <div>Profile</div>
              </Link>
              <Link className="icon" to="/cart">
                <img className="icon-small" src={CartLogo} alt="cart logo" />
                <div>
                  Cart <span className="store">{cartItems.length}</span>
                </div>
              </Link>
              <Link className="icon" to="/">
                <img className="icon-small" src={ExitLogo} alt="user logo" />
                <div onClick={handleLogout}>Sign Out</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
