import React, { Component } from 'react';
import { Table } from 'antd';

import { formatNumber } from '../../utils/number';
import { formatCurrency, exchangeToUserCurrency } from '../../utils/currency';
import { formatPercentChange, formatChangeTrend } from '../../utils/format';

class PortfolioCoins extends Component {
  render() {
    const columns = [
      {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
        className: 'text-align-left bold',
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
        rowKey={record => record.id}
        dataSource={this.props.data}
        columns={columns}
      />
    );
  }
}

export default PortfolioCoins;
