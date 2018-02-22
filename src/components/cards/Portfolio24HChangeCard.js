import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { formatCurrency } from '../../utils/currency';

class Portfolio24HChangeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: 0,
      formattedChange: '',
      textClass: ''
    };
  }

  componentDidMount() {
    if (this.props.transactions && this.props.transactions.length) {
      this.calculateChange(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions && nextProps.transactions.length) {
      this.calculateChange(nextProps);
    }
  }

  calculateChange = ({ transactions, currencies, user }) => {
    const filtered = transactions.filter(
      transaction => transaction.type !== 'cost'
    );
    const change = filtered.reduce((sum, transaction) => {
      const transactionCurrency = _.find(currencies, currency => {
        return currency.short === transaction.coin.toUpperCase();
      });
      const diff =
        +transaction.amount *
        transactionCurrency.price *
        (transactionCurrency.perc / 100);
      return (sum += diff);
    }, 0);

    if (!_.isNaN(change) && change !== this.state.change) {
      this.setState({
        change: change,
        formattedChange: formatCurrency(user, change),
        textClass: change < 0 ? 'text-danger' : change > 0 ? 'text-success' : ''
      });
    }
  };

  render() {
    return (
      <div className="mb-3 col-md-3">
        <div className="card bg-light">
          <div className="card-body">
            <div>
              <h5 className="card-title">24H Change:</h5>
              {this.state.formattedChange ? (
                <h2 className={'card-text ' + this.state.textClass}>
                  {this.state.formattedChange}
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

export default connect(mapStateToProps)(Portfolio24HChangeCard);
