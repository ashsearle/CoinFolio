import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const MainNav = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">CoinFolio</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-nav" aria-controls="navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Markets</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/portfolio">Portfolio</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default MainNav;