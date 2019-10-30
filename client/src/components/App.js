import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// VIEWS
import Home from "../views/Home.js";

// COMPONENTS
import Navigation from "../components/Navigation.js";

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
