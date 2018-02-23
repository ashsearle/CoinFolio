const stringify = d =>
  d === undefined || typeof d === 'function' ? '' : JSON.stringify(d);
const parse = s => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return s;
  }
};

const getCache = key => {
  const cache = parse(sessionStorage.getItem(key));
  return cache && cache.expiry > Date.now() ? cache.data : null;
};

const setCache = (key, data = {}, expiry = 0) => {
  const obj = {
    expiry: Date.now() + expiry,
    data: data
  };
  sessionStorage.setItem(key, stringify(obj));
};

export { getCache, setCache };
