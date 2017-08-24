 export default function (state = 'default title', action) {
  switch (action.type) {
    case 'ADD_TITLE':
    console.log('Title was added',action.payload);
      return action.payload
    default: 
      return state;
  }
}
