import _ from 'lodash';
import axios from 'axios';
import componentMap from '../componentMap';
import { AsyncStorage } from 'react-native';
import prefToHtml from '../utils/prefToHtml';

const combineDesires = (desires) => {
  console.log('combineDesires called');
  let preferences = [];
  desires.layouts.forEach(layout => {
    desires.colors.forEach((color, index) => {
      let heroColor = Object.assign({}, componentMap['Hero'], {attr: { ...componentMap['Hero'].attr } });
      heroColor.attr.title = desires.title;
      heroColor.attr.bgColor = color;

      let footerColor = Object.assign({}, componentMap['Footer'], {attr: { ...componentMap['Footer'].attr, bgColor: color}});
      footerColor.attr.bgColor = color;

      let content = Object.assign({}, componentMap[layout]);
      preferences.push([heroColor, content, footerColor]);
    });
  });
  return preferences;
};

export function addLayouts(layouts) {
  return {
    type: 'ADD_LAYOUTS',
    payload: layouts,
  }
}

export function addTitle(title) {
  return {
    type: 'ADD_TITLE',
    payload: title,
  }
}

export function addSite(site) {
  return {
    type: 'ADD_SITE',
    payload: site,
  }
}

export function addColors(color) {
  return {
    type: 'ADD_COLORS',
    payload: color,
  }
}

export function addKeywords(keywords) {
  return {
    type: 'ADD_KEYWORDS',
    payload: keywords,
  }
}

// export function changeOrder(order) {
//   return {
//     type: 'CHANGE_ORDER',
//     payload: order
//   }
// }
//
// export function appendOrder(itemsToAdd) {
//   return {
//     type: 'APPEND_ORDER',
//     payload: itemsToAdd
//   }
// }

export function appendPrefs(newComponent) {
  return {
    type: 'APPEND_PREFS',
    payload: newComponent
  }
}

export function updatePrefs(newPrefs) {
  return {
    type: 'UPDATE_PREFS',
    payload: newPrefs,
  }
}

export const createPreferences = () => (dispatch, getState) => {
  const { layouts, colors, title, keywords } = getState();

  //  Collect layouts that from global state that are true
  // const layoutsArr = _.reduce(layouts, (result, layoutStatus, layoutId) => {
  //   if (layoutStatus === true ) result.push(layoutId);
  //   return result;
  // }, []);

  const desires = {
    layouts,
    keywords,
    colors,
    title,
  };

  const preferences = combineDesires(desires);
  dispatch({ type: 'CREATE_PREFERENCES', payload: preferences });
};

export const selectPreferences = (selectedIndex) => (dispatch, getState) => {
  const { preferencesAll } = getState();
  const selectedPreferences = preferencesAll[selectedIndex];
  AsyncStorage.setItem('preferences', JSON.stringify(selectedPreferences));
  dispatch({ type: 'SELECT_PREFERENCES', payload: selectPreferences });
}

export const savePreferences = () => (dispatch, getState) => {
  const { preferences } = getState();
  const html = prefToHtml(preferences);
  AsyncStorage.getItem('userId')
    .then((userId = '66') => {
      axios.post(`${global.HOST}/sites`, {
        userId,
        preferences,
        html
      })
    })
  dispatch({ type:'SAVE_PREFERENCES', payload: preferences })
}

// Loads cached pereferences from AsyncStorage if found
export const loadPreferences = () => (dispatch) => {
  AsyncStorage.getItem('preferences')
    .then(preferencesStr => {
      const preferences = JSON.parse(preferencesStr);
      dispatch({type:'LOAD_PREFERENCES', found: true, payload: preferences});
    })
    .catch(error => {
      dispatch({type:'LOAD_PREFERENCES', found: false, payload: null});
    })
}


export function postPreferences(navigateToNext) {
  return (dispatch, getState) => {
    const { layouts, colors, title, keywords, order } = getState();

    //  Collect layouts that from global state that are true
    const layoutsArr = _.reduce(layouts, (result, layoutStatus, layoutId) => {
      if (layoutStatus === true ) result.push(layoutId);
      return result;
    }, []);

    // Preferences posted to generate templates
    axios.post(`${global.HOST}/generate`, {
      layouts: layoutsArr,
      colors: colors,
      title: title,
      keywords: keywords,
    })
      .then(response => {
        console.log('axios posted to generate templates ', response.data);
        navigateToNext();
    })
      .catch(err => console.log(err));

    // Preferences are stored in user table
    axios.post(`${global.HOST}/preferences`, {
      layouts: layoutsArr,
      colors: colors,
      title: title,
      keywords: keywords,
    })
      .then(response => {
      dispatch({
        type: 'POST_PREFERENCES',
        payload: response,
      })
    })
      .catch(err => console.log(err));
  }
}
