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

export function loginUser() {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(loginRequest())
    const user = firebase.auth().currentUser;
      if (user) {
        console.log('user found >>>>>>>', user);
        axios.post('/signup', {
          userId: user.uid
        })
        .then(success => console.log('Used created', sucess));
        // Retrieve JWT token and set on AsyncStorage
        user.getIdToken()
          .then((tokenId) => {
            AsyncStorage.multiSet([['username', user.email], ['token', tokenId], ['userId', user.uid]]);
          });
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginError(err));
      }
  }
}