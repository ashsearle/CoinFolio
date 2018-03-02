import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { startSetUserCurrency } from '../actions/user';
import uiConfig from '../config/ui';

const { fiatCurrencies } = uiConfig;

export class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiatCurrency: {
        code: 'usd',
        value: 'USD',
        locales: 'en-US'
      }
    }
  }

  componentDidMount() {
    this.setState({
      fiatCurrency: this.props.userCurrency
    });
  }

  toggleSidebar = () => {
    document.querySelector('body').classList.toggle('sidebar-show');
  };

  onCurrencyChange = (e) => {
    const fiatCurrency = _.find(fiatCurrencies, currency => currency.code === e.target.value);
    this.setState({
      fiatCurrency
    });
    this.props.setUserCurrency(fiatCurrency);
  }

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
        <div className="currency-select">
          <select
            id="inputCurrency"
            className="form-control custom-select"
            value={this.state.fiatCurrency.code}
            onChange={this.onCurrencyChange}
          >
            {fiatCurrencies.map(({ code, value }) => (
              <option key={code} value={code}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  userCurrency: state.user.fiatCurrency
});

const mapDispatchToProps = dispatch => ({
  setUserCurrency: (fiatCurrency) => dispatch(startSetUserCurrency(fiatCurrency))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
