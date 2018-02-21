import apiConfig from '../config/api';
import _ from 'lodash';

const { all: allCurrenciesEndpoint } = apiConfig.currencies;

export const setCurrencies = (currencies = []) => ({
  type: 'SET_CURRENCIES',
  currencies
});

export const fetchCurrencies = () => {
  return (dispatch, getState) => {
    const cache = JSON.parse(sessionStorage.getItem('allCurrencies'));
    const endpoint = 
      _.template(allCurrenciesEndpoint)(
        {
          'currency': getState().user.currency
        }
      );
    if (cache) return dispatch(setCurrencies(cache));
    fetch(endpoint)
      .then(res => res.json())
      .then((json) => {
        sessionStorage.setItem('allCurrencies', JSON.stringify(json));
        dispatch(setCurrencies(json));
      });
  }
};