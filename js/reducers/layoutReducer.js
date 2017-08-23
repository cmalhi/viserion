 export default function (state = {}, action) {
  switch (action.type) {
    case 'ADD_LAYOUT':
      return Object.assign({}, state, {[action.payload]: true})
    case 'REMOVE_LAYOUT':
      return Object.assign({}, state, {[action.payload]: false})
    default: 
      return state
  }
}
