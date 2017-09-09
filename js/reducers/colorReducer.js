const defaultColors = ['#8565F3', '#A6EEDA'];

export default function (state = defaultColors, action) {
  switch (action.type) {
    case 'ADD_COLORS':
      const color = action.payload;
      return color;
    default: 
      return state;
  }
}
