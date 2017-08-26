 export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_COLORS':
      const color = action.payload;
      console.log('the status of ', color);
      return [
        ...state,
        color
      ]
    default: 
      return state;
  }
}
