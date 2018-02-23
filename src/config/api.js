export default {
  endpoints: {
    allCurrencies: {
      url: 'https://coincap.io/front',
      cache: true,
      expiry: 600
    },
    socket: {
      url: 'https://coincap.io',
      cache: false
    },
    exchangeRates: {
      url: 'https://api.fixer.io/latest?base=USD&symbols=<%= currencies %>',
      cache: true,
      expiry: 86400
    }
  }
};
