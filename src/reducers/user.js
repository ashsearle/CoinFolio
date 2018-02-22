const defaultState = {
  currency: 'GBP',
  locales: 'en-GB',
  uid: null,
  exchangeRates: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        ...state,
        uid: null
      };
    case 'SET_EXCHANGE_RATES':
      return {
        ...state,
        exchangeRates: action.rates
      };
    default:
      return state;
  }
};
