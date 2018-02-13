import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchCurrencies } from '../actions/currencies';

class CurrenciesPage extends Component {

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  render() {
    const data = this.props.currencies;
    const columns = [{
      Header: 'Rank',
      accessor: 'rank'
    },{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Market Cap',
      accessor: 'market_cap_usd'
    }, {
      Header: 'Price',
      accessor: 'price_usd'
    }, {
      Header: 'Volume (24h)',
      accessor: '24h_volume_usd'
    }, {
      Header: 'Supply',
      accessor: 'total_supply'
    }, {
      Header: 'Change (1h)',
      accessor: 'percent_change_1h'
    }, {
      Header: 'Change (24h)',
      accessor: 'percent_change_24h'
    }, {
      Header: 'Change (7d)',
      accessor: 'percent_change_7d'
    }];
    return (
      <div className="container content">
        <ReactTable
          data={data}
          columns={columns}
        />
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