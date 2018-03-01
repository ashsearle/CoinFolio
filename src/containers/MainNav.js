import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MainNav extends Component {
  toggleSidebar = () => {
    document.querySelector('body').classList.toggle('sidebar-show');
  };

  render() {
    return (
      <nav className="navbar fixed-top top-nav">
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.toggleSidebar}
        >
          <i className="fa fa-bars" />
        </button>
        <Link className="navbar-brand" to="/">
          Koindash
        </Link>
      </nav>
    );
  }
}

export default MainNav;
