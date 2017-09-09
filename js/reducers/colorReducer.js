const defaultColors = ['#A6EEDA', '#8565F3'];

export default function (state = defaultColors, action) {
  switch (action.type) {
    case 'ADD_COLORS':
      const color = action.payload;
      return color;
    default: 
      return state;
  }
}
