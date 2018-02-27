import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import _ from 'lodash';

import { formatCurrency, exchangeToUserCurrency } from '../utils/currency';
import { formatPercentChange, formatChangeTrend } from '../utils/format';
import { formatNumber } from '../utils/number';

class CurrenciesPage extends Component {
  render() {
    const data = this.props.currencies.map((currency, index) => {
      currency.rank = index + 1;
      const coinTrend = _.find(this.props.trends, trend => {
        return trend.short === currency.short;
      });
      currency.trend = coinTrend ? coinTrend.trend : null;
      return currency;
    });
    const columns = [
      {
        title: '#',
        dataIndex: 'rank',
        key: 'rank',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.rank - b.rank
      },
      {
        title: 'Name',
        dataIndex: 'long',
        key: 'long',
        sorter: (a, b) => {
          if (a.long < b.long) return -1;
          if (a.long > b.long) return 1;
          return 0;
        }
      },
      {
        title: 'Market Cap',
        dataIndex: 'mktcap',
        key: 'mktcap',
        sorter: (a, b) => a.mktcap - b.mktcap,
        render: text => {
          return formatCurrency(
            this.props.user,
            exchangeToUserCurrency(text, this.props.user)
          );
        }
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
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
        title: 'Volume (24h)',
        dataIndex: 'volume',
        key: 'volume',
        sorter: (a, b) => a.volume - b.volume,
        render: text => {
          return formatCurrency(
            this.props.user,
            exchangeToUserCurrency(text, this.props.user)
          );
        }
      },
      {
        title: 'Supply',
        dataIndex: 'supply',
        key: 'supply',
        sorter: (a, b) => a.supply - b.supply,
        render: (text, record) => {
          return (
            formatNumber(this.props.user, record.supply) + ' ' + record.short
          );
        }
      },
      {
        title: '24h',
        dataIndex: 'perc',
        key: 'perc',
        sorter: (a, b) => a.perc - b.perc,
        render: text => {
          return formatPercentChange(text);
        }
      }
    ];
    return (
      <div className="container content">
        <Table
          rowKey={record => record.short}
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 100 }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies.all,
  trends: state.currencies.trends,
  user: state.user
});

export default connect(mapStateToProps)(CurrenciesPage);
