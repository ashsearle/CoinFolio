export default {
  currencies: {
    all: 'https://api.coinmarketcap.com/v1/ticker/?limit=0',
    price: 'https://min-api.cryptocompare.com/data/price?fsym=<%= coin %>&tsyms=<%= currencies %>',
    histoday: 'https://min-api.cryptocompare.com/data/histoday?aggregate=1&e=CCCAGG&fsym=<%= coin %>&limit=2000&tryConversion=true&tsym=<%= currency %>'
  }
}