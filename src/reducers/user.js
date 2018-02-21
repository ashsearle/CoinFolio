const defaultState = {
  currency: 'GBP',
  currencySign: '£',
  locales: 'en-GB',
  uid: null
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
    default:
      return state;
  }
};
