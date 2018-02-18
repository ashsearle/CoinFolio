import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../../utils/currency';

class PortfolioTotalCard extends Component {

  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">Portfolio Value:</h5>
              { 
                Object.keys(this.props.prices).length
                ? <h2 className="card-text">{this.props.user.currencySign + formatCurrency(this.props.transactions.reduce((sum, transaction) => {
                  return sum += +transaction.amount * this.props.prices[transaction.coin.toUpperCase()]
                }, 0))}</h2>
                : <p className="card-text">Calculating...</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  prices: state.coins.prices,
  user: state.user
});

export default connect(mapStateToProps)(PortfolioTotalCard);