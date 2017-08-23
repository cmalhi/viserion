 export default function (state = "", action) {
  switch (action.type) {
    case 'ADD_TITLE':
      return action.payload.data;
  }
  return state;
}
