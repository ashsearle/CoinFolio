import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currenciesReducer from '../reducers/currencies';
import userReducer from '../reducers/user';
import portfolioReducer from '../reducers/portfolio';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      currencies: currenciesReducer,
      portfolio: portfolioReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
