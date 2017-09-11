// default preferences state
const defaultPreferences = [{
  id: 'hero24',
  nickName: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: 'defaultColor',
    title: 'Title',
  },
},
{
  id: 'footer12',
  nickName: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: 'defaultColor',
    text: 'Footer',
  },
}];

export default function (state = defaultPreferences, action) {
  switch (action.type) {
    case 'SELECT_PREFERENCES':
      const preferences = action.payload;
      return preferences;
    case 'APPEND_PREFS':
      var newComp = action.payload;
      state = [...state, newComp];
      return state;
    case 'UPDATE_PREFS':
      state = action.payload;
      return state;
    default:
      return state;
  }
}
