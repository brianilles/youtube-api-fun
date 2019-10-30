import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// VIEWS
import Home from "../views/Home.js";
import Trending from "../views/Trending.js";
import Signup from "../views/Signup.js";
import Login from "../views/Login.js";

// COMPONENTS
import Navigation from "../components/Navigation.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/trending" component={Trending} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
