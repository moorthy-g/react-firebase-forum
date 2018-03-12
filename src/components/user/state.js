import { reduceArrayToObject } from 'utils/helpers';
import { createReducer, updateObject } from 'store/helpers';
import * as api from 'api/firebase';

// Constants
export const STATE_KEY = 'users';

// Types
const types = {
  GET_USER: 'USER/GET_USER(S)'
}

// Reducer
export default createReducer({
  usersById: {}
}, types);

// Action creators
let newUserPromises = [], timeout;

function getUser(id) {
  return (dispatch, getState) => {
    const state = getState()[STATE_KEY];
    if(typeof state.usersById[id] !== 'object') {
      //Collect all calls in current event loop
      //Then, return all users as batch in next event loop
      clearTimeout(timeout);
      newUserPromises.push(api.getUser(id));
      timeout = setTimeout(function() {
        Promise.all(newUserPromises)
          .then(reduceArrayToObject)
          .then(usersById => {
            newUserPromises = [];
            dispatch({
              type: types.GET_USER,
              usersById: updateObject(state.usersById, usersById)
            });
          })
      })
    }
  }
}

export const actions = {
  getUser
}

