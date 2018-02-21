import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../../utils/currency';

class PortfolioCostTotalCard extends Component {

  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">Total cost:</h5>
              { 
                this.props.transactions.length
                ? <h2 className="card-text">
                  {
                    this.props.user.currencySign +
                    formatCurrency(
                      this.props.transactions
                      .filter((transaction) => transaction.type === 'cost')
                      .reduce((sum, transaction) => {
                        return sum += +transaction.price;
                      }, 0))
                  }
                </h2>
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
  user: state.user
});

export default connect(mapStateToProps)(PortfolioCostTotalCard);