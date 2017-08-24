export function toggleLayout(layoutId) {
  return {
    type: 'TOGGLE_LAYOUT',
    payload: layoutId
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

