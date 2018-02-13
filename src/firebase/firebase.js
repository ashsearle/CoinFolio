import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCegjs9WWYdgSznP0SAdMkcpTTMZXscHXI",
  authDomain: "expensify-99c3e.firebaseapp.com",
  databaseURL: "https://expensify-99c3e.firebaseio.com",
  projectId: "expensify-99c3e",
  storageBucket: "expensify-99c3e.appspot.com",
  messagingSenderId: "598930902744"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  googleAuthProvider,
  firebase,
  database as default
}

/*
database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];
  snapshot.forEach((child) => {
    expenses.push({
      id: child.key,
      ...child.val()
    });
  });
  console.log('expenses', expenses);
});
*/
