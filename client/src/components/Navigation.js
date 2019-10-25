import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navigation">
      <NavLink exact to="/" activeClassName="active-nav">
        Home
      </NavLink>
    </div>
  );
}
