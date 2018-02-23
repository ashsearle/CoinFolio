import _ from 'lodash';

import { firebase, googleAuthProvider } from '../firebase/firebase';
import apiConfig from '../config/api';
import uiConfig from '../config/ui';
import { getCache, setCache } from '../utils/cache';

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
  return dispatch => {
    const endpointKey = 'exchangeRates';
    const {
      url: ratesEndpoint,
      cache: cacheResponse,
      expiry: cacheExpiry
    } = apiConfig.endpoints[endpointKey];
    const { fiatCurrencies } = uiConfig;
    const currencies = fiatCurrencies
      .map(currency => currency.value)
      .filter(currency => currency !== 'USD')
      .join();

    if (cacheResponse) {
      const cache = getCache(endpointKey);
      if (cache) return dispatch(setRates(cache));
    }

    const endpoint = _.template(ratesEndpoint)({
      currencies
    });
    fetch(endpoint)
      .then(res => res.json())
      .then(({ rates }) => {
        if (cacheResponse) {
          setCache(endpointKey, rates, cacheExpiry);
        }
        dispatch(setRates(rates));
      });
  };
};
