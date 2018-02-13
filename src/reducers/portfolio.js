// Expenses reducer
const portfolioReducerDefaultState = [];
const portfolioReducer = (state = portfolioReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PORTFOLIOS':
      return action.portfolios;
    case 'ADD_PORTFOLIO':
      return [
        ...state,
        action.portfolio
      ]
    case 'EDIT_PORTFOLIO':
      return state.map((portfolio) => {
        if (portfolio.id === action.id) {
          return {
            ...portfolio,
            ...action.updates
          }
        }
        else {
          return portfolio;
        }
      })
    case 'REMOVE_PORTFOLIO':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}

export default portfolioReducer;