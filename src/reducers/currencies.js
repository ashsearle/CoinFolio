const currenciesReducerDefaultState = [];
const currenciesReducer = (state = currenciesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENCIES':
      return action.currencies;
    default:
      return state
  }
}

export default currenciesReducer;