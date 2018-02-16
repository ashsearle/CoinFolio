// Expenses reducer
const portfolioReducerDefaultState = [];
const portfolioReducer = (state = portfolioReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return action.portfolio;
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
    case 'ADD_TRANSACTION':
      return state.map((portfolio) => {
        if (portfolio.id === action.portfolioId) {
          return {
            ...portfolio,
            transactions: [
              ...portfolio.transactions || [],
              action.transaction
            ]
          }
        }
        return portfolio;
      })
    default:
      return state
  }
}

export default portfolioReducer;