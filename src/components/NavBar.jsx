import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/images/logo.png";

import "./NavBar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <nav className="navbar">
        <div className="inline-block">
          <h5 className="logo-text">SPACE-WALKER</h5>
          <a href="/" className="logo">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#ffffff" }} />
          ) : (
            <FaBars size={30} style={{ color: "#ffffff" }} />
          )}
        </div>
        <ul className={`nav-menu ${click ? "active" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link" to="/home" onClick={closeMenu}>
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/epic" onClick={closeMenu}>
              EPIC
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ino" onClick={closeMenu}>
              INNOVATIONS
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mars" onClick={closeMenu}>
              MARS
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              <FontAwesomeIcon icon={faSignOutAlt} /> LOGOUT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
