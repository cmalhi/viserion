// TODO: Create default preferences state
const defaultPreferences = [{
  nickName: 'My Hero',
  componentName: 'Hero',
  attr: {
    id: 'hero',
    bgColor: 'defaultColor',
    title: 'defaultTitle',
  },
},
{
  nickName: 'My Footer',
  componentName: 'Footer',
  attr: {
    id: 'footer',
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
    case 'UPDATE_PREFS':
      state = action.payload;
    case 'CHANGE_PREFS':
      //action.payload is a change and a path
      // {
      //   id: 12
      //   path: components[index].attr.body1
      //   change: 'Im the new text sent in from the modal',
      //   
      // }
      // find index from current preferences state
      // components[index][attr][thing][possible nested step]
      return state;
    default:
      return state;
  }
}
