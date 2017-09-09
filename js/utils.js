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