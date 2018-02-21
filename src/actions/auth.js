import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const doLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const doLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
