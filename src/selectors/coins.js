import _ from 'lodash';
import { createSelector } from 'reselect';

const getPortfolioTransactions = (state, props) => {
  return _.result(
    _.find(
      state.portfolio,
      portfolioItem => portfolioItem.id === props.match.params.id
    ),
    'transactions'
  );
};

const getAllCurrencies = state => {
  return state.currencies.all;
};

const getCurrencyTrends = state => {
  return state.currencies.trends;
};

const getCoinTrend = (coin, trends) => {
  const currencyTrend = trends.find(trend => trend.short === coin);
  return currencyTrend ? currencyTrend.trend : null;
};
const getCoinCurrency = (coin, currencies) => {
  return currencies.find(currency => currency.short === coin);
};
const getCoinTotalAmount = (coin, transactions) => {
  return _.reduce(
    transactions,
    (sum, transaction) => {
      return sum + (transaction.coin === coin ? +transaction.amount : 0);
    },
    0
  );
};

export const getPortfolioCoinsData = createSelector(
  [getPortfolioTransactions, getAllCurrencies, getCurrencyTrends],
  (transactions, allCurrencies, trends) => {
    if (!transactions || !allCurrencies || !trends) return;
    let coins = [];
    _.uniqBy(
      transactions.filter(transaction => transaction.type !== 'cost'),
      'coin'
    )
      .map(transaction => {
        return transaction.coin;
      })
      .map(coin => {
        return coins.push({
          coin: coin.toUpperCase(),
          amount: getCoinTotalAmount(coin, transactions),
          value:
            getCoinTotalAmount(coin, transactions) *
            getCoinCurrency(coin.toUpperCase(), allCurrencies).price,
          change: getCoinCurrency(coin.toUpperCase(), allCurrencies).perc,
          trend: getCoinTrend(coin.toUpperCase(), trends)
        });
      });
    return coins;
  }
);

export const getCoinsHistory = () => {
  const coins = _.uniqBy(
    this.props.transactions.filter(transaction => transaction.type !== 'cost'),
    'coin'
  ).map(transaction => transaction.coin);
  // Fetch all coins history
  coins.forEach(coin => {
    this.props.getCoinHistory(coin.toUpperCase());
  });
};
