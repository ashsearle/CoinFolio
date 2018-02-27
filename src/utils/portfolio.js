import _ from 'lodash';
import { exchangeToUserCurrency } from './currency';

export const getPortfolio24hChange = (
  { currencies, user },
  currentPortfolio
) => {
  if (!currentPortfolio || !user || !currencies) return;

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
