import _ from 'lodash';

import { firebase, googleAuthProvider } from '../firebase/firebase';
import apiConfig from '../config/api';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const doLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const doLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const setRates = (rates = {}) => ({
  type: 'SET_EXCHANGE_RATES',
  rates
});

export const fetchExchangeRates = () => {
  return (dispatch, getState) => {
    const userCurrency = getState().user.currency;
    const { exchangeRates } = apiConfig;
    const cache = JSON.parse(sessionStorage.getItem('exchangeRates'));
    if (!userCurrency || userCurrency === 'USD') return;
    if (cache) return dispatch(setRates(cache));
    const endpoint = _.template(exchangeRates)({
      currency: userCurrency
    });
    fetch(endpoint)
      .then(res => res.json())
      .then(({ rates }) => {
        sessionStorage.setItem('exchangeRates', JSON.stringify(rates));
        dispatch(setRates(rates));
      });
  };
};
