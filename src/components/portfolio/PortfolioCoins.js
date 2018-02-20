import React, { Component } from 'react';
import _ from 'lodash';

class PortfolioCoins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
  }

  componentDidMount() {
    if (this.props.transactions && this.props.transactions.length) {
      this.sortCoins(this.props.transactions);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length) {
      this.sortCoins(nextProps.transactions);
    }
  }

  sortCoins = (transactions) => {
    const coins = [];
    _.uniqBy(this.props.transactions, 'coin')
    .map((transaction) => {
      return transaction.coin
    })
    .map((coin) => {
      return coins.push(
        {
          coin: coin.toUpperCase(),
          amount: _.reduce(transactions, (sum, transaction) => {
            return sum + (transaction.coin === coin ? +transaction.amount : 0)
          }, 0)
        }
      )
    });
    this.setState({ coins })
  }

  render() {
    return (
      <ul>
          {
            this.state.coins.map(function({coin, amount}, index){
              return <li key={index}>{coin}: {amount}</li>;
            })
          }
      </ul>
    )
  }
}

export default PortfolioCoins;