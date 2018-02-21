import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogin, doLogout } from '../../actions/auth';

export class MainNav extends Component {
  onAuthClick = () => {
    const action = this.props.authenticated ? 'doLogout' : 'doLogin';
    this.props[action]();
  };

  render() {
    return (
      <div className="container">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Live Crypto Portfolio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-nav"
            aria-controls="navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact={true}>
                  Currencies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/portfolio">
                  Portfolio
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onAuthClick}
          >
            {this.props.authenticated ? 'Logout' : 'Login'}
          </button>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: !!state.user.uid
});

const mapDispatchToProps = dispatch => ({
  doLogin: () => dispatch(doLogin()),
  doLogout: () => dispatch(doLogout())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(MainNav);
