const toUserCurrency = (value, currency, exchangeRates) => {
  if (
    !exchangeRates ||
    !Object.keys(exchangeRates).length ||
    !currency ||
    currency === 'USD'
  ) {
    return value;
  }
  return +value * exchangeRates[currency];
};

export const formatCurrency = (
  { currency = 'USD', locales = 'en-US', exchangeRates = {} },
  value = 0
) => {
  value = toUserCurrency(value, currency, exchangeRates);
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency
  }).format(value);
};
