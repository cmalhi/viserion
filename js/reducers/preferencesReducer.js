// TODO: Create default preferences state
export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_PREFERENCES':
      const preferences = action.payload;
      return preferences;
    default:
      return state;
  }
}
