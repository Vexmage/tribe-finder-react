// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', width: 'auto', marginRight: '10px' }}
          />
          <span className="fs-4 fw-bold">Tribe Finder</span>
        </Link>
        <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
