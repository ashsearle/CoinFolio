import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table } from 'antd';

import { formatNumber } from '../../utils/number';
import { formatCurrency, exchangeToUserCurrency } from '../../utils/currency';

class PortfolioCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      columns: [
        {
          title: 'Coin',
          dataIndex: 'coin',
          key: 'coin'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          render: text => {
            return formatNumber(this.props.user, text, {
              minimumFractionDigits: text % 1 !== 0 ? 6 : 0
            });
          }
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
          render: (text, record) => {
            return this.formatChangeTrend(
              formatCurrency(
                this.props.user,
                exchangeToUserCurrency(text, this.props.user),
                { minimumFractionDigits: +text > 1 ? 2 : 6 }
              ),
              record.trend
            );
          }
        },
        {
          title: 'Change',
          dataIndex: 'change',
          key: 'change',
          render: text => {
            return this.formatPercentChange(text);
          }
        }
      ]
    };
  }

  formatPercentChange = text => {
    const className = +text > 0 ? 'text-success' : 'text-danger';
    return <span className={className}>{text}%</span>;
  };

  formatChangeTrend = (text, trend) => {
    if (trend) {
      const className = trend === 'up' ? 'text-success' : 'text-danger';
      return <span className={className}>{text}</span>;
    }
    return text;
  };

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

  sortCoins = transactions => {
    let coins = [];
    _.uniqBy(
      transactions.filter(transaction => transaction.type !== 'cost'),
      'coin'
    )
      .map(transaction => {
        return transaction.coin;
      })
      .map(coin => {
        return coins.push({
          coin: coin.toUpperCase(),
          amount: _.reduce(
            transactions,
            (sum, transaction) => {
              return (
                sum + (transaction.coin === coin ? +transaction.amount : 0)
              );
            },
            0
          )
        });
      });
    coins = coins.map(coin => {
      const currency = this.props.currencies.find(
        currency => currency.short === coin.coin
      );
      return {
        ...coin,
        value: coin.amount * currency.price,
        change: currency.perc,
        trend: currency.trend || null
      };
    });
    this.setState({ coins });
  };

  render() {
    return (
      <Table
        rowKey={record => record.coin}
        dataSource={this.state.coins}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currencies: state.currencies
});

export default connect(mapStateToProps)(PortfolioCoins);
