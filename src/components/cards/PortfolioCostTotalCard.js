import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { formatCurrency } from '../../utils/currency';

class PortfolioCostTotalCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cost: 0
    }
  }

  componentDidMount() {
    if (this.props.transactions && this.props.transactions.length) {
      this.calculateCost(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length) {
      this.calculateCost(nextProps);
    }
  }

  calculateCost = ({transactions, onPortfolioCostCalculated}) => {
    const cost = 
      transactions
        .filter((transaction) => transaction.type === 'cost')
        .reduce((sum, transaction) => {
          return sum += +transaction.price;
        }, 0)
    if (!_.isNaN(cost)) {
      this.setState({ cost });
      onPortfolioCostCalculated(cost);
    }
  }

  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">Costs:</h5>
              { 
                this.state.cost
                ? <h2 className="card-text">{ this.props.user.currencySign + formatCurrency(this.state.cost) }</h2>
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