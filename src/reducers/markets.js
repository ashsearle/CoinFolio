const marketsReducerDefaultState = [];
const marketsReducer = (state = marketsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MARKETS':
      return action.markets;
    default:
      return state
  }
}

export default marketsReducer;