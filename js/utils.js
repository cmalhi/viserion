/**
 * removeByValue
 * @param {Array} array
 * @param {Number} value
 */
exports.removeByValue = (array, value) => {
  var res = array.slice();
  return res.filter(function(elem, _index){
    return value != elem;
  });
};

/*
 * getObj()
 * Input:
 *  - objArr [ {1: 'hi', 2: 'bye}, {1: 'hello} ]
 *  - key: 1
 *  - value: 'hi'
 * Output:
 *  - {1: 'hi', 2: 'bye'}
 */
exports.getObj = (objArr, key, value) => {
  for (var i = 0; i < objArr.length; i++) {
    if (objArr[i][key] && objArr[i][key] === value) {
      return objArr[i]
    }
  }
  return false;
};

/*
 * getObj()
 * @params {Array} e.g. [ {1: 'hi', 2: 'bye}, {1: 'hello} ]
 * @params {String} e.g. '1'
 *
 * @output {Object} || {Boolean} if object with key not found
 *  e.g. {1: 'hi', 2: 'bye'}
 */
exports.getObjLoose = (objArr, key) => {
  for (var i = 0; i < objArr.length; i++) {
    if (objArr[i][key]) {
      return objArr[i]
    }
  }
  return false;
};

/*
 * updateComponent() takes components and modifies a component's
 * specific attribute with a target value
 *
 * @params {Array} array of components e.g. [ { c1 }, ..., { cn } ]
 * @params {String} id of component e.g. 'hero751'
 * @params {Array} path of attribute we want to change e.g. ['attr', 'title']
 * @params {String} new value e.g. 'Chetans Milk Shop'
 *
 * @output {Array} a list of components with the modified attribute
 */
exports.updateComponent = (components, id, path, value) => {
  console.log('components', components)
  var res = components.slice();
  // 1) Get target object we want to modify
  var target = exports.getObj(res, 'id', id);
  var index = res.indexOf(target);
  // 2) Create the path
  // Add index to path
  // So ['attr', 'title'] becomes [2, 'attr', 'title']
  var newPath = path.slice();
  newPath.unshift(index);
  var temp = res;

  // 3) Update the attribute
  for (var i = 0; i < newPath.length -1; i++) {
    temp = temp[newPath[i]]
  }

  temp[newPath[newPath.length - 1]] = value;
  return res;
};