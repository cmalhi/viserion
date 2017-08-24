 export default function (state = 'default title', action) {
  switch (action.type) {
    case 'ADD_TITLE':
      return action.payload
    default: 
      return state;
  }
}
