 export default function (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_COLOR':
      const color = action.payload;
      var colorStatus = true;
      if (state[color]){
        colorStatus = false;
      }
      console.log('the status of ', color, 'is ', colorStatus);
      return Object.assign({}, state, {[action.payload]: colorStatus})
    default: 
      return state;
  }
}
