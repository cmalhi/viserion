export default function (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_LAYOUT':
      const layoutId = action.payload;
      var layoutStatus = true;
      if (state[layoutId]){
        layoutStatus = false;
      }
      return Object.assign({}, state, {[layoutId]: layoutStatus})
    default: 
      return state
  }
}
