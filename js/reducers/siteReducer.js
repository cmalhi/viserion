export default function (state = '', action) {
  switch (action.type) {
    case 'SELECT_SITE':
      return action.payload;
    case 'EDIT_SITE':
      return  action.payload;
    default: 
      return state;
  }
}