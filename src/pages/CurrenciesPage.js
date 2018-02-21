import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { formatCurrency } from '../utils/currency';
import { formatNumber } from '../utils/number';
import { fetchCurrencies } from '../actions/currencies';

class CurrenciesPage extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  formatPercentChange = text => {
    const className = +text > 0 ? 'text-success' : 'text-danger';
    return <span className={className}>{text}%</span>;
  };

  render() {
    const data = this.props.currencies.map(currency => {
      currency.market_cap =
        currency['market_cap_' + this.props.user.currency.toLowerCase()];
      currency.price =
        currency['price_' + this.props.user.currency.toLowerCase()];
      currency['24h_volume'] =
        currency['24h_volume_' + this.props.user.currency.toLowerCase()];
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
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }
      },
      {
        title: 'Market Cap',
        dataIndex: 'market_cap',
        key: 'market_cap',
        sorter: (a, b) => a.market_cap - b.market_cap,
        render: text => {
          return formatCurrency(this.props.user, text);
        }
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: text => {
          return formatCurrency(this.props.user, text);
        }
      },
      {
        title: 'Volume (24h)',
        dataIndex: '24h_volume',
        key: '24h_volume',
        sorter: (a, b) => a['24h_volume'] - b['24h_volume'],
        render: text => {
          return formatCurrency(this.props.user, text);
        }
      },
      {
        title: 'Supply',
        dataIndex: 'total_supply',
        key: 'total_supply',
        sorter: (a, b) => a.total_supply - b.total_supply,
        render: (text, record) => {
          return (
            formatNumber(this.props.user, record.total_supply) +
            ' ' +
            record.symbol
          );
        }
      },
      {
        title: '1h',
        dataIndex: 'percent_change_1h',
        key: 'percent_change_1h',
        className: 'percent_change_1h_class',
        sorter: (a, b) => a.percent_change_1h_class - b.percent_change_1h_class,
        render: text => {
          return this.formatPercentChange(text);
        }
      },
      {
        title: '24h',
        dataIndex: 'percent_change_24h',
        key: 'percent_change_24h',
        className: 'percent_change_24h_class',
        sorter: (a, b) =>
          a.percent_change_24h_class - b.percent_change_24h_class,
        render: text => {
          return this.formatPercentChange(text);
        }
      },
      {
        title: '7d',
        dataIndex: 'percent_change_7d',
        key: 'percent_change_7d',
        className: 'percent_change_7d_class',
        sorter: (a, b) => a.percent_change_7d_class - b.percent_change_7d_class,
        render: text => {
          return this.formatPercentChange(text);
        }
      }
    ];
    return (
      <div className="container content">
        <Table
          rowKey={record => record.id}
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 100 }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencies: () => dispatch(fetchCurrencies())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPage);
