 export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_COLOR':
      return [...action.payload.data, ...state];
  }
  return state;
}
