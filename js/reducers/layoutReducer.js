export default function (state = ['PinterestContent', 'ImageCaption'], action) {
  switch (action.type) {
    case 'ADD_LAYOUTS':
      console.log('add layouts', action.payload);
      const layouts = action.payload;
      return layouts.length ? layouts : state;
    default:
      return state;
  }
}
