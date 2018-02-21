import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { formatCurrency } from '../../utils/currency';

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

  calculateTotal = ({ transactions, prices, onPortfolioValueCalculated }) => {
    const total = transactions.reduce((sum, transaction) => {
      const increase =
        transaction.type === 'cost'
          ? 0
          : +transaction.amount * prices[transaction.coin.toUpperCase()];
      return (sum += increase);
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
  prices: state.coins.prices,
  user: state.user
});

export default connect(mapStateToProps)(PortfolioTotalCard);
