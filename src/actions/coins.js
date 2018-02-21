import _ from "lodash";
//import { subscribeToSocket, unsubscribeToSocket } from '../socketio/socketio';
//import CCC from '../utils/socketio';
import apiConfig from "../config/api";

const {
  price: coinPriceEndpoint,
  price24h: coinPrice24HEndpoint
} = apiConfig.currencies;

export const addPrice = (price = {}) => ({
  type: "ADD_PRICE",
  price
});

export const addPrice24h = (price = {}) => ({
  type: "ADD_PRICE_24H",
  price
});

export const fetchPrices = (coins = []) => {
  return (dispatch, getState) => {
    const currentPrices = Object.keys(getState().coins.prices);
    const newPrices = _.difference(coins, currentPrices);
    // fetch coin prices
    const priceEndpoint = _.template(coinPriceEndpoint);
    const price24HEndpoint = _.template(coinPrice24HEndpoint);
    const currency = getState().user.currency;
    newPrices.forEach(coin => {
      // get current price
      const endpoint = priceEndpoint({
        coin: coin,
        currency: currency
      });
      fetch(endpoint)
        .then(res => res.json())
        .then(json => {
          dispatch(addPrice({ [coin]: json[currency] }));
        });
      // Get 24h price
      const endpoint24h = price24HEndpoint({
        coin: coin,
        currency: currency,
        timestamp: Date.now() - 8.64e7
      });
      fetch(endpoint24h)
        .then(res => res.json())
        .then(json => {
          dispatch(addPrice24h({ [coin]: json[coin][currency] }));
        });
    });
  };
};

/*
export const setSubscriptions = (subscriptions = []) => ({
  type: 'SET_SUBSCRIPTIONS',
  subscriptions
});

export const removeSubscriptions = (subscriptions = []) => ({
  type: 'REMOVE_SUBSCRIPTIONS',
  subscriptions
});

export const handleSubscriptions = (subscriptions = []) => {
  return (dispatch, getState) => {
    const currentSubscriptions = getState().prices.subscriptions;
    const newSubscriptions = _.difference(subscriptions, currentSubscriptions);
    const oldSubscriptions = _.difference(currentSubscriptions, subscriptions);
    //console.log('handleSubscriptions currentSubscriptions', currentSubscriptions);
    //console.log('handleSubscriptions newSubscriptions', newSubscriptions);
    //console.log('handleSubscriptions oldSubscriptions', oldSubscriptions)
    if (oldSubscriptions && oldSubscriptions.length) {
      unsubscribeToSocket(oldSubscriptions);
      dispatch(removeSubscriptions(oldSubscriptions));
    }
    if (newSubscriptions && newSubscriptions.length) {
      subscribeToSocket(newSubscriptions, (message) => {
        //console.log('subscribed to', newSubscriptions, message))
        const messageType = message.substring(0, message.indexOf("~"));
        let res = {};
        if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message);
          dataUnpack(res);
        }
      });
      dispatch(setSubscriptions(newSubscriptions));
    }
  }
};
*/
