export default function (state = ['ImageCaption'], action) {
  switch (action.type) {
    case 'ADD_LAYOUTS':
      return action.payload;
    default:
      return state;
  }
}
