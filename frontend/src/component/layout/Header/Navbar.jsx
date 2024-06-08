import "./Navbar.css";

import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul >
        <li>
          <NavLink to="/" className="link">
            Home
          </NavLink>
          {/* to er onek function ase sagula docs thaka dakhte hobe
          nav link a css class dauar zonno activeclassname use
          korte hoy */}
        </li>
        <li>
          
          <NavLink to="/Services" className="link" >
            Services
          </NavLink>
        </li>
        <li>
          
          <NavLink to="/products" className="link" >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" className="link" >
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="link" >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
