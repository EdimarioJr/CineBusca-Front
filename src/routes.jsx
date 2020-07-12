import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Movie from "./Pages/Movie";
import Watchlist from "./Pages/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/Movie/:id" component={Movie} />
      <Route path="/Watchlist/:id" component={Watchlist} />
    </BrowserRouter>
  );
};

export default App;
