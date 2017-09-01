import { AsyncStorage } from 'react-native';

const defaultAuthState = {
  isFetching: false,
  isLoggedIn: false,
  username: '',
  displayName: '',
  userId: '',
};

const getLoggedIn = () => {
  AsyncStorage.muliGet(['username', 'token', 'userId']);
};

export default function (state = defaultAuthState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {

      });
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        
      });
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        
      });
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        
      });
    default:
      return state;
  }
}
