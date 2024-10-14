// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/faq">FAQ</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/resources">Resources</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
