const defaultState = {
  uid: null,
  exchangeRates: null,
  displayName: null,
  photoURL: null,
  fiatCurrency: {
    code: 'usd',
    value: 'USD',
    locales: 'en-US'
  }
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
    case 'SET_USER_CURRENCY':
      return {
        ...state,
        fiatCurrency: {
          ...state.fiatCurrency,
          ...action.fiatCurrency
        }
      };
    default:
      return state;
  }
};
