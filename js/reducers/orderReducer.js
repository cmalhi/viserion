 export default function (state = [], action) {
  switch (action.type) {
    case 'CHANGE_ORDER':
      const order = action.payload;
      return order;
    default: 
      return state;
  }
}
