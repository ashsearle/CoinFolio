import apiConfig from '../config/api';
import { getDeepCache, setDeepCache } from '../utils/cache';
import _ from 'lodash';

const getPriceHistorical = (fromSym, toSym, timestamp) => {
  const endpointKey = 'priceHistorical';
  const deepCacheKey = fromSym + toSym + timestamp;

  const {
    url,
    cache: cacheResponse,
    expiry: cacheExpiry
  } = apiConfig.endpoints[endpointKey];

  const endpoint = _.template(url)({
    fromSym: fromSym.toUpperCase(),
    toSym: toSym.toUpperCase(),
    timestamp: timestamp
  });

  if (cacheResponse) {
    const cache = getDeepCache(endpointKey, deepCacheKey);
    if (cache) return Promise.resolve(cache);
  }

  return fetch(endpoint)
    .then(res => res.json())
    .then(json => {
      if (cacheResponse) {
        setDeepCache(endpointKey, deepCacheKey, json, cacheExpiry);
      }
      return json;
    })
    .catch(e => e);
};

export { getPriceHistorical };
