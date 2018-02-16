import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { formatCurrency } from '../../utils/currency';
import apiConfig from '../../config/api';

const { price: coinPriceEndpoint } = apiConfig.currencies;

class PortfolioTotalCard extends Component {

  constructor(props) {
    console.log('constructor')
    super(props);
    this.state = {
      total: 0,
      currency: 'GBP',
      'currencySign': '£'
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    const priceEndpoint = _.template(coinPriceEndpoint);
    const coins = [];
    this.props.transactions.forEach(function(transaction) {
      const { coin } = transaction;
      if (coin && !coins.includes(coin)) {
        coins.push(coin.toUpperCase());
      }
    });
    coins.forEach((coin) => {
      const endpoint = priceEndpoint({
        'coin': coin,
        'currencies': this.state.currency
      });
      fetch(endpoint)
        .then(res => res.json())
        .then((json) => {
          this.addCoinToTotal(coin, json[this.state.currency])
        });
    });
  }

  componentDidUpdate () {
    console.log('componentDidUpdate', this.props.transactions)
  }

  addCoinToTotal = (coin, price) => {
    const coinTransactions =
      this.props.transactions.filter(transaction => (
        transaction.coin.toLowerCase() === coin.toLowerCase()
      ));
    coinTransactions.forEach((transaction) => {
      this.setState({
        total: this.state.total + transaction.amount * price
      });
    });
  }

  render() {
    console.log('render')
    return (
      <div className="card bg-light mb-3 col-md-3">
        <div className="card-body">
          <div>
            <h5 className="card-title">Portfolio Total {this.props.transactions.length}:</h5>
            { 
              this.state.total
              ? <h2 className="card-text">{this.state.currencySign + formatCurrency(this.state.total)}</h2>
              : <p className="card-text">Calculating...</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log('state', state)
  return {
    transactions: state.portfolio.find((item) => item.id === props.portfolioId).transactions
  }
  
};

export default connect(mapStateToProps)(PortfolioTotalCard);