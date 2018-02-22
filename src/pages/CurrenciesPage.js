import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { formatCurrency } from '../utils/currency';
import { formatNumber } from '../utils/number';
import { fetchCurrencies } from '../actions/currencies';

class CurrenciesPage extends Component {
  componentDidMount() {
    //this.props.fetchCurrencies();
  }

  formatPercentChange = text => {
    const className = +text > 0 ? 'text-success' : 'text-danger';
    return <span className={className}>{text}%</span>;
  };

  render() {
    const data = this.props.currencies.map((currency, index) => {
      currency.rank = index + 1;
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
        dataIndex: 'volume',
        key: 'volume',
        sorter: (a, b) => a.volume - b.volume,
        render: text => {
          return formatCurrency(this.props.user, text);
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
          return this.formatPercentChange(text);
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
  currencies: state.currencies,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencies: () => dispatch(fetchCurrencies())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPage);
