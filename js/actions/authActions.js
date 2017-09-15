import firebase from '../../database/firebase';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { HOST } from '../../global.js';

function loginRequest() {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isLoggedIn: false,
  }
}

function loginSuccess(user) {
  const { email, displayName = null, uid } = user;
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isLoggedIn: true,
    username: email,
    displayName,
    userId: uid,
  }
}

function loginError(error) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isLoggedIn: false,
    error,
  }
}

export function loginOrSignUpUser() {
  return dispatch => {
    dispatch(loginRequest())
    const user = firebase.auth().currentUser;
      if (user) {
        axios.post(`${global.HOST}/signup`, {
          userId: user.uid
        })
        .then(success => console.log('Used created', success))
        .catch(err => console.log('Error creating user', err))
        // Retrieve JWT token and set on AsyncStorage
        user.getIdToken()
          .then((tokenId) => {
            AsyncStorage.multiSet([['username', user.email || user.displayName], ['token', tokenId], ['userId', user.uid]]);
          });
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginError(err));
      }
  }
}