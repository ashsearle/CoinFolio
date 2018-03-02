import _ from 'lodash';
import moment from 'moment';
import { exchangeToUserCurrency } from './currency';

export const getPortfolioTotalValue = (
  { currencies, user },
  currentPortfolio
) => {
  if (
    !currentPortfolio ||
    !user ||
    !currencies ||
    !currencies.all ||
    !currencies.all.length
  )
    return;
  const { transactions } = currentPortfolio;
  const { all: allCurrencies } = currencies;
  const { value: userCurrency } = user.fiatCurrency;
  return transactions
    .filter(transaction => transaction.type !== 'cost')
    .reduce((sum, transaction) => {
      const transactionCurrency = _.find(allCurrencies, currency => {
        return currency.short === transaction.coin.toUpperCase();
      });
      if (!transactionCurrency) {
        console.log('calculateTotal');
        console.log('transactionCurrency allCurrencies', allCurrencies);
        console.log('transactionCurrency transaction', transaction);
      }
      // TODO: atm we're assuming it's either USD or GBP
      const transactionPrice =
        transaction.currency.toLowerCase() === userCurrency.toLowerCase()
          ? transactionCurrency.price
          : exchangeToUserCurrency(transactionCurrency.price, user);
      return (sum += +transaction.amount * transactionPrice);
    }, 0);
};

export const getPortfolio24hChange = (
  { currencies, user },
  currentPortfolio
) => {
  if (
    !currentPortfolio ||
    !user ||
    !currencies ||
    !currencies.all ||
    !currencies.all.length
  )
    return;

  const { transactions } = currentPortfolio;
  const { all: allCurrencies } = currencies;
  const { value: userCurrency } = user.fiatCurrency;
  const filtered = transactions.filter(
    transaction => transaction.type !== 'cost'
  );
  return filtered.reduce((sum, transaction) => {
    const transactionCurrency = _.find(allCurrencies, currency => {
      return currency.short === transaction.coin.toUpperCase();
    });
    if (!transactionCurrency) {
      console.log('getPortfolio24hChange');
      console.log('transactionCurrency allCurrencies', allCurrencies);
      console.log('transactionCurrency transaction', transaction);
    }
    // TODO: atm we're assuming it's either USD or GBP
    const transactionPrice =
      transaction.currency.toLowerCase() === userCurrency.toLowerCase()
        ? transactionCurrency.price
        : exchangeToUserCurrency(transactionCurrency.price, user);
    const diff =
      +transaction.amount * transactionPrice * (transactionCurrency.perc / 100);
    return (sum += diff);
  }, 0);
};

export const getPortfolioCost = ({ user }, currentPortfolio) => {
  if (!currentPortfolio || !user) return;
  const { transactions } = currentPortfolio;
  const { value: userCurrency } = user.fiatCurrency;
  return transactions
    .filter(
      transaction =>
        transaction.type === 'cost' || transaction.type === 'purchase'
    )
    .reduce((sum, transaction) => {
      const transactionPrice =
        transaction.type === 'cost'
          ? transaction.price
          : transaction.price * transaction.amount;
      const costIncrease =
        transaction.currency.toLowerCase() === userCurrency.toLowerCase()
          ? transactionPrice
          : exchangeToUserCurrency(transactionPrice, user);
      return (sum += +costIncrease);
    }, 0);
};

export const getPortfolioChartData = (
  { user, currencies },
  currentPortfolio
) => {
  if (!currentPortfolio || !user || !currencies || !currencies.all) return;
  const { transactions } = currentPortfolio;
  const { all: allCurrencies } = currencies;

  const chartData = [];
  const firstTransactionDate = _.orderBy(transactions, transaction =>
    moment(transaction.date)
  ).shift().date;
  const today = moment();
  const numDays = today.diff(firstTransactionDate, 'days') + 2;

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
    transactions.forEach(({ date, coin, amount, type, price }) => {
      const formattedTransactionDate = moment(date).format('DD MMM YYYY');
      if (formattedTransactionDate === formattedCurrentDate) {
        if (type === 'cost') {
          obj = {
            ...obj,
            cost: +price
          };
        } else {
          const currency = _.find(
            allCurrencies,
            currency => currency.short === coin.toUpperCase()
          );
          const coinValue = exchangeToUserCurrency(
            +amount * currency.price,
            user
          );
          obj = {
            ...obj,
            [coin]: obj[coin] ? obj[coin] + coinValue : coinValue,
            total: obj.total ? obj.total + coinValue : coinValue
          };
        }
      }
    });
    chartData.push(obj);
  }
  return chartData;
};
