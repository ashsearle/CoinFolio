import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area
} from 'recharts';

import { getCoinHistory } from '../../actions/currencies';
import { exchangeToUserCurrency } from '../../utils/currency';

class PortfolioChart extends Component {
  state = {
    coins: [],
    chartData: []
  };
  componentDidMount() {
    // Get coins price history
    this.getCoinsHistory();
    this.updateChartData();
  }

  componentWillReceiveProps(nextProps) {
    // We need to update chart data only if all coins history is fetched, or if new transaction
    if (!this.state.coins.length) {
      this.getCoinsHistory();
    }
  }

  updateChartData = () => {
    const chartData = [];
    // Sort dates
    const transactionDates = _.orderBy(this.props.transactions, transaction =>
      moment(transaction.date)
    );
    const firstTransactionDate = moment(
      [].concat(transactionDates).shift().date
    );
    const lastTransactionDate = moment([].concat(transactionDates).pop().date);
    const numDays = lastTransactionDate.diff(firstTransactionDate, 'days') + 2;

    // Build chart data, one object for each day, incrementing data as we go
    for (let i = 0; i < numDays; i++) {
      const currentDate = moment(firstTransactionDate).add(i, 'days');
      const formattedCurrentDate = currentDate.format('DD MMM YYYY');
      // start of from the previous data
      const base = chartData[i - 1] || {};
      let obj = {
        ...base,
        date: formattedCurrentDate,
        cost: 0
      };
      this.props.transactions.forEach(({ date, coin, amount, type, price }) => {
        const formattedTransactionDate = moment(date).format('DD MMM YYYY');
        if (formattedTransactionDate === formattedCurrentDate) {
          if (type === 'cost') {
            obj = {
              ...obj,
              date: formattedCurrentDate,
              cost: +price
            };
          } else {
            const currency = _.find(
              this.props.currencies,
              currency => currency.short === coin.toUpperCase()
            );
            const coinValue = exchangeToUserCurrency(
              +amount * currency.price,
              this.props.user
            );
            obj = {
              ...obj,
              date: formattedCurrentDate,
              [coin]: obj[coin] ? obj[coin] + coinValue : coinValue,
              cost: 0,
              total: obj.total ? obj.total + coinValue : coinValue
            };
          }
        }
      });
      chartData.push(obj);
    }
    this.setState({ chartData });
  };

  getCoinsHistory = () => {
    const coins = _.uniqBy(
      this.props.transactions.filter(
        transaction => transaction.type !== 'cost'
      ),
      'coin'
    ).map(transaction => transaction.coin);
    // Save coins to state
    this.setState({ coins });
    // Fetch all coins history
    coins.forEach(coin => {
      this.props.getCoinHistory(coin.toUpperCase());
    });
  };
  render() {
    return (
      <ResponsiveContainer>
        <ComposedChart data={this.state.chartData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="total" fill="#eee" stroke="#ccc" />
          <Bar dataKey="cost" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies.all,
  history: state.currencies.history,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getCoinHistory: coin => dispatch(getCoinHistory(coin))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
