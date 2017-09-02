import { AsyncStorage } from 'react-native';

const defaultAuthState = {
  isFetching: false,
  isLoggedIn: false,
  username: '',
  displayName: '',
  userId: '',
};

const getLoggedIn = () => {
  AsyncStorage.muliGet(['username', 'token', 'userId'])
    // Set AsycnStorage values to global auth state
    .then((stores) => {
      stores.forEach((value, key) => {
        defaultAuthState[key] = value;
      });
    });
};

export default function (state = defaultAuthState, action) {
  const { username, userId, displayName = null } = action;
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        username,
        displayName,
        userId,
      });
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
      });
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isLoggedIn: false,
      });
    default:
      return state;
  }
}
