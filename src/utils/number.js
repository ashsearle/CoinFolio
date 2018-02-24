export const formatNumber = (
  { locales = 'en-US' },
  number = 0,
  options = {}
) => {
  number = +number;
  return new Intl.NumberFormat(locales, { ...options }).format(number);
};
