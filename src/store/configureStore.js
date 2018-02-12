import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import marketsReducer from '../reducers/markets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      markets: marketsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};