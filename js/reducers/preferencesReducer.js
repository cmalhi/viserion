// TODO: Create default preferences state
const defaultPreferences = [{
  name: 'My Hero',
  componentName: 'hero',
  attr: {
    bgColor: 'defaultColor',
    title: 'defaultTitle',
  },
},
{
  name: 'My Footer',
  componentName: 'footer',
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
      return state
    default:
      return state;
  }
}

// Preferences has the shape of :
// [
//   {
//     "name": "<Hero />",
//     "attributes": {
//       "bgColor": "blue",
//       "title": "defaultTitle"
//     }
//   },
//   {
//     "name": "C1",
//     "attributes": {
//       "text": "defaultText"
//     }
//   },
//   {
//     "name": "<Footer />",
//     "attributes": {
//       "bgColor": "blue",
//       "text": "defaultText"
//     }
//   },
//   {
//     "name": "<Hero />",
//     "attributes": {
//       "bgColor": "blue",
//       "title": "defaultTitle"
//     }
//   },
//   {
//     "name": "C1",
//     "attributes": {
//       "text": "defaultText"
//     }
//   },
//   {
//     "name": "<Footer />",
//     "attributes": {
//       "bgColor": "blue",
//       "text": "defaultText"
//     }
//   }
// ]