import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogin, doLogout } from '../actions/user';

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
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/portfolio">
              Portfolio
            </NavLink>
          </li>
        </ul>
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
})(SideNav);
