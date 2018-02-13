import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currenciesReducer from '../reducers/currencies';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      currencies: currenciesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};