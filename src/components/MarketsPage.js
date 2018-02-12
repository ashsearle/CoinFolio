import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchMarkets } from '../actions/markets';

class MarketsPage extends Component {

  componentDidMount() {
    this.props.fetchMarkets();
  }

  render() {
    const data = this.props.markets;
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
  markets: state.markets
});

const mapDispatchToProps = (dispatch) => ({
  fetchMarkets: () => dispatch(fetchMarkets())
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketsPage);