import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <NavLink exact to="/" activeClassName="active-nav">
          Home
        </NavLink>
        <NavLink exact to="/login" activeClassName="active-nav">
          Login
        </NavLink>
        <NavLink exact to="/signup" activeClassName="active-nav">
          Signup
        </NavLink>
      </div>
    </div>
  );
}
