import apiConfig from '../config/api';

const { all: allMarketsEndpoint } = apiConfig.markets;

export const setMarkets = (markets = []) => ({
  type: 'SET_MARKETS',
  markets
});

export const fetchMarkets = () => {
  return (dispatch) => {
    const cache = sessionStorage.getItem('allMarkets');
    console.log('cache', JSON.parse(cache))
    if (cache) return dispatch(setMarkets(JSON.parse(cache)));
    fetch(allMarketsEndpoint)
      .then(res => res.json())
      .then((json) => {
        sessionStorage.setItem('allMarkets', JSON.stringify(json));
        dispatch(setMarkets(json));
      });
  }
};