import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import './firebase/firebase';
import { firebase } from './firebase/firebase';

import { login, logout, fetchExchangeRates, getUserCurrency } from './actions/user';
import { fetchCurrencies, socketConnect } from './actions/currencies';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const store = configureStore();
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

firebase.auth().onAuthStateChanged(user => {
  console.log('onAuthStateChanged', user)
  if (user) {
    store.dispatch(login(user));
  } else {
    store.dispatch(logout());
    history.push('/');
  }
  store.dispatch(getUserCurrency());
  store.dispatch(fetchExchangeRates());
  store.dispatch(fetchCurrencies());
  store.dispatch(socketConnect());
  render(app, document.querySelector('.root'));
});
