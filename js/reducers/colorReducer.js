export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_COLORS':
      const color = action.payload;
      return color;
    default: 
      return state;
  }
}
