import _ from 'lodash';
import { createSelector } from 'reselect';

const getCurrencyTrend = (currency, trends) => {
  return _.result(
    _.find(trends, trend => trend.short === currency.short),
    'trend'
  );
};

const computeCurrenciesTableData = state => {
  const { all: currencies, trends } = state.currencies;
  return currencies.map((currency, index) => ({
    ...currency,
    rank: index + 1,
    trend: getCurrencyTrend(currency, trends)
  }));
};

export const getCurrenciesTableData = createSelector(
  [computeCurrenciesTableData],
  tableData => {
    return tableData;
  }
);
