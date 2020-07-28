import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Movie from "./Pages/Movie";
import Watchlist from "./Pages/Watchlist";
import Login from "./Pages/Login";
import Reviews from "./Pages/Reviews";
import Search from "./Pages/Search";
import auth from "./services/auth";

// Preventing the unlogged user from accessing the route directly from the browser url
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/Movie/:id" component={Movie} />
        <PrivateRoute path="/watchlist" component={Watchlist} />
        <PrivateRoute path="/reviews" component={Reviews} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
