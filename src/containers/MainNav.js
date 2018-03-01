import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogout } from '../actions/user';

export class MainNav extends Component {
  onAuthClick = () => {
    const action = this.props.authenticated ? 'doLogout' : 'doLogin';
    this.props[action]();
  };

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

        <div className="navbar-user">
          {!this.props.authenticated ? (
            <Link to="/login">Login / Register</Link>
          ) : (
            <button
              type="button"
              className="btn btn-link"
              onClick={this.props.doLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: !!state.user.uid
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(doLogout())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(MainNav);
