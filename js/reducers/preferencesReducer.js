// TODO: Create default preferences state
const defaultPreferences = [{
  name: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: 'defaultColor',
    title: 'defaultTitle',
  },
},
{
  name: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: 'defaultColor',
    text: 'defaultText',
  },
}];

export default function (state = defaultPreferences, action) {
  switch (action.type) {
    case 'CREATE_PREFERENCES':
      const preferences = action.payload;
      return preferences;
    case 'APPEND_PREFS':
      var newComp = action.payload;
      state = [...state, newComp];
      return state;
    default:
      return state;
  }
}
