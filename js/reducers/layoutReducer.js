 export default function (state = {}, action) {
  switch (action.type) {
    case 'ADD_LAYOUT':
      return Object.assign({}, state, {[action.payload.data]: true})
    case 'REMOVE_LAYOUT':
      return Object.assign({}, state, {[action.payload.data]: false})
    default: 
      return state
  }
}
