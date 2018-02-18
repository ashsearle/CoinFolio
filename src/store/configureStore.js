import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currenciesReducer from '../reducers/currencies';
import userReducer from '../reducers/user';
import portfolioReducer from '../reducers/portfolio';
import coinsReducer from '../reducers/coins';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      currencies: currenciesReducer,
      portfolio: portfolioReducer,
      coins: coinsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};