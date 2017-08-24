import axios from 'axios';
import _ from 'lodash';
const ROOT_URL = 'https://localhost:8080'
// Receives a JSON of type { layout: [], color: [], title: '' }

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

export function postPreferences() {
  return (dispatch, getState) => {
    console.log('post to preferences');
    const { layouts, colors, title } = getState();

    //  Collect layouts that are true
    const layout = _.reduce(layouts, (result, layoutStatus, layoutId) => {
      if (layoutStatus === true ) result.push(layoutId);
      return result;
    }, []);
    const color = _.reduce(colors, (result, colorStatus, color) => {
      if (colorStatus === true ) result.push(color);
      return result;
    }, []);
    console.log('layout: ', layout);
    console.log('color :', color);
    console.log('title :', title);

    axios.post(`${ROOT_URL}/preferences`, {
      layout: layout,
      color: color,
      title: title,
    })
      .then(data => {
      console.log('axios posted', data);
      dispatch({
        type: 'POST_PREFERENCES',
        payload: data,
      })
    })
      .catch(err => console.log(err));
  }
}
