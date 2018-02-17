import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { formatCurrency } from '../../utils/currency';
import apiConfig from '../../config/api';

const { price: coinPriceEndpoint } = apiConfig.currencies;

class PortfolioTotalCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currency: 'GBP',
      currencySign: '£',
      prices: {},
      coins: []
    }
  }

  componentDidMount() {
    // Get coin prices
    this.fetchCoinPrices();
  }

  fetchCoinPrices = (nextProps) => {
    const transactions = nextProps ? nextProps.transactions : this.props.transactions;
    // Sort coins
    const coins = [];
    transactions.forEach(function(transaction) {
      let { coin } = transaction;
      coin = coin.toUpperCase();
      if (coin && !coins.includes(coin)) {
        coins.push(coin);
      }
    });
    this.setState({
      coins
    });

    // fetch coin prices
    const priceEndpoint = _.template(coinPriceEndpoint);
    coins.forEach((coin) => {
      const endpoint = priceEndpoint({
        'coin': coin,
        'currencies': this.state.currency
      });
      fetch(endpoint)
        .then(res => res.json())
        .then((json) => {
          this.setState({
            prices: {
              ...this.state.prices,
              [coin]: json[this.state.currency]
            }
          });
        });
    });
  }

  hasNewCoin = (transactions) => {
    const propsCoins = _.uniq(transactions.map((transaction) => {
      return transaction.coin.toUpperCase();
    }));
    return !_.isEqual(propsCoins, this.state.coins);
  }

  componentWillReceiveProps(nextProps) {
    // check we have prices for all coins
    if (this.hasNewCoin(nextProps.transactions)) {
      this.fetchCoinPrices(nextProps);
    }
  }

  render() {
    return (
      <div className="card bg-light mb-3 col-md-3">
        <div className="card-body">
          <div>
            <h5 className="card-title">Portfolio Value:</h5>
            { 
              Object.keys(this.state.prices).length
              ? <h2 className="card-text">{this.state.currencySign + formatCurrency(this.props.transactions.reduce((sum, transaction) => {
                return sum += +transaction.amount * this.state.prices[transaction.coin.toUpperCase()]
              }, 0))}</h2>
              : <p className="card-text">Calculating...</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  transactions: state.portfolio.find((item) => item.id === props.portfolioId).transactions
});

export default connect(mapStateToProps)(PortfolioTotalCard);