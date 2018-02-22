import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import _ from 'lodash';

import { formatCurrency, exchangeToUserCurrency } from '../utils/currency';
import { formatNumber } from '../utils/number';
import { fetchCurrencies } from '../actions/currencies';

class CurrenciesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: []
    };
  }

  componentDidMount() {
    this.setState({
      currencies: this.props.currencies
    });
  }

  componentWillReceiveProps(nextProps) {
    const currencies = this.getTrends(nextProps.currencies);
    this.setState({ currencies });
  }

  getTrends = nextCurrencies => {
    if (!this.state.currencies.length) {
      return nextCurrencies;
    }
    const updatedCurrencies = _.difference(
      nextCurrencies,
      this.state.currencies
    );
    updatedCurrencies.forEach(updatedCurrency => {
      const currentCurrency = _.find(this.state.currencies, function(current) {
        return current.short === updatedCurrency.short;
      });
      const currentPrice = currentCurrency.price;
      const updatedPrice = updatedCurrency.price;
      const trend = updatedPrice > currentPrice ? 'up' : 'down';
      _.find(nextCurrencies, function(next) {
        return next.short === updatedCurrency.short;
      }).trend = trend;
    });
    return nextCurrencies;
  };

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

  render() {
    const data = this.state.currencies.map((currency, index) => {
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
          return this.formatChangeTrend(
            formatCurrency(
              this.props.user,
              exchangeToUserCurrency(text, this.props.user)
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
