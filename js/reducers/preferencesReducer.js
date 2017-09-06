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