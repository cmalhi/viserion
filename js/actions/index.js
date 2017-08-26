import _ from 'lodash';
import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8080';

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

export function addColors(color) {
  return {
    type: 'ADD_COLORS',
    payload: color
  }
}

export function postPreferences() {
  return (dispatch, getState) => {
    const { layouts, colors, title } = getState();

    //  Collect layouts that from global state that are true
    const layout = _.reduce(layouts, (result, layoutStatus, layoutId) => {
      if (layoutStatus === true ) result.push(layoutId);
      return result;
    }, []);

    // Collect colors from global state that are true
    const color = _.reduce(colors, (result, colorStatus, color) => {
      if (colorStatus === true ) result.push(color);
      return result;
    }, []);

    axios.post(`${ROOT_URL}/preferences`, {
      layout: layout,
      color: color,
      title: title,
    })
      .then(response => {
      console.log('axios posted', response.data);
      dispatch({
        type: 'POST_PREFERENCES',
        payload: response,
      })
    })
      .catch(err => console.log(err));
  }
}