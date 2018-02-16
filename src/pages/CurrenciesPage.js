import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { fetchCurrencies } from '../actions/currencies';

class CurrenciesPage extends Component {

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  render() {
    const data = this.props.currencies;
    const columns = [{
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank'
    },{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Market Cap',
      dataIndex: 'market_cap_usd',
      key: 'market_cap_usd'
    }, {
      title: 'Price',
      dataIndex: 'price_usd',
      key: 'price_usd'
    }, {
      title: 'Volume (24h)',
      dataIndex: '24h_volume_usd',
      key: '24h_volume_usd'
    }, {
      title: 'Supply',
      dataIndex: 'total_supply',
      key: 'total_supply'
    }, {
      title: 'Change (1h)',
      dataIndex: 'percent_change_1h',
      key: 'percent_change_1h'
    }, {
      title: 'Change (24h)',
      dataIndex: 'percent_change_24h',
      key: 'percent_change_24h'
    }, {
      title: 'Change (7d)',
      dataIndex: 'percent_change_7d',
      key: 'percent_change_7d'
    }];
    return (
      <div className="container content">
        <Table dataSource={data} columns={columns} />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  currencies: state.currencies
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPage);