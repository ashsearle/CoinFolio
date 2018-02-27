import _ from 'lodash';
import { exchangeToUserCurrency } from './currency';

export const getPortfolioTotalValue = (
  { currencies, user },
  currentPortfolio
) => {
  if (!currentPortfolio || !user || !currencies || !currencies.all) return;
  const { transactions } = currentPortfolio;
  const { all: allCurrencies } = currencies;
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
        transaction.currency.toLowerCase() === user.currency.toLowerCase()
          ? transactionCurrency.price
          : exchangeToUserCurrency(transactionCurrency.price, user);
      return (sum += +transaction.amount * transactionPrice);
    }, 0);
};

export const getPortfolio24hChange = (
  { currencies, user },
  currentPortfolio
) => {
  if (!currentPortfolio || !user || !currencies || !currencies.all) return;

  const { transactions } = currentPortfolio;
  const { all: allCurrencies } = currencies;
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
      transaction.currency.toLowerCase() === user.currency.toLowerCase()
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
        transaction.currency.toLowerCase() === user.currency.toLowerCase()
          ? transactionPrice
          : exchangeToUserCurrency(transactionPrice, user);
      return (sum += +costIncrease);
    }, 0);
};
