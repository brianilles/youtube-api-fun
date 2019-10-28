import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home.js";
import Navigation from "./components/Navigation.js";
import "./sass/reset.scss";

function App() {
  return (
    <Router>
      <div className="main">
        <Navigation />
        <Route path="/">
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
