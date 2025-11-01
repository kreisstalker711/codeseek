import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logoPath from '../images/logo.png';

/**
 * A navigation bar component that displays the CodeSeek.AI logo, a search bar and links to the about and settings pages.
 */
const Navbar: React.FC = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo-container">
            <img src={logoPath} alt="CodeSeek.AI Logo" className="logo-image" />
          </Link>
        </div>
        <div className="navbar-search">
          <input type="search" placeholder="Ask me anything..." />
          <button type="submit">Search</button>
        </div>
        <ul className="navbar-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;