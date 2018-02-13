import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import './firebase/firebase';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';

import './style.css';

const store = configureStore();
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
render(app, document.querySelector('.root'));


firebase.auth().onAuthStateChanged((user) => {
  console.log('onAuthStateChanged', user);
  if (user) {
    store.dispatch(login(user.uid));
    /*
    if (history.location.pathName === '/') {
      history.push('/dashboard');
    }
    */
  }
  else {
    store.dispatch(logout())
    history.push('/');
  }
});
