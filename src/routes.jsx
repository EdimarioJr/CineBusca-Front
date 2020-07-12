import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MovieDetail from "./Pages/MovieDetail";
import Watchlist from "./Pages/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/MovieDetail/:id" component={MovieDetail} />
      <Route path="/Watchlist/:id" component={Watchlist} />
    </BrowserRouter>
  );
};

export default App;
