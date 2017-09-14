import prefToReactify from '../../app/utils/prefToReactify';
import axios from 'axios';

// Creates entry in database for a new site, preferences, and html
export const selectSite = (preferences) => (dispatch, getState) => {
  const html = prefToReactify(preferences);
  axios.post(`${global.HOST}/sites`, {
    preferences,
    html })
    .then(response => {
      const siteId = response.data;
      dispatch({type:'SELECT_SITE', payload: siteId});
    })
    .catch(err => console.log('Error saving site', err));
};

export const editSite = (siteId) => {
  return {
    type: 'EDIT_SITE',
    payload: siteId,
  };
}

export const updateSite = () => (dispatch, getState) => {
  const { preferences, siteId } = getState();
  axios.put(`${global.HOST}/sites/${siteId}`, {
    preferences,
  })
    .then(site => {
      console.log('New site updated', site);
    })
    .catch(err => console.log('Error saving site preferences: ', err));
};

export const removeSite = () => {
  return {
    type: 'REMOVE_SITE',
    payload: null,
  };
};

