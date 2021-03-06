import _ from 'lodash';
import axios from 'axios';
import componentMap from '../componentMap';
import { AsyncStorage } from 'react-native';
import prefToReactify from '../../app/utils/prefToReactify';
import { selectSite } from './siteActions';

var id = 1;

function newId(prefix = 'id') {
  id +=2;
  return prefix + id;
}

const combineDesires = (desires) => {
  let preferences = [];
  desires.layouts.forEach(layout => {
    desires.colors.forEach((color, index) => {
      let heroColor = Object.assign({}, componentMap['Hero'], {attr: { ...componentMap['Hero'].attr } });
      heroColor.attr.title = desires.title;
      heroColor.attr.bgColor = color;
      heroColor.id = newId();

      let footerColor = Object.assign({}, componentMap['Footer'], {attr: { ...componentMap['Footer'].attr, bgColor: color}});
      footerColor.attr.bgColor = color;
      footerColor.id = newId();

      let content = Object.assign({}, componentMap[layout]);
      content.id = newId();
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

// Sets the selected preferences using the clicked index, sets to AsyncStorage
export const selectPreferences = (selectedIndex) => (dispatch, getState) => {
  const { preferencesAll } = getState();
  const selectedPreferences = preferencesAll[selectedIndex];
  AsyncStorage.setItem('preferences', JSON.stringify(selectedPreferences));
  dispatch(selectSite(selectedPreferences));
  dispatch({ type: 'SELECT_PREFERENCES', payload: selectedPreferences });
}

export const savePreferences = () => (dispatch, getState) => {
  const { preferences } = getState();
  const html = prefToHtml(preferences);
  AsyncStorage.getItem('userId')
  // TODO: Undo hardcode
    .then((userId) => {
      // userId = 'test';
      axios.post(`${global.HOST}/sites`, {
        userId,
        preferences,
        html
      })
    })
  dispatch({ type:'SAVE_PREFERENCES', payload: preferences })
}

export const assignUser = () => (dispatch, getState) => {
  const { siteId } = getState();
  AsyncStorage.getItem('userId')
    .then((userId) => {
      (!!userId) && (!!siteId) && axios.put(`${global.HOST}/sites/${siteId}`, {
        userId,
      })
      .then (site => {
        // console.log(`Site ${siteId} assigned to user, ${userId}`);
      })
      .catch(err => console.log('Error saving site to user'));
    })
};

// Loads cached preferences from AsyncStorage if found
export const loadPreferences = () => (dispatch) => {
  AsyncStorage.getItem('preferences')
    .then(preferencesStr => {
      const preferences = JSON.parse(preferencesStr);
      dispatch({type:'LOAD_PREFERENCES', found: true, payload: preferences});
    })
    .catch(error => {
      dispatch({type:'LOAD_PREFERENCES', found: false, payload: null});
    });
};

// Deprecated method of creating templates
// export function postPreferences(navigateToNext) {
//   return (dispatch, getState) => {
//     const { layouts, colors, title, keywords, order } = getState();

//     //  Collect layouts that from global state that are true
//     const layoutsArr = _.reduce(layouts, (result, layoutStatus, layoutId) => {
//       if (layoutStatus === true ) result.push(layoutId);
//       return result;
//     }, []);
    // Preferences posted to generate templates
    // axios.post(`${global.HOST}/generate`, {
    //   layouts: layoutsArr,
    //   colors: colors,
    //   title: title,
    //   keywords: keywords,
    // })
    //   .then(response => {
    //     console.log('axios posted to generate templates ', response.data);
    //     navigateToNext();
    // })
    //   .catch(err => console.log(err));

    // Preferences are stored in user table
    // axios.post(`${global.HOST}/preferences`, {
    //   layouts: layoutsArr,
    //   colors: colors,
    //   title: title,
    //   keywords: keywords,
    // })
    //   .then(response => {
    //   dispatch({
    //     type: 'POST_PREFERENCES',
    //     payload: response,
    //   })
    // })
    //   .catch(err => console.log(err));
  // }
// }
