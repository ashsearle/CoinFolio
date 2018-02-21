import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import './firebase/firebase';
import { firebase } from './firebase/firebase';

import { login, logout } from './actions/auth';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const store = configureStore();
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

firebase.auth().onAuthStateChanged(user => {
  console.log('onAuthStateChanged', user);
  if (user) {
    store.dispatch(login(user.uid));
  } else {
    store.dispatch(logout());
    history.push('/');
  }
  render(app, document.querySelector('.root'));
});
