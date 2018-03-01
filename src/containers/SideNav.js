import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogout } from '../actions/user';

export class SideNav extends Component {
  onAuthClick = () => {
    const action = this.props.authenticated ? 'doLogout' : 'doLogin';
    this.props[action]();
  };

  render() {
    return (
      <div className="collapse show" id="sidebar-nav">
        <ul className="list-group">
          <li>
            <NavLink className="nav-link" to="/" exact={true}>
              Currencies
              <i className="fa fa-bitcoin float-right" />
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/portfolio">
              Portfolios
              <i className="fa fa-bar-chart float-right" />
            </NavLink>
          </li>
          {this.props.authenticated ? (
            <li>
              <a className="nav-link" onClick={this.props.doLogout}>
                Logout
                <i className="fa fa-sign-out float-right" />
              </a>
            </li>
          ) : (
            <li>
              <NavLink className="nav-link" to="/login">
                Login / Register
                <i className="fa fa-sign-in float-right" />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
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
})(SideNav);
