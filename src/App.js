import React from "react";
import "./main.scss";
import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="home__container">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
