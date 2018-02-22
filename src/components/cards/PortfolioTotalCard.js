import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { formatCurrency, exchangeToUserCurrency } from '../../utils/currency';

class PortfolioTotalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    if (this.props.transactions && this.props.transactions.length) {
      this.calculateTotal(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length) {
      this.calculateTotal(nextProps);
    }
  }

  calculateTotal = ({
    transactions,
    currencies,
    user,
    onPortfolioValueCalculated
  }) => {
    const total = transactions
      .filter(transaction => transaction.type !== 'cost')
      .reduce((sum, transaction) => {
        const transactionCurrency = _.find(currencies, currency => {
          return currency.short === transaction.coin.toUpperCase();
        });
        // TODO: atm we're assuming it's either USD or GBP
        const transactionPrice =
          transaction.currency.toLowerCase() === user.currency.toLowerCase()
            ? transactionCurrency.price
            : exchangeToUserCurrency(transactionCurrency.price, user);
        return (sum += +transaction.amount * transactionPrice);
      }, 0);
    if (!_.isNaN(total)) {
      this.setState({ total });
      onPortfolioValueCalculated(total);
    }
  };

  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">Value:</h5>
              {this.state.total ? (
                <h2 className="card-text">
                  {formatCurrency(this.props.user, this.state.total)}
                </h2>
              ) : (
                <p className="card-text">Calculating...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies,
  user: state.user
});

export default connect(mapStateToProps)(PortfolioTotalCard);
