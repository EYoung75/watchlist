import React from "react";
import "./main.scss";
import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import { Route, Switch } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import MovieDetails from "./pages/movieDetails.jsx"

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/movie/:id" component={MovieDetails}/>
      </Switch>
    </div>
  );
}

export default App;
