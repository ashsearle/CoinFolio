export const exchangeToUserCurrency = (
  value,
  { fiatCurrency, exchangeRates }
) => {
  const { value: currency } = fiatCurrency;
  if (!exchangeRates || !Object.keys(exchangeRates).length) {
    return value;
  }
  return +value * (exchangeRates[currency] || 1);
};

export const formatCurrency = ({ fiatCurrency }, value = 0, options = {}) => {
  const { value: currency, locales } = fiatCurrency;
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    ...options
  }).format(value);
};
