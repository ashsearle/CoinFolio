import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: !!state.user.uid
});

export default connect(mapStateToProps, null, null, {
  pure: false
})(SideNav);
