import _ from 'lodash';

import { firebase, googleAuthProvider, facebookAuthProvider, twitterAuthProvider } from '../firebase/firebase';
import apiConfig from '../config/api';
import uiConfig from '../config/ui';
import { getCache, setCache } from '../utils/cache';

export const login = user => ({
  type: 'LOGIN',
  user
});

export const doGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const doFacebookLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider);
  };
};

export const doTwitterLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(twitterAuthProvider);
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

export const setUserCurrency = (fiatCurrency = {}) => ({
  type: 'SET_USER_CURRENCY',
  fiatCurrency
});

export const startSetUserCurrency = (fiatCurrency = {}) => {
  return dispatch => {
    setCache('fiatCurrency', fiatCurrency, 2592000);
    dispatch(setUserCurrency(fiatCurrency));
  }
};

export const getUserCurrency = () => {
  return dispatch => {
    const cache = getCache('fiatCurrency');
    if (cache) {
      dispatch(setUserCurrency(cache));
    }
  }
};
