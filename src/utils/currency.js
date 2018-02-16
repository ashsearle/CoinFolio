export const formatCurrency = (val) => {
  val = !!+val ? +val : 0;
  return Number(Math.round(val + 'e2') + 'e-2').toFixed(2);
};