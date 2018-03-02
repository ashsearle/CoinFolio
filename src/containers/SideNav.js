import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogout } from '../actions/user';

export class SideNav extends Component {

  render() {
    return (
      <div className="collapse show" id="sidebar-nav">
        {!!this.props.user.uid && <div className="avatar">
          <img src={this.props.user.photoURL} alt="avatar" />
          <span className="name">{this.props.user.displayName}</span>
        </div>}
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
          {!!this.props.user.uid ? (
            <li>
              <a className="nav-link" onClick={this.props.doLogout}>
                Logout
                <i className="fa fa-sign-out float-right" />
              </a>
            </li>
          ) : (
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
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
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(doLogout())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(SideNav);
