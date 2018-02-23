import * as io from 'socket.io-client';
import _ from 'lodash';

import apiConfig from '../config/api';
import { getCache, setCache } from '../utils/cache';

export const setCurrencies = (currencies = []) => ({
  type: 'SET_CURRENCIES',
  currencies
});

export const fetchCurrencies = () => {
  return dispatch => {
    const endpointKey = 'allCurrencies';
    const {
      url: endpoint,
      cache: cacheResponse,
      expiry: cacheExpiry
    } = apiConfig.endpoints[endpointKey];

    if (cacheResponse) {
      const cache = getCache(endpointKey);
      if (cache) return dispatch(setCurrencies(cache));
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        if (cacheResponse) {
          setCache(endpointKey, json, cacheExpiry);
        }
        dispatch(setCurrencies(json));
      });
  };
};

export const updateCurrencies = (currencies = []) => ({
  type: 'UPDATE_CURRENCIES',
  currencies
});

const reduceCurrencies = (currency, currencies) =>
  _.uniqBy(currencies.concat(currency).reverse(), 'short');

export const socketConnect = () => {
  return dispatch => {
    const { url: endpoint } = apiConfig.endpoints.socket;
    const socket = io.connect(endpoint);
    let currencies = [];
    socket.on('trades', function({ msg }) {
      currencies = reduceCurrencies(msg, currencies);
    });
    const debounce = _.debounce(() => {
      dispatch(updateCurrencies(currencies));
      currencies = [];
      debounce();
    }, 5000);
    debounce();
  };
};
