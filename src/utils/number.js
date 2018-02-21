export const formatNumber = ({ locales = "en-US" }, number = 0) => {
  number = +number;
  console.log("number", number);
  return new Intl.NumberFormat(locales).format(number);
};
