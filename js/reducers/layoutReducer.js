export default function (state = ['PinterestContent'], action) {
  switch (action.type) {
    case 'ADD_LAYOUTS':
      return action.payload;
    default:
      return state;
  }
}
