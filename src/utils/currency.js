export const formatCurrency = (
  { currency = 'USD', locales = 'en-US' },
  value = 0
) => {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency
  }).format(value);
};
