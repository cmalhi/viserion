 export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_KEYWORDS':
      const keywords = action.payload;
      return keywords;
    default: 
      return state;
  }
}
