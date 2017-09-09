export default function(action, state) {
    // state is the obj that we are changing: state[0].attr.id
  console.log('PREFERENCE REDUCER ==== ', action);
  var findIndex = function(id) {
    var index = 'NOT FOUND';
    for (var i = 0; i < state.length; i++) {
      if (state[i].id === id) {
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

  var index = findIndex(action.id);
  
  console.log(action.path)
  
  var insertIndexInPath = function(path, index) {
    var newPath = Array.from(path);
    newPath.unshift(index);
    return newPath;
  }
  
  console.log()
  
  var path = insertIndexInPath(action.path, index)
  
  var updatedPrefs = changeValue(path, action.newValue, state);

  //action is a change and a path
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
}