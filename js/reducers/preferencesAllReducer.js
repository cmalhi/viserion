const defaultPreferencesAll = [[{
  name: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#FB5B45',
    title: 'defaultTitle',
  },
},
{
  name: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
    text: 'defaultText',
  },
}], 
[{
  name: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#009AF2',
    title: 'defaultTitle',
  },
},
{
  name: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
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
