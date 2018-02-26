import _ from 'lodash';

const currenciesReducerDefaultState = {
  all: [],
  trends: [],
  history: {}
};
const currenciesReducer = (state = currenciesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENCIES':
      return {
        ...state,
        all: [...state.all, ...action.currencies]
      };
    case 'UPDATE_CURRENCIES':
      return {
        ...state,
        all: _.orderBy(
          _.uniqBy(state.all.concat(action.currencies).reverse(), currency => {
            return currency.short;
          }),
          'mktcap'
        ).reverse()
      };
    case 'UPDATE_TRENDS':
      return {
        ...state,
        trends: _.uniqBy(
          state.trends.concat(action.trends).reverse(),
          trend => {
            return trend.short;
          }
        )
      };
    case 'SET_COIN_HISTORY':
      return {
        ...state,
        history: {
          ...state.history,
          [action.coin]: {
            ...state.history[action.coin],
            ...action.data
          }
        }
      };
    default:
      return state;
  }
};

export default currenciesReducer;
