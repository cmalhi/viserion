export function addLayout(layout) {
  return {
    type: 'ADD_LAYOUT',
    payload: layout
  }
}

export function addColor(color) {
 return {
   type: 'ADD_COLOR',
   payload: color
 }

}

export function addTitle(title) {
  return {
    type: 'ADD_TITLE',
    payload: title
  }
}