import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCuh954DyiYIBI4OrF5I22zwzem8Tb_Ieo',
  authDomain: 'koindash.firebaseapp.com',
  databaseURL: 'https://koindash.firebaseio.com',
  projectId: 'koindash',
  storageBucket: 'koindash.appspot.com',
  messagingSenderId: '154677945718'
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export { googleAuthProvider, facebookAuthProvider, twitterAuthProvider, firebase, database as default };
