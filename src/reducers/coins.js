const defaultState = {
  subscriptions: [],
  prices: {},
  prices24h: {}
};
const coinsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PRICES':
      return {
        ...state,
        prices: {
          ...state.prices,
          ...action.prices
        }
      };
    case 'ADD_PRICE':
      return {
        ...state,
        prices: {
          ...state.prices,
          ...action.price
        }
      };
    case 'ADD_PRICE_24H':
      return {
        ...state,
        prices24h: {
          ...state.prices24h,
          ...action.price
        }
      };
    case 'SET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: [...state.subscriptions, ...action.subscriptions]
      };
    case 'REMOVE_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: state.subscriptions.filter(subscription => {
          return !action.subscriptions.includes(subscription);
        })
      };
    default:
      return state;
  }
};

export default coinsReducer;
