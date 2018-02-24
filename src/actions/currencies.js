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
      dispatch(getTrends(currencies));
      dispatch(updateCurrencies(currencies));
      currencies = [];
      debounce();
    }, 5000);
    debounce();
  };
};

export const updateTrends = (trends = []) => ({
  type: 'UPDATE_TRENDS',
  trends
});

export const getTrends = updatedCurrencies => {
  return (dispatch, getState) => {
    const currentCurrencies = getState().currencies.all;
    const trends = [];
    if (currentCurrencies.length) {
      updatedCurrencies.forEach(updatedCurrency => {
        const currentCurrency = _.find(currentCurrencies, current => {
          return current.short === updatedCurrency.short;
        });
        const currentPrice = currentCurrency.price;
        const updatedPrice = updatedCurrency.price;
        trends.push({
          short: updatedCurrency.short,
          trend: updatedPrice > currentPrice ? 'up' : 'down'
        });
      });
      dispatch(updateTrends(trends));
    }
  };
};
