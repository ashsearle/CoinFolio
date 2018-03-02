// Expenses reducer
const portfolioReducerDefaultState = [];
const portfolioReducer = (state = portfolioReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return action.portfolio;
    case 'ADD_PORTFOLIO':
      return [...state, action.portfolio];
    case 'EDIT_PORTFOLIO':
      return state.map(portfolio => {
        if (portfolio.id === action.id) {
          return {
            ...portfolio,
            ...action.updates
          };
        } else {
          return portfolio;
        }
      });
    case 'REMOVE_PORTFOLIO':
      return state.filter(portfolio => portfolio.id !== action.id);
    case 'ADD_TRANSACTION':
      return state.map(portfolio => {
        if (portfolio.id === action.portfolioId) {
          return {
            ...portfolio,
            transactions: [
              ...(portfolio.transactions || []),
              action.transaction
            ]
          };
        }
        return portfolio;
      });
    case 'EDIT_TRANSACTION':
      return state.map(portfolio => {
        if (portfolio.id === action.portfolioId) {
          return {
            ...portfolio,
            transactions: portfolio.transactions.map(transaction => {
              if (transaction.id === action.transactionId) {
                return {
                  ...transaction,
                  ...action.transaction
                };
              }
              return transaction;
            })
          };
        }
        return portfolio;
      });
    case 'REMOVE_TRANSACTION':
      return state.map(portfolio => {
        if (portfolio.id === action.portfolioId) {
          return {
            ...portfolio,
            transactions: portfolio.transactions.filter(
              ({ id }) => id !== action.transactionId
            )
          };
        }
        return portfolio;
      });
    default:
      return state;
  }
};

export default portfolioReducer;
