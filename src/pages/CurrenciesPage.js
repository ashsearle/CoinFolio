import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

import { formatCurrency, exchangeToUserCurrency } from '../utils/currency';
import { formatPercentChange, formatChangeTrend } from '../utils/format';
import { formatNumber } from '../utils/number';

class CurrenciesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      column: null,
      direction: null
    };
  }

  componentDidMount() {
    this.handleData();
  }

  componentWillReceiveProps() {
    this.handleData();
  }

  handleData = () => {
    const data = this.props.currencies.map((currency, index) => {
      currency.rank = index + 1;
      const coinTrend = _.find(this.props.trends, trend => {
        return trend.short === currency.short;
      });
      currency.trend = coinTrend ? coinTrend.trend : null;
      return currency;
    });
    console.log('data', data);
    this.setState({ data });
  };

  handleSort = clickedColumn => () => {
    const { data, column, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };
  render() {
    const { data, column, direction } = this.state;
    const { user } = this.props;
    return (
      <div className="container content">
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'rank' ? direction : null}
                onClick={this.handleSort('rank')}
              >
                #
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'mktcap' ? direction : null}
                onClick={this.handleSort('mktcap')}
              >
                Market Cap
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'price' ? direction : null}
                onClick={this.handleSort('price')}
              >
                Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'volume' ? direction : null}
                onClick={this.handleSort('volume')}
              >
                Volume (24h)
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'supply' ? direction : null}
                onClick={this.handleSort('supply')}
              >
                Supply
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'perc' ? direction : null}
                onClick={this.handleSort('perc')}
              >
                24h
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              data,
              ({ rank, short, long, mktcap, price, perc, volume, supply }) => (
                <Table.Row key={short}>
                  <Table.Cell>{rank}</Table.Cell>
                  <Table.Cell>{long}</Table.Cell>
                  <Table.Cell>
                    {formatCurrency(user, exchangeToUserCurrency(mktcap, user))}
                  </Table.Cell>
                  <Table.Cell>
                    {formatCurrency(
                      user,
                      exchangeToUserCurrency(price, user, {
                        minimumFractionDigits: +price > 1 ? 2 : 6
                      })
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {formatCurrency(user, exchangeToUserCurrency(volume, user))}
                  </Table.Cell>
                  <Table.Cell>
                    {formatNumber(user, supply) + ' ' + short}
                  </Table.Cell>
                  <Table.Cell>{formatPercentChange(perc)}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
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
