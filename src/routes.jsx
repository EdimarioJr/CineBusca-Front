import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Movie from "./Pages/Movie";
import Watchlist from "./Pages/Watchlist";
import Login from './Pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/Movie/:id" component={Movie} />
        <Route path="/Watchlist/:id" component={Watchlist} />
        <Route path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
