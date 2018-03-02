const defaultState = {
  currency: 'GBP',
  locales: 'en-GB',
  uid: null,
  exchangeRates: null,
  displayName: null,
  photoURL: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { uid, displayName, photoURL } = action.user;
      return {
        ...state,
        uid,
        displayName,
        photoURL
      };
    case 'LOGOUT':
      return {
        ...state,
        uid: null,
        displayName: null,
        photoURL: null
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
