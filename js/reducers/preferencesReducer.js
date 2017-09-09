// default preferences state
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
    // state is the obj that we are changing: state[0].attr.id
      var findIndex = function(id) {
        var index = 'NOT FOUND';
        for (var i = 0; i < defaultPreferences.length; i++) {
          if (defaultPreferences[i].attr.id === id) {
            index = i;
          }
        }
        return index;
      }

      Object.byString = function(o, s, newpref) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
          var k = a[i];
          if (k in o) {
            o = o[k];
          } else {
            return;
          }
        }
        o = newpref
        return o;
      }

      var index = findIndex(action.payload.id);

      Object.byString(defaultPreferences, '[' + index + '].attr.title', 'replaceddddd');
      //action.payload is a change and a path
      // {
      //   id: 12
      //   path: [index].attr.body1
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
