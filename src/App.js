import React from "react";
import "./main.scss";
import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
