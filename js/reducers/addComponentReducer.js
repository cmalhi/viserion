export default function (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_COMP':
      const componentId = action.payload;
      var componentStatus = true;
      if (state[componentId]){
        componentStatus = false;
      }
      return Object.assign({}, state, {[layoutId]: componentStatus})
    default: 
      return state
  }
}
