export default function (state = '', action) {
  switch (action.type) {
    case 'ADD_SITE':
    console.log('New Site was added',action.payload);
      return action.payload
    default: 
      return state;
  }
}