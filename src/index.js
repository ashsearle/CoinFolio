import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import './firebase/firebase';
import { firebase } from './firebase/firebase';

import { login, logout, fetchExchangeRates } from './actions/user';
import { fetchCurrencies, socketConnect } from './actions/currencies';

import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const store = configureStore();
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
  } else {
    store.dispatch(logout());
    history.push('/');
  }
  store.dispatch(fetchExchangeRates());
  store.dispatch(fetchCurrencies());
  store.dispatch(socketConnect());
  render(app, document.querySelector('.root'));
});
