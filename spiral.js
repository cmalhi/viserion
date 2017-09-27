function spiralTraversal (matrix) {
  // Write your code here, and
  // return your final answer.
  var res = [];
  // Recursion
  while(matrix) {
  res.push(matrix.shift());
    
  }
  console.log(res);
  

}

spiralTraversal([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11, 12 ], [ 13, 14, 15 ], [ 16, 17, 18 ], [ 19, 20, 21 ], [ 22, 23, 24 ] ]);
