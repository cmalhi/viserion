const defaultPreferencesAll = [[{
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
}]];

export default function (state = defaultPreferencesAll, action) {
  switch (action.type) {
    case 'CREATE_PREFERENCES':
      const preferences = action.payload;
      return preferences;
    default:
      return state;
  }
}
