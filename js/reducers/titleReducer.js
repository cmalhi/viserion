export default function (state = 'Your Site', action) {
  switch (action.type) {
    case 'ADD_TITLE':
      return action.payload;
    default:
      return state;
  }
}
