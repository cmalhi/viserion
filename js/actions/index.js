export function addLayout(layout) {
  return {
    type: 'ADD_LAYOUT',
    payload: layout
  }
}
export function addTitle(title) {
  return {
    type: 'ADD_TITLE',
    payload: title
  }
}
export function toggleColor(color) {
  return {
    type: 'TOGGLE_COLOR',
    payload: color
  }
}
