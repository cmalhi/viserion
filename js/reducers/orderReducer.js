export default function (state = [], action) {
  switch (action.type) {
    case 'CHANGE_ORDER':
      const order = action.payload;
      console.log('order reducer > > ', order);
      return order;
    default: 
      return state;
  }
}
