import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA8mKgMWBw5ZrA2RAJhJtmVKoLlnFgkP8Y',
  authDomain: 'livecryptoportfolio.firebaseapp.com',
  databaseURL: 'https://livecryptoportfolio.firebaseio.com',
  projectId: 'livecryptoportfolio',
  storageBucket: 'livecryptoportfolio.appspot.com',
  messagingSenderId: '986033857664'
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { googleAuthProvider, firebase, database as default };
