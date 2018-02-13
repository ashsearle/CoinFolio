import apiConfig from '../config/api';

const { all: allCurrenciesEndpoint } = apiConfig.currencies;

export const setCurrencies = (currencies = []) => ({
  type: 'SET_CURRENCIES',
  currencies
});

export const fetchCurrencies = () => {
  return (dispatch) => {
    const cache = JSON.parse(sessionStorage.getItem('allCurrencies'));
    if (cache) return dispatch(setCurrencies(cache));
    fetch(allCurrenciesEndpoint)
      .then(res => res.json())
      .then((json) => {
        sessionStorage.setItem('allCurrencies', JSON.stringify(json));
        dispatch(setCurrencies(json));
      });
  }
};