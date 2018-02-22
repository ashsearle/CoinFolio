import * as io from 'socket.io-client';
import _ from 'lodash';

import apiConfig from '../config/api';

export const setCurrencies = (currencies = []) => ({
  type: 'SET_CURRENCIES',
  currencies
});

export const fetchCurrencies = () => {
  return dispatch => {
    const { all: endpoint } = apiConfig.currencies;
    const cache = JSON.parse(sessionStorage.getItem('allCurrencies'));
    if (cache) return dispatch(setCurrencies(cache));
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem('allCurrencies', JSON.stringify(json));
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
    const { socket: endpoint } = apiConfig.currencies;
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
