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
    },
    priceHistorical: {
      url:
        'https://min-api.cryptocompare.com/data/pricehistorical?fsym=<%= fromSym %>&tsyms=<%= toSym %>&ts=<%= timestamp %>',
      cache: true,
      expiry: 86400
    },
    history: {
      url: 'https://coincap.io/history/<%= coin %>',
      cache: true,
      expiry: 86400
    }
  }
};
