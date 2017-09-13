export default function (state = {}, action) {
  switch (action.type) {
    case 'APPEND_ORDER':
      const componentId = action.payload;
      var componentStatus = true;
      if (state[componentId]){
        componentStatus = false;
      }
      return Object.assign({}, state, {[componentId]: componentStatus})
    default: 
      return state
  }
}
