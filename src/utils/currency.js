export const exchangeToUserCurrency = (value, { currency, exchangeRates }) => {
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
  { currency = 'USD', locales = 'en-US' },
  value = 0,
  options = {}
) => {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    ...options
  }).format(value);
};
