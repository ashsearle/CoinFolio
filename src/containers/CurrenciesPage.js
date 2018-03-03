import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import _ from 'lodash';

import { getCurrenciesTableData } from '../selectors/tables';

import { formatCurrency, exchangeToUserCurrency } from '../utils/currency';
import { formatPercentChange, formatChangeTrend } from '../utils/format';
import { formatNumber } from '../utils/number';

import DebouncedInput from '../components/forms/DebouncedInput';

class CurrenciesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }
  handleFilterChange = filter => {
    this.setState({ filter });
  };
  render() {
    const data = _.filter(this.props.tableData, currency =>
      currency.long.toLowerCase().startsWith(this.state.filter.toLowerCase())
    );
    const columns = [
      {
        title: '#',
        dataIndex: 'rank',
        key: 'rank',
        defaultSortOrder: 'ascend',
        className: 'text-align-left',
        sorter: (a, b) => a.rank - b.rank
      },
      {
        title: 'Name',
        dataIndex: 'long',
        key: 'long',
        className: 'text-align-left bold',
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
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 flex-right">
              <div className="form-group">
                <DebouncedInput
                  type="search"
                  placeholder="Filter coins"
                  onChange={value => this.handleFilterChange(value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                loading={
                  (!this.props.tableData || !this.props.tableData.length) &&
                  !this.state.filter
                }
                bordered={true}
                rowKey={record => record.short}
                dataSource={data}
                columns={columns}
                pagination={{ pageSize: 100 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tableData: getCurrenciesTableData(state),
  user: state.user
});

export default connect(mapStateToProps)(CurrenciesPage);
