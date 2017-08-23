 export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_LAYOUT':
      return [...action.payload.data, ...state];
  }
  return state;
}
