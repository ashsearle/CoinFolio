import _ from 'lodash';

const currenciesReducerDefaultState = [];
const currenciesReducer = (state = currenciesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENCIES':
      return action.currencies;
    case 'UPDATE_CURRENCIES':
      return _.orderBy(
        _.uniqBy(state.concat(action.currencies).reverse(), currency => {
          return currency.short;
        }),
        'mktcap'
      ).reverse();
    default:
      return state;
  }
};

export default currenciesReducer;
