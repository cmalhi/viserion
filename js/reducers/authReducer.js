const defaultAuthState = {
  isFetching: true,
  isLoggedIn: false,
  username: '',
  displayName: '',
  userId: '',
};

export default function (state = defaultAuthState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return state;
    case 'LOGOUT_SUCCESS':
      return state;
    case 'LOGIN_FAILURE':
      return state;
    case 'LOGOUT_SUCCESS':
      return state;
    default:
      return state;
  }
}
