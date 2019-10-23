import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home.js";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/">
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
