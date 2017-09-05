import _ from 'lodash';
import axios from 'axios';

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

export function addSite(site) {
  return {
    type: 'ADD_SITE',
    payload: site
  }  
}

export function addColors(color) {
  return {
    type: 'ADD_COLORS',
    payload: color
  }
}

export function addKeywords(keywords) {
  return {
    type: 'ADD_KEYWORDS',
    payload: keywords
  }
}

export function changeOrder (order) {
  return {
    type: 'CHANGE_ORDER',
    payload: order
  }
}

export const createPreferences = () => (dispatch, getState) => {
  const { layouts, colors, title, keywords } = getState();

  //  Collect layouts that from global state that are true
  const layoutsArr = _.reduce(layouts, (result, layoutStatus, layoutId) => {
    if (layoutStatus === true ) result.push(layoutId);
    return result;
  }, []);

  const desires = {
    layouts: layoutsArr,
    keywords,
    colors,
    title,
  };

  var components = { 
    hero: {
      name: '<Hero />',
      attributes: {
        bgColor: 'defaultColor',
        title: 'defaultTitle',
      }
    },
    grid: {
      name: '<Grid />',
      attributes: {
        text: 'defaultText',
      }
    },
    pinterestContent: {
      name: '<PinterestContent />',
      attributes: {
        text: 'defaultText',
      }
    },
    footer: {   
      name: '<Footer />',
      attributes: {
        bgColor: 'defaultColor',
        text: 'defaultText',
      },
    }
  };

  let preferences = []
  desires.layouts.forEach(layout => {
    desires.colors.forEach(color => {

      let heroColor = Object.assign({}, components['hero']);
      heroColor.attributes.bgColor = color;
      heroColor.attributes.title = desires.title;

      let footerColor = Object.assign({}, components['footer']);
      footerColor.attributes.bgColor = color;

      let content = Object.assign({}, components[layout]);
      preferences.push([heroColor, content, footerColor]);
    })
  })

  return preferences;

};


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
      order: order,
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
      order: order,
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