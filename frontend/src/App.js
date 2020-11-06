import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Form from "./pages/Form";
import Error from "./pages/Error";
import SingleItem from "./components/SingleItem";

// scss
import "./scss/App.scss";

const App = () => {
  return (
    <main className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/items/:id" component={SingleItem} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/Profile" component={Profile} />
        <Route render={Error} />
      </Switch>
    </main>
  );
};

export default App;
