import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Movie from "./Pages/Movie";
import Watchlist from "./Pages/Watchlist";
import Login from "./Pages/Login";
import Search from './Pages/Search'
import auth from "./services/auth";

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
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
