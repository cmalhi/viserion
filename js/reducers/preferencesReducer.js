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
    case 'SELECT_PREFERENCES':
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
    console.log('PREFERENCE REDUCER ==== ', action.payload);
     var findIndex = function(id) {
        var index = 'NOT FOUND';
        for (var i = 0; i < state.length; i++) {
          if (state[i].attr.id === id) {
            index = i;
          }
        }
        return index;
      }

      var changeValue = function(path, newValue, obj) {
        // takes in path
        // checks every arguments [] properties
        // TODO: if path doesnt exist send error message (path does not exist)

        // sample input path: ['attr', 'texts', 1, 'text'];
        // after the dins index function it should look like this: ['2', attr', 'texts', 1, 'text'];

        var newPrefs = Object.create(obj)
        var head = newPrefs;
        for (var i = 0; i < path.length - 1; i++) {
          head = head[path[i]];
        }
        head[path[path.length - 1]] = newValue;
        return newPrefs;
      }

      var index = findIndex(action.payload.id);
      
      console.log(action.payload.path)
      
      var insertIndexInPath = function(path, index) {
        var newPath = Array.from(path);
        newPath.unshift(index);
        return newPath;
      }
      
      console.log()
      
      var path = insertIndexInPath(action.payload.path, index)
      
      var updatedPrefs = changeValue(path, action.payload.newValue, state);

      //action.payload is a change and a path
      // {
      //   id: 12
      //   path: [index].attr.body1
      //   change: 'Im the new text sent in from the modal',
      //   
      // }
      // find index from current preferences state
      // components[index][attr][thing][possible nested step]
      console.log('>>>>>>>', updatedPrefs[2])
      state = updatedPrefs;
      return state;
    default:
      return state;
  }
}
