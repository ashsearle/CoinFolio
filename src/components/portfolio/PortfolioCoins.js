import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table } from 'antd';

import { formatNumber } from '../../utils/number';
import { formatCurrency, exchangeToUserCurrency } from '../../utils/currency';
import { formatPercentChange, formatChangeTrend } from '../../utils/format';

class PortfolioCoins extends Component {
  getCoinTrend = coin => {
    const currencyTrend = this.props.trends.find(trend => trend.short === coin);
    return currencyTrend ? currencyTrend.trend : null;
  };
  getCoinCurrency = coin => {
    return this.props.currencies.find(currency => currency.short === coin);
  };
  getCoinTotalAmount = coin => {
    return _.reduce(
      this.props.transactions,
      (sum, transaction) => {
        return sum + (transaction.coin === coin ? +transaction.amount : 0);
      },
      0
    );
  };
  sortCoins = () => {
    let coins = [];
    _.uniqBy(
      this.props.transactions.filter(
        transaction => transaction.type !== 'cost'
      ),
      'coin'
    )
      .map(transaction => {
        return transaction.coin;
      })
      .map(coin => {
        return coins.push({
          coin: coin.toUpperCase(),
          amount: this.getCoinTotalAmount(coin),
          value:
            this.getCoinTotalAmount(coin) *
            this.getCoinCurrency(coin.toUpperCase()).price,
          change: this.getCoinCurrency(coin.toUpperCase()).perc,
          trend: this.getCoinTrend(coin.toUpperCase())
        });
      });
    return coins;
  };

  render() {
    const coins = this.sortCoins();
    const columns = [
      {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
        sorter: (a, b) => {
          if (a.coin < b.coin) return -1;
          if (a.coin > b.coin) return 1;
          return 0;
        }
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
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
        sorter: (a, b) => a.value - b.value,
        render: (text, record) => {
          return formatChangeTrend(
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
        title: '24h Change',
        dataIndex: 'change',
        key: 'change',
        sorter: (a, b) => a.change - b.change,
        render: text => {
          return formatPercentChange(text);
        }
      }
    ];
    return (
      <Table
        rowKey={record => record.coin}
        dataSource={coins}
        columns={columns}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currencies: state.currencies.all,
  trends: state.currencies.trends
});

export default connect(mapStateToProps)(PortfolioCoins);
