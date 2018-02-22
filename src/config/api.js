export default {
  currencies: {
    all: 'https://coincap.io/front',
    socket: 'https://coincap.io',
    totalVol:
      'https://min-api.cryptocompare.com/data/top/totalvol?limit=100&page=0&tsym=<%= currency %>',
    price:
      'https://min-api.cryptocompare.com/data/price?fsym=<%= coin %>&tsyms=<%= currency %>',
    price24h:
      'https://min-api.cryptocompare.com/data/pricehistorical?fsym=<%= coin %>&tsyms=<%= currency %>&ts=<%= timestamp %>',
    histoday:
      'https://min-api.cryptocompare.com/data/histoday?aggregate=1&e=CCCAGG&fsym=<%= coin %>&limit=2000&tryConversion=true&tsym=<%= currency %>'
  },
  exchangeRates: 'https://api.fixer.io/latest?base=USD&symbols=<%= currency %>'
};
